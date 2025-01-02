import { PrismaService } from "@app/prisma/prisma.service";
import { SessionService } from "@modules/session/session.service";

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
    private readonly _sessionService: SessionService,
  ) {}

  public async signIn(req: Request, input: SignInInput, userAgent: string) {
    const account = await this._prismaService.account.findFirst({
      where: {
        OR: [
          { name: { equals: input.login } },
          { email: { equals: input.login } },
        ],
      },
    });

    if (!account) {
      throw new NotFoundException("account not found by name and email");
    }

    const isVerifiedPassword = await verify(
      account.passwordHash,
      input.password,
    );

    if (!isVerifiedPassword) {
      throw new UnauthorizedException("invalid password");
    }

    const metadata = this._sessionService.getMetadata(req, userAgent);

    return this._sessionService.save(req, account.id, metadata);
  }

  public async signUp(input: SignUpInput) {
    const isExistByName = await this._prismaService.account.findUnique({
      where: {
        name: input.name,
      },
    });

    if (isExistByName) {
      throw new ConflictException("account already exist by name");
    }

    const isExistByEmail = await this._prismaService.account.findUnique({
      where: {
        email: input.email,
      },
    });

    if (isExistByEmail) {
      throw new ConflictException("account already exist by email");
    }

    const passwordHash = await hash(input.password);
    const account = await this._prismaService.account.create({
      data: {
        name: input.name,
        email: input.email,
        passwordHash,
      },
    });

    return account;
  }

  public signOut(req: Request) {
    return this._sessionService.destroy(req);
  }
}
