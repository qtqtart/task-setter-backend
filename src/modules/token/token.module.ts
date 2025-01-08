import { Module } from "@nestjs/common";

import { TokenResolver } from "./token.resolver";
import { TokenService } from "./token.service";

@Module({
  providers: [TokenService, TokenResolver],
  exports: [TokenService],
})
export class TokenModule {}
