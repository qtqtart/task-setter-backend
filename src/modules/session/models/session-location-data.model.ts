import { Field, ObjectType } from "@nestjs/graphql";

import { SessionLocationData } from "../types/session-location-data.types";

@ObjectType()
export class SessionLocationDataModel implements SessionLocationData {
  @Field(() => String)
  public city: string;

  @Field(() => String)
  public country: string;

  @Field(() => Number)
  public latitude: number;

  @Field(() => Number)
  public longitude: number;

  @Field(() => String)
  public timezone: string;
}
