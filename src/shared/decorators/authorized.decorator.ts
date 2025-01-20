import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Request } from "express";

export const Authorized = createParamDecorator(
  (_, context: ExecutionContext) => {
    let userId: string;

    if (context.getType() === "http") {
      const req: Request = context.switchToHttp().getRequest();

      userId = req.session.userId;
    } else {
      const gqlContext = GqlExecutionContext.create(context).getContext();
      const req: Request = gqlContext.req;

      userId = req.session.userId;
    }

    return userId;
  },
);
