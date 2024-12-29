import { AppModule } from "@app/app.module";
import { IConfiguration } from "@shared/config/configuration";

import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";

(async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const configService = app.get(ConfigService<IConfiguration>);
  const port = configService.getOrThrow("APP_PORT");

  await app.listen(port);
})();
