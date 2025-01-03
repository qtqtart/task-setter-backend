import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Session } from "express-session";

import { SessionMetadata } from "../types/session-metadata.types";
import { SessionMetadataModel } from "./session-metadata.model";

@ObjectType()
export class SessionModel
  implements Pick<Session, "id" | "accountId" | "metadata">
{
  @Field(() => ID)
  public id: string;

  @Field(() => String)
  public accountId: string;

  @Field(() => SessionMetadataModel)
  public metadata: SessionMetadata;
}
