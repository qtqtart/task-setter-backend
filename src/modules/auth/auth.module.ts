import { MailModule } from "@app/mail/mail.module";
import { SessionService } from "@modules/session/session.service";
import { TokenService } from "@modules/token/token.service";
import { VerificationEmailService } from "@modules/verification-email/verification-email.service";

import { Module } from "@nestjs/common";

import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";

@Module({
  imports: [MailModule],
  providers: [
    AuthResolver,
    AuthService,
    SessionService,
    TokenService,
    VerificationEmailService,
  ],
})
export class AuthModule {}
