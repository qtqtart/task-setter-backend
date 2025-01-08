import { PrismaService } from "@app/prisma/prisma.service";
import { MailerService } from "@modules/mailer/mailer.service";
import { TokenService } from "@modules/token/token.service";

import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { TokenType } from "@prisma/client";

@Injectable()
export class VerificationService {
  public constructor(
    private readonly _prismaService: PrismaService,
    private readonly _mailerService: MailerService,
    private readonly _tokenService: TokenService,
  ) {}

  public async verifyAccount(accountId: string) {
    const token = await this._prismaService.token.findFirst({
      where: {
        type: TokenType.EMAIL_VERIFICATION,
        accountId,
      },
    });

    if (!token) {
      throw new NotFoundException("token not found");
    }

    const isExpires = new Date(token.expiresIn) < new Date();

    if (isExpires) {
      throw new ConflictException("token is expired");
    }

    await this._prismaService.account.update({
      where: {
        id: token.accountId,
      },
      data: {
        isVerifiedEmail: true,
      },
    });

    await this._prismaService.token.delete({
      where: {
        id: token.id,
      },
    });

    return true;
  }

  public async sendVerificationMail(accountId: string) {
    const token = await this._tokenService.generate(
      accountId,
      "EMAIL_VERIFICATION",
    );

    await this._mailerService.sendVerificationMail(
      "verify your account",
      token.account.name,
      token.account.email,
      token.id,
    );

    return true;
  }
}
