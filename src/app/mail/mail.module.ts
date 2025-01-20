import { getMailConfig } from "@app/configs/mail.config";
import { EnvironmentModule } from "@app/environment/environment.module";
import { EnvironmentService } from "@app/environment/environment.service";

import { Module } from "@nestjs/common";
import { MailerModule } from "@nestjs-modules/mailer";

import { MailService } from "./mail.service";

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [EnvironmentModule],
      inject: [EnvironmentService],
      useFactory: getMailConfig,
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
