import { AppModule } from "@app/app.module";
import { RedisService } from "@app/redis/redis.service";
import { Env } from "@shared/types/evn.types";

import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { RedisStore } from "connect-redis";
import * as cookieParser from "cookie-parser";
import * as session from "express-session";

(async () => {
  const app = await NestFactory.create(AppModule);

  const redisService = app.get(RedisService);
  const configService = app.get(ConfigService<Env>);

  app.use(cookieParser(configService.getOrThrow("COOKIE_SECRET")));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      name: configService.getOrThrow("SESSION_NAME"),
      secret: configService.getOrThrow("SESSION_SECRET"),
      cookie: {
        path: "/",
        domain: configService.getOrThrow("SESSION_DOMAIN"),
        httpOnly: configService.getOrThrow("SESSION_HTTP_ONLY"),
        secure: configService.getOrThrow("SESSION_SECURE"),
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: "lax",
      },
      store: new RedisStore({
        client: redisService,
        prefix: configService.getOrThrow("SESSION_FOLDER"),
      }),
    }),
  );

  app.enableCors({
    credentials: true,
    origin: configService.getOrThrow("ALLOWED_ORIGIN"),
    exposedHeaders: ["set-cookie"],
  });

  await app.listen(configService.getOrThrow("APP_PORT"));
})();
