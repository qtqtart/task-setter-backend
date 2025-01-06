import { Field, ObjectType } from "@nestjs/graphql";
import { Account } from "@prisma/client";
import { IsNotEmpty, IsUUID } from "class-validator";

@ObjectType()
export class AccountModel implements Account {
  @Field(() => String)
  @IsUUID("4")
  @IsNotEmpty()
  public id: string;

  @Field(() => Date)
  public createdAt: Date;

  @Field(() => Date)
  public updatedAt: Date;

  @Field(() => String)
  @IsNotEmpty()
  public name: string;

  @Field(() => String)
  @IsNotEmpty()
  public email: string;

  @Field(() => String)
  @IsNotEmpty()
  public passwordHash: string;

  @Field(() => String, {
    nullable: true,
  })
  public avatar: string;

  @Field(() => String, {
    nullable: true,
  })
  public bio: string;

  @Field(() => Boolean)
  public isVerifiedEmail: boolean;
}
