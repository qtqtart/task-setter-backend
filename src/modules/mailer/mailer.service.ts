import { Injectable } from "@nestjs/common";
import { MailerService as NestMailerService } from "@nestjs-modules/mailer";

@Injectable()
export class MailerService {
  public constructor(private readonly _mailerService: NestMailerService) {}

  public async sendVerificationToken(to: string, tokenId: string) {
    const html = `<>${tokenId}</>`;

    return await this._mailerService.sendMail({
      subject: "verify account",
      to,
      html,
    });
  }
}
