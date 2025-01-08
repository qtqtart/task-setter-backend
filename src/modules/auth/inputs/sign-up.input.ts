import { Match } from "@shared/decorators/match.decorator";

import { Field, InputType } from "@nestjs/graphql";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

@InputType()
export class SignUpInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @Matches(/^[A-Za-z0-9]+$/)
  public username: string;

  @Field(() => String)
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  public email: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(255)
  public password: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(255)
  @Match(SignUpInput, (i) => i.password)
  public passwordMatched: string;
}
