import { MailerService } from "@modules/mailer/mailer.service";
import { TokenService } from "@modules/token/token.service";

import { Module } from "@nestjs/common";

import { ResetPasswordService } from "./reset-password.service";

@Module({
  providers: [ResetPasswordService, MailerService, TokenService],
  exports: [ResetPasswordService],
})
export class ResetPasswordModule {}
