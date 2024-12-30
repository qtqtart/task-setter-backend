import { extend, Field, ID, ObjectType } from "@nestjs/graphql";
import { User } from "@prisma/client";

@ObjectType()
export class UserModel implements User {
  @Field(() => ID)
  public id: string;

  @Field(() => Date)
  public createdAt: Date;

  @Field(() => Date)
  public updatedAt: Date;

  @Field(() => String)
  public username: string;

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
