import { Field, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

import { SessionLocationData } from "../types/session-location-data.types";

@ObjectType()
export class SessionLocationDataModel implements SessionLocationData {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  public city: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  public country: string;

  @Field(() => Number)
  @IsNumber()
  public latitude: number;

  @Field(() => Number)
  @IsNumber()
  public longitude: number;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  public timezone: string;
}
