import { Field, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

import { SessionDeviceData } from "../types/session-device-data.types";
import { SessionLocationData } from "../types/session-location-data.types";
import { SessionMetadata } from "../types/session-metadata.types";
import { SessionDeviceDataModel } from "./session-device-data.model";
import { SessionLocationDataModel } from "./session-location-data.model";

@ObjectType()
export class SessionMetadataModel implements SessionMetadata {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  public ip: string;

  @Field(() => SessionDeviceDataModel)
  public deviceData: SessionDeviceData;

  @Field(() => SessionLocationDataModel)
  public locationData: SessionLocationData;
}
