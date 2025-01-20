import { MailService } from "@app/mail/mail.service";
import { TokenService } from "@modules/token/token.service";

import { Module } from "@nestjs/common";

import { VerificationEmailResolver } from "./verification-email.resolver";
import { VerificationEmailService } from "./verification-email.service";

@Module({
  providers: [
    VerificationEmailResolver,
    VerificationEmailService,
    MailService,
    TokenService,
  ],
})
export class VerificationEmailModule {}
