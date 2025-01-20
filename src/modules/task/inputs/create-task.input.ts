import { Field, InputType } from "@nestjs/graphql";
import { Task } from "@prisma/client";
import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

@InputType()
export class CreateTaskInput implements Partial<Task> {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  public title: string;

  @Field(() => String, {
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  public description: string;
}
