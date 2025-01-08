import { Authorization } from "@shared/decorators/authorization.decorator";
import { Authorized } from "@shared/decorators/authorized.decorator";

import { Query, Resolver } from "@nestjs/graphql";

import { TokenService } from "./token.service";

@Resolver("Token")
export class TokenResolver {
  constructor(private readonly _tokenService: TokenService) {}

  @Authorization()
  @Query(() => [String], {
    name: "findCurrentTokens",
  })
  public async findCurrent(@Authorized("id") id: string) {
    return this._tokenService.findCurrentTokens(id);
  }
}
