import { parseBoolean } from "@shared/lib/parse-boolean";

export interface Configuration {
  NODE_ENV: string;

  APP_HOST: string;
  APP_PORT: number;
  APP_URL: string;

  ALLOWED_ORIGIN: string;

  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_HOST: string;
  POSTGRES_PORT: number;
  POSTGRES_DB: string;
  POSTGRES_URL: string;

  REDIS_USER: string;
  REDIS_PASSWORD: string;
  REDIS_HOST: string;
  REDIS_PORT: number;
  REDIS_URL: string;

  COOKIE_DOMAIN: string;
  COOKIE_SECRET: string;
  COOKIE_HTTP_ONLY: boolean;
  COOKIE_SECURE: boolean;

  SESSION_NAME: string;
  SESSION_SECRET: string;
  SESSION_PREFIX: string;

  GRAPHQL_PREFIX: string;
}

export default (): Configuration => ({
  NODE_ENV: process.env.NODE_ENV,

  APP_HOST: process.env.APP_HOST,
  APP_PORT: parseInt(process.env.APP_PORT),
  APP_URL: process.env.APP_URL,

  ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN,

  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  POSTGRES_PORT: parseInt(process.env.POSTGRES_PORT),
  POSTGRES_DB: process.env.POSTGRES_DB,
  POSTGRES_URL: process.env.POSTGRES_URI,

  REDIS_USER: process.env.REDIS_USER,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: parseInt(process.env.REDIS_PORT),
  REDIS_URL: process.env.REDIS_URL,

  COOKIE_DOMAIN: process.env.COOKIE_DOMAIN,
  COOKIE_SECRET: process.env.COOKIE_SECRET,
  COOKIE_HTTP_ONLY: parseBoolean(process.env.COOKIE_HTTP_ONLY),
  COOKIE_SECURE: parseBoolean(process.env.COOKIE_SECURE),

  SESSION_NAME: process.env.SESSION_NAME,
  SESSION_SECRET: process.env.SESSION_SECRET,
  SESSION_PREFIX: process.env.SESSION_PREFIX,

  GRAPHQL_PREFIX: process.env.GRAPHQL_PREFIX,
});
