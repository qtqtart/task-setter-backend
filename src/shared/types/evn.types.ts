export interface Env {
  NODE_ENV: string;

  ALLOWED_ORIGIN: string;

  APP_PORT: number;
  APP_HOST: string;
  APP_URL: string;

  POSTGRES_PORT: number;
  POSTGRES_HOST: string;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DB: string;
  POSTGRES_URL: string;

  REDIS_USER: string;
  REDIS_PASSWORD: string;
  REDIS_HOST: string;
  REDIS_PORT: number;
  REDIS_URL: string;

  COOKIE_SECRET: string;

  SESSION_SECRET: string;
  SESSION_DOMAIN: string;
  SESSION_NAME: string;
  SESSION_FOLDER: string;
  SESSION_SECURE: boolean;
  SESSION_HTTP_ONLY: boolean;

  GRAPHQL_PREFIX: string;
}
