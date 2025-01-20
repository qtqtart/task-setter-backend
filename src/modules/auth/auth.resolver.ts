import { UserAgent } from "@shared/decorators/user-agent.decorator";
import { GqlContext } from "@shared/types/graphql-context.types";

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
    @Context() { req }: GqlContext,
    @Args("input") input: SignInInput,
    @UserAgent() userAgent: string,
  ) {
    return await this._authService.signIn(req, input, userAgent);
  }

  @Mutation(() => Boolean, {
    name: "signUp",
  })
  public async signUp(@Args("input") input: SignUpInput) {
    return await this._authService.signUp(input);
  }

  @Mutation(() => Boolean, {
    name: "signOut",
  })
  public async signOut(@Context() { req }: GqlContext) {
    return this._authService.signOut(req);
  }
}
