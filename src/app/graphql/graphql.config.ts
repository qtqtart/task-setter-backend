import { Configuration } from "@shared/config/configuration";

import { ApolloDriverConfig } from "@nestjs/apollo";
import { ConfigService } from "@nestjs/config";
import { join } from "path";

export const getGraphQLConfig = (
  configService: ConfigService<Configuration>,
) => {
  const config: ApolloDriverConfig = {
    sortSchema: true,
    autoSchemaFile: join(process.cwd(), "src", "app", "graphql", "schema.gql"),
    playground: configService.getOrThrow("NODE_ENV"),
    path: configService.getOrThrow("GRAPHQL_PREFIX"),
    context: ({ req, res }) => ({ req, res }),
  };

  return config;
};
