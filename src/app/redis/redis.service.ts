import { Configuration } from "@shared/config/configuration";

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Redis } from "ioredis";

@Injectable()
export class RedisService extends Redis {
  public constructor(
    private readonly _configService: ConfigService<Configuration>,
  ) {
    super(_configService.getOrThrow("REDIS_URL"));
  }
}
