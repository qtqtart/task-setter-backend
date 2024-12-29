export interface Configuration {
  NODE_ENV: string;

  APP_PORT: number;

  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_HOST: string;
  POSTGRES_PORT: string;
  POSTGRES_DB: string;
  POSTGRES_URL: string;

  GRAPHQL_PREFIX: string;
}

export default (): Configuration => ({
  NODE_ENV: process.env.NODE_ENV,

  APP_PORT: parseInt(process.env.APP_PORT, 10),

  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  POSTGRES_PORT: process.env.POSTGRES_PORT,
  POSTGRES_DB: process.env.POSTGRES_DB,
  POSTGRES_URL: process.env.POSTGRES_URI,

  GRAPHQL_PREFIX: process.env.GRAPHQL_PREFIX,
});
