import { MailerModule } from "@modules/mailer/mailer.module";
import { SessionService } from "@modules/session/session.service";
import { TokenService } from "@modules/token/token.service";
import { VerificationService } from "@modules/verification/verification.service";

import { Module } from "@nestjs/common";

import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";

@Module({
  imports: [MailerModule],
  providers: [
    AuthResolver,
    AuthService,
    SessionService,
    VerificationService,
    TokenService,
  ],
})
export class AuthModule {}
