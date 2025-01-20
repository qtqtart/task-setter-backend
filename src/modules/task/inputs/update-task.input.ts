import { Field, InputType } from "@nestjs/graphql";
import { Task } from "@prisma/client";
import { IsOptional, IsString, MaxLength } from "class-validator";

@InputType()
export class UpdateTaskInput implements Partial<Task> {
  @Field(() => String, {
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  public title?: string;

  @Field(() => String, {
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  public description?: string;
}
