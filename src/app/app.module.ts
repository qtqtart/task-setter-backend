import { PrismaModule } from "@app/prisma/prisma.module";
import configuration from "@shared/config/configuration";

import { ApolloDriver } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";

import { getGraphQLConfig } from "./graphql/graphql.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      driver: ApolloDriver,
      useFactory: getGraphQLConfig,
    }),
    PrismaModule,
  ],
})
export class AppModule {}
