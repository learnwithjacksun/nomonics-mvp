import { ImagePlus } from "lucide-react";
import { useState } from "react";

interface ImageUploaderProps {
  label: string;
  image: File | null;
  setImage: (file: File) => void;
}

export default function ImageUploader({
  label,
  image,
  setImage,
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  return (
    <div>
      <p className="text-sm text-muted mb-2 font-medium">{label}</p>
      <label htmlFor="image">
        <input
          type="file"
          name="image"
          id="image"
          accept=".png, .jpg, .jpeg"
          className="hidden"
          onChange={handleFileChange}
        />
        <div className="h-40 p-4 text-center border-2 border-blue-500/10 border-dashed rounded-xl bg-blue-500/10 center">
          {!image && (
            <div className="center flex-col space-y-2">
              <ImagePlus className="text-blue-900/50" />
              <p className="text-sm text-muted">
                Drag and drop your Image file here or click to upload
              </p>
            </div>
          )}
          {image && preview && (
            <div className="grid grid-cols-2 items-center gap-4">
              <div className="h-20 overflow-hidden">
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="text-left">
                <p className="text-sm text-primary-2 font-medium">
                  {image.name}
                </p>
                <p className="text-sm text-muted">Click to change</p>
              </div>
            </div>
          )}
        </div>
      </label>
    </div>
  );
}
