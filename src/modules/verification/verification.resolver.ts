import { Authorization } from "@shared/decorators/authorization.decorator";
import { Authorized } from "@shared/decorators/authorized.decorator";

import { Mutation, Resolver } from "@nestjs/graphql";

import { VerificationService } from "./verification.service";

@Resolver("Verification")
export class VerificationResolver {
  public constructor(
    private readonly _verificationService: VerificationService,
  ) {}

  @Authorization()
  @Mutation(() => Boolean, {
    name: "verifyAccount",
  })
  public async verifyAccount(@Authorized("id") id: string) {
    return await this._verificationService.verifyAccount(id);
  }
}
