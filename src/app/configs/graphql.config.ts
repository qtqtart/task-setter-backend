import { EnvironmentService } from "@app/environment/environment.service";

import { ApolloDriverConfig } from "@nestjs/apollo";
import { join } from "path";

export const getGraphQLConfig = (
  environmentService: EnvironmentService,
): ApolloDriverConfig => ({
  sortSchema: true,
  path: environmentService.get("GRAPHQL_PREFIX"),
  autoSchemaFile: join(process.cwd(), "graphql/schema.gql"),
  playground: {
    env: environmentService.get("NODE_ENV") === "development",
    settings: {
      "request.credentials": "include",
    },
  },
  context: ({ req, res }) => ({ req, res }),
});
