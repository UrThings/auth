"use client";

import { useState } from "react";
import ImageUploader from "../_components/ImageUploader";
import ImagesUploader from "../_components/imagesUploader";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [profileImg, setProfileImg] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [works, setWorks] = useState([{
    startDate: "2017",
    endDate: "Now",
    company: "Senior Designer at Magic Design Co",
    city: "Sn Francisco, CA",
    img: ["https://i.pinimg.com/736x/46/b5/c7/46b5c7e944c2eb3cc3584d9bec415fa3.jpg","https://i.pinimg.com/736x/16/81/64/1681648ffb5f7fd4439c3788f0dcdd26.jpg" ],
    url: "facebook.com"

  },{
    startDate: "2020",
    endDate: "2024",
    company: "Junior Designer at Magic Design Co",
    city: "All Francisco, CA",
    img: [],
    url: "facebook.com"
  }]);

  const router = useRouter();

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

      {works.map((work) => (
        <div className="flex">
          <div className="flex">
            <div>{work.startDate}</div>
            -
            <div>{work.endDate}</div>
          </div>
          <div>
            <div onClick={() => {router.push(`/${work.url}`)}} >{work.company}</div>
            <div>{work.city}</div>
            <div className="flex gap-5">
                {work.img?.map((i)=> (
                    <div>
                        <img className="w-auto h-[150px]" src={i} alt="" />
                    </div>
                ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
