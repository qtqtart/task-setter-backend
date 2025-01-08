import { Field, ID, ObjectType } from "@nestjs/graphql";
import { User } from "@prisma/client";
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

@ObjectType()
export class UserModel implements User {
  @Field(() => ID)
  public id: string;

  @Field(() => Date)
  public createdAt: Date;

  @Field(() => Date)
  @IsDate()
  public updatedAt: Date;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  public username: string;

  @Field(() => String)
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  public email: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  public passwordHash: string;

  @Field(() => String, {
    nullable: true,
  })
  @IsOptional()
  @IsString()
  public avatar: string;

  @Field(() => String, {
    nullable: true,
  })
  @IsOptional()
  @IsString()
  public bio: string;

  @Field(() => Boolean)
  @IsBoolean()
  public isVerifiedByEmail: boolean;
}
