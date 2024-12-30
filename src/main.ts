import { AppModule } from "@app/app.module";
import { RedisService } from "@app/redis/redis.service";
import { Configuration } from "@shared/config/configuration";

import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { RedisStore } from "connect-redis";
import * as cookieParser from "cookie-parser";
import * as expressSession from "express-session";

(async () => {
  const app = await NestFactory.create(AppModule);

  const redisService = app.get(RedisService);
  const configService = app.get(ConfigService<Configuration>);

  app.use(cookieParser(configService.getOrThrow("COOKIE_SECRET")));
  app.use(
    expressSession({
      resave: false,
      saveUninitialized: false,
      name: configService.getOrThrow("SESSION_NAME"),
      secret: configService.getOrThrow("SESSION_SECRET"),
      cookie: {
        domain: configService.getOrThrow("COOKIE_DOMAIN"),
        httpOnly: configService.getOrThrow("COOKIE_HTTP_ONLY"),
        secure: configService.getOrThrow("COOKIE_SECURE"),
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: "lax",
      },
      store: new RedisStore({
        client: redisService,
        prefix: configService.getOrThrow("SESSION_PREFIX"),
      }),
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.enableCors({
    credentials: true,
    exposedHeaders: ["set-cookie"],
  });

  await app.listen(configService.getOrThrow("APP_PORT"));
})();
