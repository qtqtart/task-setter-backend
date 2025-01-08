import { Match } from "@shared/decorators/match.decorator";

import { Field, InputType } from "@nestjs/graphql";
import {
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from "class-validator";

@InputType()
export class UpdatePasswordAfterConfirmMailInput {
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
  @Match(UpdatePasswordAfterConfirmMailInput, (i) => i.password)
  public passwordMatched: string;

  @Field(() => String)
  @IsString()
  @IsUUID("4")
  @IsNotEmpty()
  public tokenId: string;
}
