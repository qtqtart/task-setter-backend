import { Authorization } from "@shared/decorators/authorization.decorator";

import { Query, Resolver } from "@nestjs/graphql";

import { UserModel } from "./models/user.model";
import { UserService } from "./user.service";

@Resolver("User")
export class UserResolver {
  constructor(private readonly _userService: UserService) {}

  @Authorization()
  @Query(() => UserModel, {
    name: "findAllUsers",
  })
  public async findAll() {
    return this._userService.findAll();
  }
}
