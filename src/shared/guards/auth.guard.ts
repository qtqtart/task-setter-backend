import { PrismaService } from "@app/prisma/prisma.service";

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(private readonly _prismaService: PrismaService) {}

  public async canActivate(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context).getContext();
    const req: Request = gqlContext.req;
    const { accountId } = req.session;

    if (!accountId) {
      throw new UnauthorizedException("account is unauthorized");
    }

    const account = await this._prismaService.account.findUnique({
      where: {
        id: accountId,
      },
    });

    req.account = account;

    return true;
  }
}
