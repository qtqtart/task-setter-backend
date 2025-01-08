import { UserModel } from "@modules/user/models/user.model";
import { Authorization } from "@shared/decorators/authorization.decorator";
import { Authorized } from "@shared/decorators/authorized.decorator";

import { Query, Resolver } from "@nestjs/graphql";

import { AccountService } from "./account.service";

@Resolver("Account")
export class AccountResolver {
  constructor(private readonly _accountService: AccountService) {}

  @Authorization()
  @Query(() => UserModel, {
    name: "findMe",
  })
  public async findMe(@Authorized("id") id: string) {
    return this._accountService.findMe(id);
  }
}
