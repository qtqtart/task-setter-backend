import { UserModel } from "@modules/user/models/user.model";
import { Auth } from "@shared/decorators/auth.decorator";
import { Authorized } from "@shared/decorators/authorized.decorator";

import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

import { CreateTaskInput } from "./inputs/create-task.input";
import { UpdateTaskInput } from "./inputs/update-task.input";
import { TaskModel } from "./models/task.model";
import { TaskService } from "./task.service";

@Resolver("Task")
export class TaskResolver {
  public constructor(private readonly _taskService: TaskService) {}

  @Auth()
  @Query(() => TaskModel, {
    name: "findTaskById",
  })
  public async findById(@Args("taskId") taskId: string) {
    return await this._taskService.findById(taskId);
  }

  @Auth()
  @Query(() => [TaskModel], {
    name: "findTasksByUserId",
  })
  public async findAllByUserId(@Authorized() userId: string) {
    return await this._taskService.findAllByUserId(userId);
  }

  @Auth()
  @Query(() => [UserModel], {
    name: "findParticiantsByTaskId",
  })
  public async findParticiantsByTaskId(@Args("taskId") taskId: string) {
    return await this._taskService.findParticiantsByTaskId(taskId);
  }

  @Auth()
  @Query(() => [UserModel], {
    name: "findAssigneesByTaskId",
  })
  public async findAssigneesByTaskId(@Args("taskId") taskId: string) {
    return await this._taskService.findAssigneesByTaskId(taskId);
  }

  @Auth()
  @Mutation(() => TaskModel, {
    name: "createTask",
  })
  public async create(
    @Authorized() userId: string,
    @Args("input") input: CreateTaskInput,
  ) {
    return await this._taskService.create(userId, input);
  }

  @Auth()
  @Mutation(() => TaskModel, {
    name: "updateTask",
  })
  public async update(
    @Args("taskId") taskId: string,
    @Args("input") input: UpdateTaskInput,
  ) {
    return await this._taskService.update(taskId, input);
  }

  @Auth()
  @Mutation(() => Boolean, {
    name: "addParticiantToTask",
  })
  public async addParticiants(
    @Args("taskId") taskId: string,
    @Args("particiantIds") particiantIds: string[],
  ) {
    return await this._taskService.addParticiants(taskId, particiantIds);
  }

  @Auth()
  @Mutation(() => Boolean, {
    name: "removeParticiantFromTask",
  })
  public async removeParticiants(
    @Args("taskId") taskId: string,
    @Args("particiantIds") particiantIds: string[],
  ) {
    return await this._taskService.removeParticiants(taskId, particiantIds);
  }

  @Auth()
  @Mutation(() => Boolean, {
    name: "toggleIsArchivedTask",
  })
  public async toggleIsArchived(@Args("taskId") taskId: string) {
    return await this._taskService.toggleIsArchived(taskId);
  }
}
