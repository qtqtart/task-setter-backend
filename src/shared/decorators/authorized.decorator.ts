import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { User } from "@prisma/client";
import { Request } from "express";

export const Authorized = createParamDecorator(
  (key: keyof User, context: ExecutionContext) => {
    let user: User;

    if (context.getType() === "http") {
      const req: Request = context.switchToHttp().getRequest();

      user = req.user;
    } else {
      const gqlContext = GqlExecutionContext.create(context).getContext();
      const req: Request = gqlContext.req;

      user = req.user;
    }

    return key ? user[key] : user;
  },
);
