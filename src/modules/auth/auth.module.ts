import { SessionService } from "@modules/session/session.service";

import { Module } from "@nestjs/common";

import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";

@Module({
  providers: [AuthResolver, AuthService, SessionService],
})
export class AuthModule {}
