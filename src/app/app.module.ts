import { PrismaModule } from "@app/prisma/prisma.module";
import configuration from "@shared/config/configuration";

import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    PrismaModule,
  ],
})
export class AppModule {}
