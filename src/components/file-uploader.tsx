import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

export const FileUploader = ({
  onFileChange,
  onRemoveFile,
  types = [],
}: {
  onFileChange: (file: File) => void;
  onRemoveFile: () => void;
  types: ("image" | "pdf" | "video")[];
}) => {
  if (types.length === 0) {
    throw new Error("You must specify at least one file type");
  }

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setSelectedFile(file);
        onFileChange(file);
      }
    },
    accept: {
      "image/*": types.includes("image")
        ? [".jpeg", ".jpg", ".png", ".webp"]
        : [],
      "application/pdf": types.includes("pdf") ? [".pdf"] : [],
      "video/*": types.includes("video")
        ? [".mp4", ".mov", ".avi", ".mkv"]
        : [],
    },
    maxFiles: 1,
    multiple: false,
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const handleRemoveFile = () => {
    setSelectedFile(null);
    onRemoveFile();
  };

  return (
    <div className="space-y-2 overflow-hidden">
      <div
        {...getRootProps()}
        className={cn(
          "flex h-[120px] w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed px-4",
          isDragActive && "border-primary",
          selectedFile && "border-primary bg-primary/5",
        )}
      >
        <input {...getInputProps()} />

        {selectedFile ? (
          <>
            <div className="flex h-full w-full flex-col items-center justify-center overflow-hidden text-center">
              <div className="text-muted-foreground truncate text-sm">
                {selectedFile.name}
              </div>
              <div className="text-muted-foreground mt-1 text-xs">
                Haz clic o arrastra para cambiar
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <p className="text-muted-foreground text-sm">
              {isDragActive
                ? "Suelta la imagen aquí (máx. 10MB)"
                : "Sube una imagen de la mascota (JPG, PNG, WebP) (máx. 10MB)"}
            </p>
          </div>
        )}
      </div>
      {selectedFile && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleRemoveFile}
          className="text-destructive hover:bg-destructive hover:text-destructive-foreground shrink-0"
        >
          <XIcon className="mr-1 h-3 w-3" />
          Eliminar imagen
        </Button>
      )}
    </div>
  );
};
