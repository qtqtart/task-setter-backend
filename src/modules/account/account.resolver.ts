import { UserModel } from "@modules/user/models/user.model";
import { Auth } from "@shared/decorators/auth.decorator";
import { Authorized } from "@shared/decorators/authorized.decorator";
import { FileValidationPipe } from "@shared/pipes/file-validation.pipe";

import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GraphQLUpload, Upload } from "graphql-upload-ts";

import { AccountService } from "./account.service";
import { UpdateAccountInput } from "./inputs/update-account.input";

@Resolver("Account")
export class AccountResolver {
  constructor(private readonly _accountService: AccountService) {}

  @Auth()
  @Query(() => UserModel, {
    name: "findMe",
  })
  public async findMe(@Authorized() userId: string) {
    return await this._accountService.findMe(userId);
  }

  @Auth()
  @Mutation(() => UserModel, {
    name: "updateAccount",
  })
  public async update(
    @Authorized() userId: string,
    @Args("input") input: UpdateAccountInput,
  ) {
    return await this._accountService.update(userId, input);
  }

  @Auth()
  @Mutation(() => Boolean, {
    name: "updateAccountAvatar",
  })
  public async updateAvatar(
    @Authorized() userId: string,
    @Args(
      "uploud",
      {
        type: () => GraphQLUpload,
      },
      FileValidationPipe,
    )
    upload: Upload,
  ) {
    return await this._accountService.uploadAvatar(userId, upload);
  }

  @Auth()
  @Mutation(() => Boolean, {
    name: "deleteAccountAvatar",
  })
  public async deleteAvatar(@Authorized() userId: string) {
    return await this._accountService.deleteAvatar(userId);
  }
}
