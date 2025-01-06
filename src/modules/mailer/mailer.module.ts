import { getMailerConfig } from "@app/configs/mailer.config";
import { EnvironmentModule } from "@app/environment/environment.module";
import { EnvironmentService } from "@app/environment/environment.service";

import { Module } from "@nestjs/common";
import { MailerModule as NestMailerModule } from "@nestjs-modules/mailer";

import { MailerService } from "./mailer.service";

@Module({
  imports: [
    NestMailerModule.forRootAsync({
      imports: [EnvironmentModule],
      inject: [EnvironmentService],
      useFactory: getMailerConfig,
    }),
  ],
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {}
