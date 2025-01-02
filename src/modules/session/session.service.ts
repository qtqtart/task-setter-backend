import { EnvironmentService } from "@app/environment/environment.service";
import { PrismaService } from "@app/prisma/prisma.service";

import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { verify } from "argon2";
import { Request } from "express";

import { LoginInput } from "./inputs/login.input";

@Injectable()
export class SessionService {
  public constructor(
    private readonly _prismaService: PrismaService,
    private readonly _environmentService: EnvironmentService,
  ) {}

  public async login(req: Request, input: LoginInput) {
    const user = await this._prismaService.user.findFirst({
      where: {
        OR: [
          { username: { equals: input.login } },
          { email: { equals: input.login } },
        ],
      },
    });

    if (!user) {
      throw new NotFoundException("user not found by username and email");
    }

    const isVerifiedPassword = await verify(user.passwordHash, input.password);

    if (!isVerifiedPassword) {
      throw new UnauthorizedException("invalid password");
    }

    return this.saveSession(req, user.id);
  }

  public logout(req: Request) {
    return this.destroySession(req);
  }

  private saveSession(req: Request, userId: string) {
    return new Promise((resolve, reject) => {
      req.session.userId = userId;
      req.session.createdAt = new Date();

      req.session.save((error) => {
        if (error) {
          return reject(
            new InternalServerErrorException("the session was not saved"),
          );
        }

        resolve(true);
      });
    });
  }

  private destroySession(req: Request) {
    return new Promise((resolve, reject) => {
      req.session.destroy((error) => {
        if (error) {
          return reject(
            new InternalServerErrorException("the session was not destroyed"),
          );
        }

        req.res.clearCookie(this._environmentService.get("SESSION_NAME"));

        resolve(true);
      });
    });
  }
}
