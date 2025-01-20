import { PrismaService } from "@app/prisma/prisma.service";

import { BadRequestException, Injectable } from "@nestjs/common";

import { CreateTaskInput } from "./inputs/create-task.input";
import { UpdateTaskInput } from "./inputs/update-task.input";

@Injectable()
export class TaskService {
  public constructor(private readonly _prismaService: PrismaService) {}

  public async findById(taskId: string) {
    const task = await this._prismaService.task.findUnique({
      where: {
        id: taskId,
      },
    });

    return task;
  }

  public async findParticiantsByTaskId(taskId: string) {
    const task = await this._prismaService.task.findUnique({
      where: {
        id: taskId,
      },
      include: {
        particiants: true,
      },
    });

    return task.particiants;
  }

  public async findAssigneesByTaskId(taskId: string) {
    const task = await this._prismaService.task.findUnique({
      where: {
        id: taskId,
      },
      include: {
        assinees: true,
      },
    });

    return task.assinees;
  }

  public async findAllByUserId(userId: string) {
    const tasks = await this._prismaService.task.findMany({
      where: {
        OR: [
          {
            creatorId: userId,
          },
          {
            particiants: { some: { id: userId } },
          },
          {
            assinees: { some: { id: userId } },
          },
        ],
      },
    });

    return tasks;
  }

  public async create(userId: string, input: CreateTaskInput) {
    const task = await this._prismaService.task.create({
      data: {
        ...input,
        creatorId: userId,
        particiants: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return task;
  }

  public async update(taskId: string, input: UpdateTaskInput) {
    const task = await this._prismaService.project.update({
      where: {
        id: taskId,
      },
      data: {
        ...input,
      },
    });

    return task;
  }

  public async addParticiants(taskId: string, particiantIds: string[] = []) {
    await this._prismaService.task.update({
      where: {
        id: taskId,
      },
      data: {
        particiants: {
          connect: particiantIds.map((id) => ({ id })),
        },
      },
    });

    return true;
  }

  public async removeParticiants(taskId: string, particiantIds: string[] = []) {
    await this._prismaService.project.update({
      where: {
        id: taskId,
      },
      data: {
        particiants: {
          disconnect: particiantIds.map((id) => ({ id })),
        },
      },
    });

    return true;
  }

  public async toggleIsArchived(taskId: string) {
    const task = await this._prismaService.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!task) {
      throw new BadRequestException("task not found by id");
    }

    await this._prismaService.task.update({
      where: {
        id: taskId,
      },
      data: {
        isArchived: !task.isArchived,
      },
    });

    return true;
  }
}
