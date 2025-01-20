import { Upload } from "graphql-upload-ts";
import sharp from "sharp";

export const createWebpBuffer = async (
  upload: Upload,
  {
    width,
    height,
  }: {
    width: number;
    height: number;
  },
) => {
  const chunks: Buffer[] = [];

  for await (const chunk of upload.file.createReadStream()) {
    chunks.push(chunk);
  }

  const buffer = await sharp(Buffer.concat(chunks))
    .resize(width, height)
    .webp()
    .toBuffer();

  return buffer;
};
