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
  @Matches(/^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/)
  public name: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @IsEmail()
  public email: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(255)
  public password: string;
}
