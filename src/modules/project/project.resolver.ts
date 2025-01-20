import { Auth } from "@shared/decorators/auth.decorator";
import { Authorized } from "@shared/decorators/authorized.decorator";
import { FileValidationPipe } from "@shared/pipes/file-validation.pipe";

import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GraphQLUpload, Upload } from "graphql-upload-ts";

import { CreateProjectInput } from "./inputs/create-project.input";
import { UpdateProjectInput } from "./inputs/update-project.input";
import { ProjectModel } from "./models/project.model";
import { ProjectService } from "./project.service";

@Resolver("Project")
export class ProjectResolver {
  public constructor(private readonly _projectService: ProjectService) {}

  @Auth()
  @Query(() => ProjectModel, {
    name: "findProjectById",
  })
  public async findById(@Args("id") id: string) {
    return await this._projectService.findById(id);
  }

  @Auth()
  @Query(() => [ProjectModel], {
    name: "findProjectsByUserId",
  })
  public async findAllByUserId(@Authorized() userId: string) {
    return await this._projectService.findAllByUserId(userId);
  }

  @Auth()
  @Mutation(() => ProjectModel, {
    name: "createProject",
  })
  public async create(
    @Authorized() userId: string,
    @Args("input") input: CreateProjectInput,
  ) {
    return await this._projectService.create(userId, input);
  }

  @Auth()
  @Mutation(() => ProjectModel, {
    name: "updateProject",
  })
  public async update(
    @Args("id") id: string,
    @Args("input") input: UpdateProjectInput,
  ) {
    return await this._projectService.update(id, input);
  }

  @Auth()
  @Mutation(() => Boolean, {
    name: "deleteProject",
  })
  public async delete(@Args("id") id: string) {
    return await this._projectService.delete(id);
  }

  @Auth()
  @Mutation(() => Boolean, {
    name: "uploadProjectPreview",
  })
  public async uploadPreview(
    @Args("id") id: string,
    @Args(
      "uploud",
      {
        type: () => GraphQLUpload,
      },
      FileValidationPipe,
    )
    upload: Upload,
  ) {
    return await this._projectService.uploadPreview(id, upload);
  }

  @Auth()
  @Mutation(() => Boolean, {
    name: "deleteProjectPreview",
  })
  public async deletePreview(@Args("id") id: string) {
    return await this._projectService.deletePreview(id);
  }
}
