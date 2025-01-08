import { PrismaService } from "@app/prisma/prisma.service";

import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
  public constructor(private readonly _prismaService: PrismaService) {}

  public async findAll() {
    const users = await this._prismaService.user.findMany();

    return users;
  }
}
