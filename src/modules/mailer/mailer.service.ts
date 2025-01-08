import { EnvironmentService } from "@app/environment/environment.service";

import { Injectable } from "@nestjs/common";
import { MailerService as NestMailerService } from "@nestjs-modules/mailer";
import { render } from "@react-email/components";
import { VerificationTemplate } from "templates/verification.template";

@Injectable()
export class MailerService {
  public constructor(
    private readonly _mailerService: NestMailerService,
    private readonly _environmentService: EnvironmentService,
  ) {}

  public async sendVerificationMail(
    subject: string,
    username: string,
    to: string,
    tokenId: string,
  ) {
    const href = `${this._environmentService.get("ALLOWED_ORIGIN")}/account/verification?tokenId=${tokenId}`;

    const template = VerificationTemplate({
      subject,
      username,
      href,
    });
    const html = await render(template);

    return await this._mailerService.sendMail({
      subject,
      to,
      html,
    });
  }
}
