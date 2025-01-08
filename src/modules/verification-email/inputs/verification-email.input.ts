import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

@InputType()
export class VerificationEmailInput {
  @Field(() => String)
  @IsString()
  @IsUUID("4")
  @IsNotEmpty()
  public tokenId: string;
}
