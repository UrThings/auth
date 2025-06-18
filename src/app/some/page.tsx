"use client";

import { useState } from "react";
import ImageUploader from "../_components/ImageUploader";
import ImagesUploader from "../_components/imagesUploader";

export default function ProfilePage() {
  const [profileImg, setProfileImg] = useState("");
  const [images, setImages] = useState<string[]>([]);

  return (
    <div>
      <div className="mx-auto mt-10 max-w-2xl space-y-6 p-6">
        <ImageUploader
          onUpload={(url) => {
            setProfileImg(url);
            console.log("Profile image uploaded:", url);
          }}
        />

        {profileImg && (
          <img
            src={profileImg}
            alt="Profile preview"
            className="w-32 rounded-xl"
          />
        )}
      </div>
      <div className="mx-auto mt-10 max-w-2xl space-y-6 p-6">
        <ImagesUploader
          onUpload={(urls) => {
            setImages(urls);
            console.log("Uploaded images:", urls);
          }}
        />
        {images.length > 0 && (
          <div className="flex flex-wrap gap-4">
            {images.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Image ${index + 1}`}
                className="h-32 w-32 rounded object-cover"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
