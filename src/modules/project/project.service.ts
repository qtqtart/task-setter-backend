import { PrismaService } from "@app/prisma/prisma.service";
import { S3Service } from "@app/s3/s3.service";
import { createWebpBuffer } from "@shared/utils/create-webp-buffer.util";

import { ConflictException, Injectable } from "@nestjs/common";
import { Upload } from "graphql-upload-ts";

import { CreateProjectInput } from "./inputs/create-project.input";
import { UpdateProjectInput } from "./inputs/update-project.input";

@Injectable()
export class ProjectService {
  public constructor(
    private readonly _prismaService: PrismaService,
    private readonly _s3Service: S3Service,
  ) {}

  public async findById(id: string) {
    const project = await this._prismaService.project.findUnique({
      where: {
        id,
      },
    });

    return project;
  }

  public async findParticiantsByProjectId(projectId: string) {
    const project = await this._prismaService.project.findUnique({
      where: {
        id: projectId,
      },
      include: {
        particiants: true,
      },
    });

    return project.particiants;
  }

  public async findAllByUserId(userId: string) {
    const projects = await this._prismaService.project.findMany({
      where: {
        OR: [
          {
            creatorId: userId,
          },
          {
            particiants: { some: { id: userId } },
          },
        ],
      },
    });

    return projects;
  }

  public async create(userId: string, input: CreateProjectInput) {
    const project = await this._prismaService.project.create({
      data: {
        title: input.title,
        description: input.description,
        creatorId: userId,
        particiants: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return project;
  }

  public async update(projectId: string, input: UpdateProjectInput) {
    const project = await this._prismaService.project.update({
      where: {
        id: projectId,
      },
      data: {
        title: input.title,
        description: input.description,
      },
    });

    return project;
  }

  public async addParticiants(projectId: string, particiantIds: string[]) {
    await this._prismaService.project.update({
      where: {
        id: projectId,
      },
      data: {
        particiants: {
          connect: particiantIds.map((id) => ({ id })),
        },
      },
    });

    return true;
  }

  public async removeParticiants(projectId: string, particiantIds: string[]) {
    await this._prismaService.project.update({
      where: {
        id: projectId,
      },
      data: {
        particiants: {
          disconnect: particiantIds.map((id) => ({ id })),
        },
      },
    });

    return true;
  }

  public async delete(id: string) {
    await this._prismaService.project.delete({
      where: {
        id,
      },
    });

    return true;
  }

  public async uploadPreview(projectId: string, upload: Upload) {
    const project = await this.findById(projectId);

    if (!project) {
      throw new ConflictException("project not found by id");
    }

    if (project.previewUrl) {
      await this._s3Service.delete(project.previewUrl);
    }

    const fileName = `projects/${projectId}.webp`;
    const buffer = await createWebpBuffer(upload, {
      height: 720,
      width: 1200,
    });

    await this._s3Service.upload(fileName, buffer, "image/webp");
    await this._prismaService.project.update({
      where: {
        id: projectId,
      },
      data: {
        previewUrl: fileName,
      },
    });

    return true;
  }

  public async deletePreview(projectId: string) {
    const project = await this.findById(projectId);

    if (!project) {
      throw new ConflictException("project not found by id");
    }

    if (!project.previewUrl) {
      return;
    }

    await this._s3Service.delete(project.previewUrl);
    await this._prismaService.project.update({
      where: {
        id: projectId,
      },
      data: {
        previewUrl: null,
      },
    });

    return true;
  }
}
