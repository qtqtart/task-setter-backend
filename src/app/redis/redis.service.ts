import { EnvironmentService } from "@app/environment/environment.service";

import { Injectable } from "@nestjs/common";
import { Redis } from "ioredis";

@Injectable()
export class RedisService extends Redis {
  public constructor(private readonly _environmentService: EnvironmentService) {
    super(_environmentService.get("REDIS_URL"));
  }
}
