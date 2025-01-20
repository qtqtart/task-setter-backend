import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Task, TaskPriority, TaskState } from "@prisma/client";
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

@ObjectType()
export class TaskModel implements Task {
  @Field(() => ID)
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
  public title: string;

  @Field(() => String, {
    nullable: true,
  })
  @IsOptional()
  @IsString()
  public description: string;

  @Field(() => Boolean)
  @IsBoolean()
  public isArchived: boolean;

  @Field(() => Date, {
    nullable: true,
  })
  public dateStart: Date;

  @Field(() => Date, {
    nullable: true,
  })
  public dateEnd: Date;

  @Field(() => TaskState)
  public state: TaskState;

  @Field(() => TaskPriority)
  public prioriry: TaskPriority;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  public creatorId: string;
}
