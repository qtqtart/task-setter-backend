import { AppModule } from "@app/app.module";
import { EnvironmentService } from "@app/environment/environment.service";
import { RedisService } from "@app/redis/redis.service";
import { TO_MS } from "@shared/consts/to-ms.const";

import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { RedisStore } from "connect-redis";
import * as cookieParser from "cookie-parser";
import * as session from "express-session";

(async () => {
  const ms = TO_MS._30days;

  const app = await NestFactory.create(AppModule);

  const redisService = app.get(RedisService);
  const environmentService = app.get(EnvironmentService);

  app.use(cookieParser(environmentService.get("COOKIE_SECRET")));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: environmentService.get("SESSION_SECRET"),
      name: environmentService.get("SESSION_NAME"),
      cookie: {
        path: "/",
        domain: environmentService.get("SESSION_DOMAIN"),
        secure: environmentService.get("SESSION_SECURE"),
        httpOnly: environmentService.get("SESSION_HTTP_ONLY"),
        maxAge: ms,
        sameSite: "lax",
      },
      store: new RedisStore({
        client: redisService,
        prefix: environmentService.get("SESSION_FOLDER"),
      }),
    }),
  );

  app.enableCors({
    credentials: true,
    origin: environmentService.get("ALLOWED_ORIGIN"),
    exposedHeaders: ["set-cookie"],
  });

  await app.listen(environmentService.get("APP_PORT"));
})();
