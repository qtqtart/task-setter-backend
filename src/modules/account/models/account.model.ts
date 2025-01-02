import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Account } from "@prisma/client";

@ObjectType()
export class AccountModel implements Account {
  @Field(() => ID)
  public id: string;

  @Field(() => Date)
  public createdAt: Date;

  @Field(() => Date)
  public updatedAt: Date;

  @Field(() => String)
  public name: string;

  @Field(() => String)
  public email: string;

  @Field(() => String)
  public passwordHash: string;

  @Field(() => String, {
    nullable: true,
  })
  public avatar: string;

  @Field(() => String, {
    nullable: true,
  })
  public bio: string;
}
