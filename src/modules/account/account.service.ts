import { PrismaService } from "@app/prisma/prisma.service";

import { ConflictException, Injectable } from "@nestjs/common";

import { UpdateAccountDetailsInput } from "./inputs/update-account-details.input";

@Injectable()
export class AccountService {
  public constructor(private readonly _prismaService: PrismaService) {}

  public async findMe(id: string) {
    const user = await this._prismaService.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  public async updateDetails(userId: string, input: UpdateAccountDetailsInput) {
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
}
