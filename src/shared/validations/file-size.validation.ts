import { ReadStream } from "graphql-upload-ts";

export const validateFileSize = (
  stream: ReadStream,
  allowedFileSize: number,
) => {
  return new Promise((resolve, reject) => {
    let fileSizeInBytes = 0;

    stream
      .on("data", (data: Buffer) => {
        fileSizeInBytes = data.byteLength;
      })
      .on("end", () => {
        resolve(fileSizeInBytes <= allowedFileSize);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};
