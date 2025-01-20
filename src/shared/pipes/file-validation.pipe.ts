import { TO_BYTE } from "@shared/consts/to-byte.const";
import { validateFileExtension } from "@shared/validations/file-extension.validation";
import { validateFileSize } from "@shared/validations/file-size.validation";

import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { FileUpload } from "graphql-upload-ts";

@Injectable()
export class FileValidationPipe implements PipeTransform {
  public async transform(file: FileUpload) {
    if (!file.filename) {
      throw new BadRequestException("filename is empty");
    }

    const isValidExtension = validateFileExtension(file.filename, [
      "jped",
      "jpg",
      "png",
      "webp",
    ]);

    if (!isValidExtension) {
      throw new BadRequestException("invalid file extension");
    }

    const stream = file.createReadStream();
    const isValidFileSize = validateFileSize(stream, TO_BYTE._10mb);

    if (!isValidFileSize) {
      throw new BadRequestException("invalid file size");
    }

    return file;
  }
}
