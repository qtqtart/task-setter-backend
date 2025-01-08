import { Field, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

import { SessionDeviceData } from "../types/session-device-data.types";

@ObjectType()
export class SessionDeviceDataModel implements SessionDeviceData {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  public browser: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  public os: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  public platform: string;
}
