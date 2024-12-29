import { AppModule } from "@app/app.module";
import { Configuration } from "@shared/config/configuration";

import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";

(async () => {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService<Configuration>);
  const port = configService.getOrThrow("APP_PORT");

  await app.listen(port);
})();
