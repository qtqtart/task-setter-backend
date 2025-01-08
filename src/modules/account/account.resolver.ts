import { UserModel } from "@modules/user/models/user.model";
import { Auth } from "@shared/decorators/auth.decorator";
import { Authorized } from "@shared/decorators/authorized.decorator";

import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

import { AccountService } from "./account.service";
import { UpdateAccountDetailsInput } from "./inputs/update-account-details.input";

@Resolver("Account")
export class AccountResolver {
  constructor(private readonly _accountService: AccountService) {}

  @Auth()
  @Query(() => UserModel, {
    name: "findMe",
  })
  public async findMe(@Authorized("id") id: string) {
    return await this._accountService.findMe(id);
  }

  @Auth()
  @Mutation(() => UserModel, {
    name: "updateAccountDetails",
  })
  public async updateDetails(
    @Authorized("id") id: string,
    @Args("input") input: UpdateAccountDetailsInput,
  ) {
    return await this._accountService.updateDetails(id, input);
  }
}
