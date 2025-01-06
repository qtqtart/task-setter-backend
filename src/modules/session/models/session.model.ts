import { Field, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty, IsUUID } from "class-validator";
import { Session } from "express-session";

import { SessionMetadata } from "../types/session-metadata.types";
import { SessionMetadataModel } from "./session-metadata.model";

@ObjectType()
export class SessionModel
  implements Pick<Session, "id" | "accountId" | "metadata">
{
  @Field(() => String)
  @IsUUID("4")
  @IsNotEmpty()
  public id: string;

  @Field(() => String)
  @IsNotEmpty()
  public accountId: string;

  @Field(() => SessionMetadataModel)
  public metadata: SessionMetadata;
}
