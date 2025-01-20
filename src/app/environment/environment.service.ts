import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { EnvironmentModel } from "./models/environment.model";

@Injectable()
export class EnvironmentService {
  public constructor(private readonly _configService: ConfigService) {}

  public get<T extends keyof EnvironmentModel>(key: T) {
    return this._configService.get(key, new EnvironmentModel()[key]);
  }
}
