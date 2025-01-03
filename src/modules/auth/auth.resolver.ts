import { AccountModel } from "@modules/account/models/account.model";
import { UserAgent } from "@shared/decorators/user-agent.decorator";
import { GraphQLContext } from "@shared/types/graphql-context.types";

import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";

import { AuthService } from "./auth.service";
import { SignInInput } from "./inputs/sign-in.input";
import { SignUpInput } from "./inputs/sign-up.input";

@Resolver("Auth")
export class AuthResolver {
  public constructor(private readonly _authService: AuthService) {}

  @Mutation(() => Boolean, {
    name: "signIn",
  })
  public async signIn(
    @Context() { req }: GraphQLContext,
    @Args("data") input: SignInInput,
    @UserAgent() userAgent: string,
  ) {
    return await this._authService.signIn(req, input, userAgent);
  }

  @Mutation(() => AccountModel, {
    name: "signUp",
  })
  public async signUp(@Args("data") input: SignUpInput) {
    return await this._authService.signUp(input);
  }

  @Mutation(() => Boolean, {
    name: "signOut",
  })
  public async signOut(@Context() { req }: GraphQLContext) {
    return this._authService.signOut(req);
  }
}
