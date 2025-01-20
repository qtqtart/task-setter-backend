import { Resolver } from "@nestjs/graphql";

import { TaskService } from "./task.service";

@Resolver("Task")
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}
}
