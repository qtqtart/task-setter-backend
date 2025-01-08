import { Field, ID, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";
import { Session } from "express-session";

import { SessionMetadata } from "../types/session-metadata.types";
import { SessionMetadataModel } from "./session-metadata.model";

@ObjectType()
export class SessionModel
  implements Pick<Session, "id" | "createdAt" | "userId" | "metadata">
{
  @Field(() => ID)
  public id: string;

  @Field(() => Date)
  public createdAt: Date;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  public userId: string;

  @Field(() => SessionMetadataModel)
  public metadata: SessionMetadata;
}
