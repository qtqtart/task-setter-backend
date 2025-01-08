import { EnvironmentService } from "@app/environment/environment.service";

import { Injectable } from "@nestjs/common";
import { MailerService as NestMailerService } from "@nestjs-modules/mailer";

@Injectable()
export class MailerService {
  public constructor(
    private readonly _mailerService: NestMailerService,
    private readonly _environmentService: EnvironmentService,
  ) {}

  public async resetPasswort(
    subject: string,
    username: string,
    to: string,
    tokenId: string,
  ) {
    const href = `${this._environmentService.get("ALLOWED_ORIGIN")}/auth/reset_password?tokenId=${tokenId}`;

    const html = `Hi ${username}, ${href}`;

    return await this._mailerService.sendMail({
      subject,
      to,
      html,
    });
  }

  public async verificationEmail(
    subject: string,
    username: string,
    to: string,
    tokenId: string,
  ) {
    const href = `${this._environmentService.get("ALLOWED_ORIGIN")}/account/verification_email?tokenId=${tokenId}`;

    const html = `Hi ${username}, ${href}`;

    return await this._mailerService.sendMail({
      subject,
      to,
      html,
    });
  }
}
