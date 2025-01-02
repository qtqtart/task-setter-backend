import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Request } from "express";

export const UserAgent = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    if (context.getType() === "http") {
      const req: Request = context.switchToHttp().getRequest();

      return req.headers["user-agent"];
    } else {
      const gqlContext = GqlExecutionContext.create(context).getContext();
      const req: Request = gqlContext.req;

      return req.headers["user-agent"];
    }
  },
);
