import { PrismaService } from "@app/prisma/prisma.service";
import { TO_MS } from "@shared/consts/to-ms.const";

import { Injectable } from "@nestjs/common";
import { TokenType } from "@prisma/client";

@Injectable()
export class TokenService {
  public constructor(private readonly _prismaService: PrismaService) {}

  public async generate(userId: string, tokenType: TokenType) {
    let ms: number;

    if (tokenType === TokenType.VERIFICATION_EMAIL) {
      ms = TO_MS._1hour;
    }

    const expiresIn = new Date(new Date().getTime() + ms);

    const token = await this._prismaService.token.findFirst({
      where: {
        type: tokenType,
        userId,
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
        type: tokenType,
        expiresIn,
        user: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        user: true,
      },
    });
  }
}
