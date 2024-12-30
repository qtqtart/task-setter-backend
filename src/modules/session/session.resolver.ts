import { GraphQLContext } from "@shared/types/graphql-context.types";

import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";

import { LoginInput } from "./inputs/login.input";
import { SessionService } from "./session.service";

@Resolver("Session")
export class SessionResolver {
  public constructor(private readonly _sessionService: SessionService) {}

  @Mutation(() => Boolean)
  public async login(
    @Context() { req }: GraphQLContext,
    @Args("data") input: LoginInput,
  ) {
    return await this._sessionService.login(req, input);
  }

  @Mutation(() => Boolean)
  public async logout(@Context() { req }: GraphQLContext) {
    return await this._sessionService.logout(req);
  }
}
