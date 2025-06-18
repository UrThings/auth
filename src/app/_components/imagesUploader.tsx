"use client";

import { useState } from "react";

export default function ImagesUploader({
  onUpload,
}: {
  onUpload: (urls: string[]) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const uploadedUrls: string[] = [];

    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append(
          "upload_preset",
          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
        );

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await res.json();

        if (data.secure_url) {
          uploadedUrls.push(data.secure_url);
        }
      }

      if (uploadedUrls.length > 0) {
        onUpload(uploadedUrls);
        setPreviews(uploadedUrls);
      }
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        disabled={uploading}
      />
      {uploading && <p>Uploading...</p>}
      <div className="flex flex-wrap gap-4">
        {previews.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Uploaded preview ${index + 1}`}
            className="h-32 w-32 object-cover rounded border"
          />
        ))}
      </div>
    </div>
  );
}
