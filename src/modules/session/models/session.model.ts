import { Field, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import { Session } from "express-session";

import { SessionMetadata } from "../types/session-metadata.types";
import { SessionMetadataModel } from "./session-metadata.model";

@ObjectType()
export class SessionModel
  implements Pick<Session, "id" | "userId" | "metadata">
{
  @Field(() => String)
  @IsUUID("4")
  @IsString()
  @IsNotEmpty()
  public id: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  public userId: string;

  @Field(() => SessionMetadataModel)
  public metadata: SessionMetadata;
}
