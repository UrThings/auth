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

export default function WorkExperience({
  workexperience = [],
}: {
  workexperience?: Work[];
}) {
  const [works, setWorks] = useState<Work[]>(workexperience);

  const [addWorkButton, setAddWorkButton] = useState(false);

  // Form-ийн state
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [company, setCompany] = useState("");
  const [city, setCity] = useState("");
  const [images, setImages] = useState<string[]>([]);

  let length = works.length - 1;

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

      {works.length > 0 && works[works.length - 1]?.company && (
        <div className="space-y-6">
          {works
            .filter((work) => work.company != null && work.company !== "")
            .map((work, idx) => (
              <div key={idx} className="flex flex-row pb-2 gap-16">
                <div className="text-md flex gap-2 text-gray-400">
                  <EditableText
                    value={work.startDate}
                    onSave={() => setStartDate}
                  />
                  <div>-</div>
                  <EditableText
                    value={work.endDate}
                    onSave={() => setEndDate}
                  />
                </div>
                <div>
                  <EditableText
                    className="text-md mb-[3px] cursor-pointer hover:underline"
                    value={work.company}
                    onSave={() => setCompany}
                  />
                  <EditableText
                    className="text-gray-600"
                    value={work.city}
                    onSave={() => setCity}
                  />
                  <div className="mt-8 flex gap-5 overflow-x-auto">
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
      )}
    </div>
  );
}
