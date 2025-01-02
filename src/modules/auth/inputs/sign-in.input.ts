import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

@InputType()
export class SignInInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  public login: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(255)
  public password: string;
}
