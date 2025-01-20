import { IsBoolean, IsNumber, IsString, Max, Min } from "class-validator";

import { ToBoolean } from "../decorators/to-boolean.decorator";
import { ToPositiveNumber } from "../decorators/to-positive-number";
import { Environment } from "../types/environment.types";

export class EnvironmentModel implements Environment {
  @IsString()
  public NODE_ENV: string = "development";

  @IsString()
  public ALLOWED_ORIGIN: string;

  @ToPositiveNumber()
  @IsNumber()
  @Min(0)
  @Max(65535)
  public APP_PORT: number;

  @IsString()
  public APP_HOST: string;

  @IsString()
  public APP_URL: string;

  @ToPositiveNumber()
  @IsNumber()
  @Min(0)
  @Max(65535)
  public POSTGRES_PORT: number;

  @IsString()
  public POSTGRES_HOST: string;

  @IsString()
  public POSTGRES_USER: string;

  @IsString()
  public POSTGRES_PASSWORD: string;

  @IsString()
  public POSTGRES_DB: string;

  @IsString()
  public POSTGRES_URL: string;

  @IsString()
  public REDIS_USER: string;

  @IsString()
  public REDIS_PASSWORD: string;

  @IsString()
  public REDIS_HOST: string;

  @ToPositiveNumber()
  @IsNumber()
  @Min(0)
  @Max(65535)
  public REDIS_PORT: number;

  @IsString()
  public REDIS_URL: string;

  @IsString()
  public COOKIE_SECRET: string;

  @IsString()
  public SESSION_SECRET: string;

  @IsString()
  public SESSION_DOMAIN: string;

  @IsString()
  public SESSION_NAME: string;

  @IsString()
  public SESSION_FOLDER: string;

  @ToBoolean()
  @IsBoolean()
  public SESSION_SECURE: boolean;

  @ToBoolean()
  @IsBoolean()
  public SESSION_HTTP_ONLY: boolean;

  @IsString()
  public MAILER_USER: string;

  @IsString()
  public MAILER_PASSWORD: string;

  @ToPositiveNumber()
  @IsNumber()
  @Min(0)
  @Max(65535)
  public MINIO_PORT: number;

  @ToPositiveNumber()
  @IsNumber()
  @Min(0)
  @Max(65535)
  public MINIO_CONSOLE_PORT: number;

  @IsString()
  public MINIO_ROOT_USER: string;

  @IsString()
  public MINIO_ROOT_PASSWORD: string;

  @IsString()
  public MINIO_BUCKET: string;

  @IsString()
  public MINIO_ENDPOINT: string;

  @IsString()
  public MINIO_REGION: string;

  @IsString()
  public MINIO_ACCESS_KEY_ID: string;

  @IsString()
  public MINIO_SECRET_ACCESS_KEY: string;

  @IsString()
  public GRAPHQL_PREFIX: string;
}
