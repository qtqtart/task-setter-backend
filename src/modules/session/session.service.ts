import { EnvironmentService } from "@app/environment/environment.service";
import { RedisService } from "@app/redis/redis.service";

import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { parse } from "bowser";
import { Request } from "express";
import { lookup } from "geoip-lite";
import { getClientIp } from "request-ip";

import { SessionModel } from "./models/session.model";
import { SessionDeviceData } from "./types/session-device-data.types";
import { SessionLocationData } from "./types/session-location-data.types";
import { SessionMetadata } from "./types/session-metadata.types";

@Injectable()
export class SessionService {
  public constructor(
    private readonly _environmentService: EnvironmentService,
    private readonly _redisService: RedisService,
  ) {}

  public getMetadata(req: Request, userAgent: string) {
    const ip =
      this._environmentService.get("NODE_ENV") === "development"
        ? "100.28.228.100"
        : getClientIp(req);

    const location = lookup(ip);
    const device = parse(userAgent);

    const locationData: SessionLocationData = {
      country: location.country,
      city: location.city,
      timezone: location.timezone,
      latitude: location.ll[0],
      longitude: location.ll[1],
    };

    const deviceData: SessionDeviceData = {
      browser: device.browser.name,
      os: device.os.name,
      platform: device.platform.type,
    };

    const sessionMetadata: SessionMetadata = {
      ip,
      locationData,
      deviceData,
    };

    return sessionMetadata;
  }

  public save(req: Request, accountId: string, userAgent: string) {
    const metadata = this.getMetadata(req, userAgent);

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

  public async findCurrent(req: Request) {
    const sessionId = req.session.id;

    const key = `${this._environmentService.get("SESSION_FOLDER")}${sessionId}`;
    const session: SessionModel = await this._redisService
      .get(key)
      .then((_session) => JSON.parse(_session))
      .then((_session) => ({
        ..._session,
        id: key.split(":")[1],
      }));

    return session;
  }

  public async findAllExceptCurrent(req: Request) {
    const accountId = req.account.id;
    const sessionId = req.session.id;

    const keys = await this._redisService.keys("*");
    const sessions: SessionModel[] = [];

    for (const key of keys) {
      const session: SessionModel = await this._redisService
        .get(key)
        .then((_session) => JSON.parse(_session))
        .then((_session) => ({
          ..._session,
          id: key.split(":")[1],
        }));

      if (session.accountId === accountId) {
        sessions.push(session);
      }
    }

    return sessions.filter((session) => session.id !== sessionId);
  }

  public async deleteExceptCurrent(req: Request, id: string) {
    if (req.session.id === id) {
      throw new ConflictException("the current session cant be deleted");
    }

    const key = `${this._environmentService.get("SESSION_FOLDER")}${id}`;

    await this._redisService.del(key);

    return true;
  }

  public async deleteAllExceptCurrent(req: Request) {
    const sessions = await this.findAllExceptCurrent(req);

    sessions.forEach(async (session) => {
      await this.deleteExceptCurrent(req, session.id);
    });

    return true;
  }
}
