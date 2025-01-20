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
  public async canActivate(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context).getContext();
    const req: Request = gqlContext.req;
    const { userId } = req.session;

    if (!userId) {
      throw new UnauthorizedException("user is unauthorized");
    }

    req.session.userId = userId;

    return true;
  }
}
