import axios from "axios";

import { api } from "@/lib/api-client";

type PresignResponse = {
  uploadUrl: string;
  key: string;
};

/**
 * Uploads an image to S3 via a presigned URL and returns the stored object key.
 *
 * 1. Asks the API for a presigned PUT URL for the file's content type.
 * 2. Uploads the file bytes directly to S3 (bare axios, so our auth/baseURL
 *    interceptors don't leak into the S3 request).
 * 3. Returns the key to persist alongside the owning entity.
 */
export const uploadImage = async (
  presignEndpoint: string,
  file: File,
): Promise<string> => {
  const { uploadUrl, key } = await api.post<never, PresignResponse>(
    presignEndpoint,
    { contentType: file.type },
  );

  await axios.put(uploadUrl, file, {
    headers: { "Content-Type": file.type },
  });

  return key;
};
