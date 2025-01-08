import { PrismaService } from "@app/prisma/prisma.service";
import { ResetPasswordInput } from "@modules/reset-password/inputs/reset-password.input";
import { UpdatePasswordAfterResetInput } from "@modules/reset-password/inputs/update-passwort-after-reset.input";
import { ResetPasswordService } from "@modules/reset-password/reset-password.service";
import { SessionService } from "@modules/session/session.service";
import { VerificationEmailService } from "@modules/verification-email/verification-email.service";

import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { hash, verify } from "argon2";
import { Request } from "express";

import { SignInInput } from "./inputs/sign-in.input";
import { SignUpInput } from "./inputs/sign-up.input";

@Injectable()
export class AuthService {
  public constructor(
    private readonly _prismaService: PrismaService,
    private readonly _resetPasswordService: ResetPasswordService,
    private readonly _sessionService: SessionService,
    private readonly _verificationEmailService: VerificationEmailService,
  ) {}

  public async signIn(req: Request, input: SignInInput, userAgent: string) {
    const user = await this._prismaService.user.findFirst({
      where: {
        OR: [
          { username: { equals: input.login } },
          { email: { equals: input.login } },
        ],
      },
    });

    if (!user) {
      throw new NotFoundException("user not found by name and email");
    }

    if (!user.isVerifiedByEmail) {
      await this._verificationEmailService.sendMail(user.id);

      throw new ConflictException("user is not verified");
    }

    const isVerifiedPassword = await verify(user.passwordHash, input.password);

    if (!isVerifiedPassword) {
      throw new UnauthorizedException("invalid password");
    }

    return this._sessionService.save(req, user.id, userAgent);
  }

  public async signUp(input: SignUpInput) {
    const isExistByName = await this._prismaService.user.findUnique({
      where: {
        username: input.username,
      },
    });

    if (isExistByName) {
      throw new ConflictException("user already exist by name");
    }

    const isExistByEmail = await this._prismaService.user.findUnique({
      where: {
        email: input.email,
      },
    });

    if (isExistByEmail) {
      throw new ConflictException("user already exist by email");
    }

    const passwordHash = await hash(input.password);

    const user = await this._prismaService.user.create({
      data: {
        username: input.username,
        email: input.email,
        passwordHash,
      },
    });

    await this._verificationEmailService.sendMail(user.id);

    return true;
  }

  public signOut(req: Request) {
    return this._sessionService.destroy(req);
  }

  public async resetPassword(input: ResetPasswordInput) {
    return await this._resetPasswordService.resetPassword(input);
  }

  public async updatePasswordAfterReset(input: UpdatePasswordAfterResetInput) {
    return await this._resetPasswordService.updatePasswordAfterReset(input);
  }
}
