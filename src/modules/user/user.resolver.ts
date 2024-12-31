import { Authorization } from "@shared/decorators/authorization.decorator";
import { Authorized } from "@shared/decorators/authorized.decorator";

import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

import { CreateUserInput } from "./inputs/create-user.input";
import { UserModel } from "./models/user.model";
import { UserService } from "./user.service";

@Resolver("User")
export class UserResolver {
  public constructor(private readonly _userService: UserService) {}

  @Query(() => UserModel, {
    name: "findUserById",
  })
  public async findById(@Args("id") id: string) {
    return await this._userService.findById(id);
  }

  @Authorization()
  @Query(() => UserModel, {
    name: "findMe",
  })
  public async findMe(@Authorized("id") id: string) {
    return this._userService.findById(id);
  }

  @Query(() => [UserModel], {
    name: "findAllUsers",
  })
  public async findAll() {
    return await this._userService.findAll();
  }

  @Mutation(() => UserModel, {
    name: "createUser",
  })
  public async create(@Args("data") input: CreateUserInput) {
    return await this._userService.create(input);
  }
}
