import { ConfigurationVariables } from "@config/configuration";
import { Controller, Get } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Controller()
export class AppController {
  constructor(
    private readonly _configService: ConfigService<ConfigurationVariables>,
  ) {}

  @Get("/config")
  getConfig() {
    return {
      uri: this._configService.getOrThrow("POSTGRES_URL"),
    };
  }
}
