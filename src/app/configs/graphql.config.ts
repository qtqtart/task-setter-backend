import { Env } from "@shared/types/evn.types";

import { ApolloDriverConfig } from "@nestjs/apollo";
import { ConfigService } from "@nestjs/config";
import { join } from "path";

export const getGraphQLConfig = (configService: ConfigService<Env>) => {
  const config: ApolloDriverConfig = {
    sortSchema: true,
    introspection: true,
    autoSchemaFile: join(process.cwd(), "graphql", "schema.gql"),
    playground: {
      env: configService.getOrThrow("NODE_ENV"),
      settings: {
        "request.credentials": "include",
      },
    },
    path: configService.getOrThrow("GRAPHQL_PREFIX"),
    context: ({ req, res }) => ({ req, res }),
  };

  return config;
};
