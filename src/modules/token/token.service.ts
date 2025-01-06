import { PrismaService } from "@app/prisma/prisma.service";
import { TO_MS } from "@shared/consts/to-ms.const";

import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { TokenType } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class TokenService {
  public constructor(private readonly _prismaService: PrismaService) {}

  public async generate(accountId: string, tokenType: TokenType) {
    const { _15mins } = TO_MS;

    const tokenPayload = uuidv4();
    const expiresIn = new Date(new Date().getTime() + _15mins);

    const token = await this._prismaService.token.findFirst({
      where: {
        type: tokenType,
        accountId,
      },
    });

    if (token) {
      await this._prismaService.token.delete({
        where: {
          id: token.id,
        },
      });
    }

    return await this._prismaService.token.create({
      data: {
        payload: tokenPayload,
        type: tokenType,
        expiresIn,
        account: {
          connect: {
            id: accountId,
          },
        },
      },
      include: {
        account: true,
      },
    });
  }
}
