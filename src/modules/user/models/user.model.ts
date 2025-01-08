import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "@prisma/client";
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from "class-validator";

@ObjectType()
export class UserModel implements User {
  @Field(() => String)
  @IsUUID("4")
  @IsString()
  @IsNotEmpty()
  public id: string;

  @Field(() => Date)
  @IsDate()
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
