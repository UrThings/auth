"use client";

import { useState } from "react";
import ImagesUploader from "../_components/imagesUploader";
import { useRouter } from "next/navigation";
import EditableText from "../_components/edit_able_text";

type Work = {
  startDate: string;
  endDate: string;
  company: string;
  city: string;
  img: string[];
  url: string;
};

export default function WorkExperience() {
  const [addWorkButton, setAddWorkButton] = useState(false);

  // Form-ийн state
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [company, setCompany] = useState("");
  const [city, setCity] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const [works, setWorks] = useState<Work[]>([
    {
      startDate: "2017",
      endDate: "Now",
      company: "Senior Designer at Magic Design Co",
      city: "San Francisco, CA",
      img: [
        "https://i.pinimg.com/736x/46/b5/c7/46b5c7e944c2eb3cc3584d9bec415fa3.jpg",
        "https://i.pinimg.com/736x/16/81/64/1681648ffb5f7fd4439c3788f0dcdd26.jpg",
      ],
      url: "facebook.com",
    },
    {
      startDate: "2020",
      endDate: "2024",
      company: "Junior Designer at Magic Design Co",
      city: "San Francisco, CA",
      img: [],
      url: "facebook.com",
    },
  ]);

  const router = useRouter();

  // Form submit хийх функц
  const handleAddWork = (e: React.FormEvent) => {
    e.preventDefault();

    if (!startDate || !endDate || !company || !city) {
      alert("Бүх талбарыг бөглөнө үү");
      return;
    }

    const newWork: Work = {
      startDate,
      endDate,
      company,
      city,
      img: images,
      url: "facebook.com", // Үүнийг хэрэгтэй бол input-аар авах эсвэл өөрчилж болно
    };

    setWorks((prev) => [...prev, newWork]);

    // Form-ийг цэвэрлэх
    setStartDate("");
    setEndDate("");
    setCompany("");
    setCity("");
    setImages([]);

    setAddWorkButton(false);
  };

  return (
    <div className="grid gap-6">
      <div className="flex justify-between text-base">
        <div>Work Experience</div>
        <button
          onClick={() => setAddWorkButton(!addWorkButton)}
          className="w-[40px] rounded border"
          aria-label={addWorkButton ? "Close form" : "Add work"}
        >
          {!addWorkButton ? "+" : "-"}
        </button>
      </div>

      {addWorkButton && (
        <form
          onSubmit={handleAddWork}
          className="mx-auto mt-4 max-w-md space-y-6 rounded-2xl bg-white p-6 shadow-md"
        >
          {/* Start Year */}
          <div>
            <label
              htmlFor="startDate"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Start Year
            </label>
            <input
              type="text"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="Start year"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* End Year */}
          <div>
            <label
              htmlFor="endDate"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              End Year
            </label>
            <input
              type="text"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder="End year"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Company */}
          <div>
            <label
              htmlFor="company"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Your role and Company
            </label>
            <input
              type="text"
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* City */}
          <div>
            <label
              htmlFor="city"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label
              htmlFor="images"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Зураг оруулах
            </label>
            <ImagesUploader
              onUpload={(urls) => {
                setImages(urls);
                console.log("Uploaded images:", urls);
              }}
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white shadow transition duration-300 hover:bg-blue-700"
            >
              Хадгалах
            </button>
          </div>
        </form>
      )}

      {/* Work List */}
      <div className="space-y-6">
        {works.map((work, idx) => (
          <div key={idx} className="flex flex-row gap-16 pb-2">
            <div className="text-md flex gap-2">
              <EditableText
                className="text-gray-400"
                value={work.startDate}
                onSave={() => setStartDate}
              />
              <div className="text-gray-400">-</div>
              <EditableText
                className="text-gray-400"
                value={work.endDate}
                onSave={() => setEndDate}
              />
            </div>
            <div>
              <EditableText
                className="cursor-pointer text-md hover:underline mb-[3px]"
                value={work.company}
                onSave={() => setCompany}
              />
              <EditableText 
              className="text-gray-600"
              value={work.city} 
              onSave={() => setCity} />
              <div className="flex gap-5 overflow-x-auto mt-8">
                {work.img.map((imgUrl, i) => (
                  <img
                    key={i}
                    className="h-[150px] w-auto rounded-lg"
                    src={imgUrl}
                    alt={`Work image ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
