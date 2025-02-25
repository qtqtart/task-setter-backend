import { Args, Mutation, Resolver } from "@nestjs/graphql";

import { VerificationEmailInput } from "./inputs/verification-email.input";
import { VerificationEmailService } from "./verification-email.service";

@Resolver("Verification")
export class VerificationEmailResolver {
  public constructor(
    private readonly _verificationEmailService: VerificationEmailService,
  ) {}

  @Mutation(() => Boolean, {
    name: "verifyAccountByEmail",
  })
  public async verify(@Args("input") input: VerificationEmailInput) {
    return await this._verificationEmailService.verify(input);
  }
}
