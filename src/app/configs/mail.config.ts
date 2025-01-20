import { EnvironmentService } from "@app/environment/environment.service";

import { MailerOptions } from "@nestjs-modules/mailer";

export const getMailConfig = (
  environmentService: EnvironmentService,
): MailerOptions => ({
  transport: {
    service: "gmail",
    auth: {
      user: environmentService.get("MAILER_USER"),
      pass: environmentService.get("MAILER_PASSWORD"),
    },
  },
  defaults: {
    from: `"task setter app" ${environmentService.get("REDIS_USER")}`,
  },
});
