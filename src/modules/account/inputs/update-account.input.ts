import { Field, InputType } from "@nestjs/graphql";
import { User } from "@prisma/client";
import { IsOptional, IsString, Matches, MaxLength } from "class-validator";

@InputType()
export class UpdateAccountInput implements Pick<User, "username" | "bio"> {
  @Field(() => String, {
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  @Matches(/^[A-Za-z0-9]+$/)
  public username: string;

  @Field(() => String, {
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  public bio: string;
}
