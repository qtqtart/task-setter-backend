import { EnvironmentService } from "@app/environment/environment.service";

import {
  DeleteObjectCommand,
  DeleteObjectCommandInput,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from "@aws-sdk/client-s3";
import { Injectable, InternalServerErrorException } from "@nestjs/common";

@Injectable()
export class S3Service {
  private readonly _client: S3Client;

  public constructor(private readonly _environmentService: EnvironmentService) {
    this._client = new S3Client({
      endpoint: this._environmentService.get("MINIO_ENDPOINT"),
      region: this._environmentService.get("MINIO_REGION"),
      credentials: {
        accessKeyId: this._environmentService.get("MINIO_ACCESS_KEY_ID"),
        secretAccessKey: this._environmentService.get(
          "MINIO_SECRET_ACCESS_KEY",
        ),
      },
      forcePathStyle: true,
    });
  }

  public async upload(key: string, body: Buffer, contentType: string) {
    const command: PutObjectCommandInput = {
      Bucket: this._environmentService.get("MINIO_BUCKET"),
      Key: key,
      Body: body,
      ContentType: contentType,
    };

    await this._client.send(new PutObjectCommand(command)).catch(() => {
      throw new InternalServerErrorException("S3 upload failed");
    });

    return true;
  }

  public async delete(key: string) {
    const commad: DeleteObjectCommandInput = {
      Bucket: this._environmentService.get("MINIO_BUCKET"),
      Key: key,
    };

    await this._client.send(new DeleteObjectCommand(commad)).catch(() => {
      throw new InternalServerErrorException("S3 delete failed");
    });

    return true;
  }
}
