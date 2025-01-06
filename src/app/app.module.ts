import { AccountModule } from "@modules/account/account.module";
import { AuthModule } from "@modules/auth/auth.module";
import { MailerModule } from "@modules/mailer/mailer.module";
import { SessionModule } from "@modules/session/session.module";
import { TokenModule } from "@modules/token/token.module";
import { VerificationModule } from "@modules/verification/verification.module";

import { ApolloDriver } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";

import { getGraphQLConfig } from "./configs/graphql.config";
import { EnvironmentModule } from "./environment/environment.module";
import { PrismaModule } from "./prisma/prisma.module";
import { RedisModule } from "./redis/redis.module";

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      driver: ApolloDriver,
      useFactory: getGraphQLConfig,
    }),
    EnvironmentModule,
    PrismaModule,
    RedisModule,
    //
    AccountModule,
    AuthModule,
    MailerModule,
    SessionModule,
    TokenModule,
    VerificationModule,
  ],
})
export class AppModule {}
