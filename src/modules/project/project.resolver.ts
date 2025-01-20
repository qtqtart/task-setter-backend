import { UserModel } from "@modules/user/models/user.model";
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
  public async findById(@Args("projectId") projectId: string) {
    return await this._projectService.findById(projectId);
  }

  @Auth()
  @Query(() => [ProjectModel], {
    name: "findProjectsByUserId",
  })
  public async findAllByUserId(@Authorized() userId: string) {
    return await this._projectService.findAllByUserId(userId);
  }

  @Auth()
  @Query(() => [UserModel], {
    name: "findParticiantsByProjectId",
  })
  public async findParticiantsByProjectId(
    @Args("projectId") projectId: string,
  ) {
    return await this._projectService.findParticiantsByProjectId(projectId);
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
    @Args("projectId") projectId: string,
    @Args("input") input: UpdateProjectInput,
  ) {
    return await this._projectService.update(projectId, input);
  }

  @Auth()
  @Mutation(() => Boolean, {
    name: "addParticiantToProject",
  })
  public async addParticiants(
    @Args("projectId") projectId: string,
    @Args("particiantIds") particiantIds: string[],
  ) {
    return await this._projectService.addParticiants(projectId, particiantIds);
  }

  @Auth()
  @Mutation(() => Boolean, {
    name: "removeParticiantFromProject",
  })
  public async removeParticiants(
    @Args("projectId") projectId: string,
    @Args("particiantIds") particiantIds: string[],
  ) {
    return await this._projectService.removeParticiants(
      projectId,
      particiantIds,
    );
  }

  @Auth()
  @Mutation(() => Boolean, {
    name: "toggleIsArchivedProject",
  })
  public async toggleIsArchived(@Args("projectId") projectId: string) {
    return await this._projectService.toggleIsArchived(projectId);
  }

  @Auth()
  @Mutation(() => Boolean, {
    name: "uploadProjectPreview",
  })
  public async uploadPreview(
    @Args("projectId") projectId: string,
    @Args(
      "uploud",
      {
        type: () => GraphQLUpload,
      },
      FileValidationPipe,
    )
    upload: Upload,
  ) {
    return await this._projectService.uploadPreview(projectId, upload);
  }

  @Auth()
  @Mutation(() => Boolean, {
    name: "deleteProjectPreview",
  })
  public async deletePreview(@Args("projectId") projectId: string) {
    return await this._projectService.deletePreview(projectId);
  }
}
