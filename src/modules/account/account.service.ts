import { PrismaService } from "@app/prisma/prisma.service";
import { S3Service } from "@app/s3/s3.service";
import { createWebpBuffer } from "@shared/utils/create-webp-buffer.util";

import { ConflictException, Injectable } from "@nestjs/common";
import { Upload } from "graphql-upload-ts";

import { UpdateAccountInput } from "./inputs/update-account.input";

@Injectable()
export class AccountService {
  public constructor(
    private readonly _prismaService: PrismaService,
    private readonly _s3Service: S3Service,
  ) {}

  public async findMe(id: string) {
    const user = await this._prismaService.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  public async update(userId: string, input: UpdateAccountInput) {
    const user = await this._prismaService.user.findUnique({
      where: {
        username: input.username,
      },
    });

    if (user) {
      throw new ConflictException("user already exist by username");
    }

    return await this._prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        username: input.username,
        bio: input.bio,
      },
    });
  }

  public async uploadAvatar(userId: string, upload: Upload) {
    const user = await this.findMe(userId);

    if (!user) {
      throw new ConflictException("user not found by id");
    }

    if (user.avatarUrl) {
      await this._s3Service.delete(user.avatarUrl);
    }

    const fileName = `avatars/${userId}.webp`;
    const buffer = await createWebpBuffer(upload, {
      height: 512,
      width: 512,
    });

    await this._s3Service.upload(fileName, buffer, "image/webp");
    await this._prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        avatarUrl: fileName,
      },
    });

    return true;
  }

  public async deleteAvatar(userId: string) {
    const user = await this.findMe(userId);

    if (!user) {
      throw new ConflictException("user not found by id");
    }

    if (!user.avatarUrl) {
      return;
    }

    await this._s3Service.delete(user.avatarUrl);
    await this._prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        avatarUrl: null,
      },
    });

    return true;
  }
}
