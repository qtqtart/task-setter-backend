import { SessionDeviceData } from "./session-device-data.types";
import { SessionLocationData } from "./session-location-data.types";

export interface SessionMetadata {
  ip: string;
  deviceData: SessionDeviceData;
  locationData: SessionLocationData;
}
