import { MailerModule } from "@modules/mailer/mailer.module";
import { ResetPasswordService } from "@modules/reset-password/reset-password.service";
import { SessionService } from "@modules/session/session.service";
import { TokenService } from "@modules/token/token.service";
import { VerificationEmailService } from "@modules/verification-email/verification-email.service";

import { Module } from "@nestjs/common";

import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";

@Module({
  imports: [MailerModule],
  providers: [
    AuthResolver,
    AuthService,
    ResetPasswordService,
    SessionService,
    TokenService,
    VerificationEmailService,
  ],
})
export class AuthModule {}
