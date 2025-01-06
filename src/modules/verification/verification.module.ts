import { MailerService } from "@modules/mailer/mailer.service";
import { TokenService } from "@modules/token/token.service";

import { Module } from "@nestjs/common";

import { VerificationResolver } from "./verification.resolver";
import { VerificationService } from "./verification.service";

@Module({
  providers: [
    VerificationResolver,
    VerificationService,
    MailerService,
    TokenService,
  ],
})
export class VerificationModule {}
