import { PrismaService } from "@app/prisma/prisma.service";
import { MailerService } from "@modules/mailer/mailer.service";
import { TokenService } from "@modules/token/token.service";

import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { TokenType } from "@prisma/client";

import { VerificationEmailInput } from "./inputs/verification-email.input";

@Injectable()
export class VerificationEmailService {
  public constructor(
    private readonly _prismaService: PrismaService,
    private readonly _mailerService: MailerService,
    private readonly _tokenService: TokenService,
  ) {}

  public async verify(input: VerificationEmailInput) {
    const token = await this._prismaService.token.findFirst({
      where: {
        id: input.tokenId,
      },
    });

    if (!token) {
      throw new NotFoundException("token not found");
    }

    const isExpired = new Date(token.expiresIn) < new Date();

    if (isExpired) {
      throw new ConflictException("token is expired");
    }

    await this._prismaService.user.update({
      where: {
        id: token.userId,
      },
      data: {
        isVerifiedByEmail: true,
      },
    });

    await this._prismaService.token.delete({
      where: {
        id: token.id,
      },
    });

    return true;
  }

  public async sendMail(userId: string) {
    const token = await this._tokenService.generate(
      userId,
      TokenType.VERIFICATION_EMAIL,
    );

    await this._mailerService.verificationEmail(
      "verify your email",
      token.user.username,
      token.user.email,
      token.id,
    );

    return true;
  }
}
