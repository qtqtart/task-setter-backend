import { Field, ID, ObjectType } from "@nestjs/graphql";
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
  public userId: string;

  @Field(() => SessionMetadataModel)
  public metadata: SessionMetadata;
}
