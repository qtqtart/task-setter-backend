import { SessionModule } from "@modules/session/session.module";
import { UserModule } from "@modules/user/user.module";
import configuration from "@shared/config/configuration";

import { ApolloDriver } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";

import { getGraphQLConfig } from "./graphql/graphql.config";
import { PrismaModule } from "./prisma/prisma.module";
import { RedisModule } from "./redis/redis.module";

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
    RedisModule,
    //
    SessionModule,
    UserModule,
  ],
})
export class AppModule {}
