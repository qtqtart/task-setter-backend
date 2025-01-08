import { Field, ObjectType } from "@nestjs/graphql";

import { SessionDeviceData } from "../types/session-device-data.types";

@ObjectType()
export class SessionDeviceDataModel implements SessionDeviceData {
  @Field(() => String)
  public browser: string;

  @Field(() => String)
  public os: string;

  @Field(() => String)
  public platform: string;
}
