import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

import { CreateUserInput } from "./inputs/create-user.input";
import { UserModel } from "./models/user.model";
import { UserService } from "./user.service";

@Resolver("User")
export class UserResolver {
  public constructor(private readonly _userService: UserService) {}

  @Query(() => [UserModel])
  public async findAll() {
    return this._userService.findAll();
  }

  @Mutation(() => UserModel)
  public async create(@Args("data") input: CreateUserInput) {
    return this._userService.create(input);
  }
}
