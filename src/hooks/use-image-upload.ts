import { useState } from "react";

import { uploadImage } from "@/lib/upload";

/**
 * Uploads an image to S3 through a presigned URL minted by `presignEndpoint`,
 * tracking an `isUploading` flag for the UI. Returns the stored object key.
 */
export const useImageUpload = (presignEndpoint: string) => {
  const [isUploading, setIsUploading] = useState(false);

  const upload = async (file: File): Promise<string> => {
    setIsUploading(true);
    try {
      return await uploadImage(presignEndpoint, file);
    } finally {
      setIsUploading(false);
    }
  };

  return { upload, isUploading };
};
