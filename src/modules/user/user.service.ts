import { PrismaService } from "@app/prisma/prisma.service";

import { ConflictException, Injectable } from "@nestjs/common";
import { hash } from "argon2";

import { CreateUserInput } from "./inputs/create-user.input";

@Injectable()
export class UserService {
  public constructor(private readonly _prismaService: PrismaService) {}

  public async findById(id: string) {
    const user = await this._prismaService.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  public async findAll() {
    const users = await this._prismaService.user.findMany();

    return users;
  }

  public async create(input: CreateUserInput) {
    const isExistByUsername = await this._prismaService.user.findUnique({
      where: {
        username: input.username,
      },
    });

    if (isExistByUsername) {
      throw new ConflictException("user already exist with username");
    }

    const isExistByEmail = await this._prismaService.user.findUnique({
      where: {
        email: input.email,
      },
    });

    if (isExistByEmail) {
      throw new ConflictException("user already exist with email");
    }

    const passwordHash = await hash(input.password);
    const user = await this._prismaService.user.create({
      data: {
        username: input.username,
        email: input.email,
        passwordHash,
      },
    });

    return user;
  }
}
