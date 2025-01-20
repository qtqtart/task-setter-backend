export const validateFileExtension = (
  filename: string,
  allowedExtensions: string[],
) => {
  const parts = filename.split(".");
  const extension = parts[parts.length - 1];

  return allowedExtensions.includes(extension);
};
