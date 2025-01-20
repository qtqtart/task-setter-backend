import { Field, InputType } from "@nestjs/graphql";
import { Project } from "@prisma/client";
import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

@InputType()
export class CreateProjectInput implements Partial<Project> {
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
