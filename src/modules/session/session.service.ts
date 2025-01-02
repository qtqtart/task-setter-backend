import { EnvironmentService } from "@app/environment/environment.service";

import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { parse } from "bowser";
import { Request } from "express";
import { lookup } from "geoip-lite";
import { getClientIp } from "request-ip";

import { SessionMetadata } from "./types/session-metadata.types";

@Injectable()
export class SessionService {
  public constructor(
    private readonly _environmentService: EnvironmentService,
  ) {}

  public getMetadata(req: Request, userAgent: string) {
    const ip =
      this._environmentService.get("NODE_ENV") === "development"
        ? "100.28.228.100"
        : getClientIp(req);

    const location = lookup(ip);
    const device = parse(userAgent);

    const sessionMetadata: SessionMetadata = {
      ip,
      locationData: {
        country: location.country,
        city: location.city,
        region: location.region,
        timezone: location.timezone,
        latitude: location.ll[0],
        longitude: location.ll[1],
      },
      deviceData: {
        browser: device.browser.name,
        engine: device.engine.name,
        os: device.os.name,
        platform: device.platform.type,
      },
    };

    return sessionMetadata;
  }

  public save(req: Request, accountId: string, metadata: SessionMetadata) {
    return new Promise((resolve, reject) => {
      req.session.accountId = accountId;
      req.session.metadata = metadata;

      req.session.save((error) => {
        if (error) {
          return reject(
            new InternalServerErrorException("the session was not saved"),
          );
        }

        resolve(true);
      });
    });
  }

  public destroy(req: Request) {
    return new Promise((resolve, reject) => {
      req.session.destroy((error) => {
        if (error) {
          return reject(
            new InternalServerErrorException("the session was not destroyed"),
          );
        }

        req.res.clearCookie(this._environmentService.get("SESSION_NAME"));

        resolve(true);
      });
    });
  }
}
