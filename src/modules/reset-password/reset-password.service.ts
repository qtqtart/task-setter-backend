import { PrismaService } from "@app/prisma/prisma.service";
import { MailerService } from "@modules/mailer/mailer.service";
import { TokenService } from "@modules/token/token.service";

import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { TokenType } from "@prisma/client";
import { hash } from "argon2";

import { ResetPasswordInput } from "./inputs/reset-password.input";
import { UpdatePasswordAfterResetInput } from "./inputs/update-passwort-after-reset.input";

@Injectable()
export class ResetPasswordService {
  public constructor(
    private readonly _prismaService: PrismaService,
    private readonly _mailerService: MailerService,
    private readonly _tokenService: TokenService,
  ) {}

  public async resetPassword(input: ResetPasswordInput) {
    const user = await this._prismaService.user.findUnique({
      where: {
        email: input.email,
      },
    });

    if (!user) {
      throw new NotFoundException("user not found by email");
    }

    const token = await this._tokenService.generate(
      user.id,
      TokenType.RESET_PASSWORD,
    );

    await this._mailerService.resetPasswort(
      "reset password",
      token.user.username,
      token.user.email,
      token.id,
    );

    return true;
  }

  public async updatePasswordAfterReset(input: UpdatePasswordAfterResetInput) {
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

    const passwordHash = await hash(input.password);

    await this._prismaService.user.update({
      where: {
        id: token.userId,
      },
      data: {
        passwordHash,
      },
    });

    await this._prismaService.token.delete({
      where: {
        id: token.id,
      },
    });

    return true;
  }
}
