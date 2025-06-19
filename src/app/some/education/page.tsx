"use client";

import { useState } from "react";
import EditableText from "~/app/_components/edit_able_text";

type Education = {
  startYear: string;
  endYear: string;
  title: string;
  city: string;
};

export default function Education({ educationData }: { educationData: Education[] }) {


  const [addEducationButton, setAddEducationButton] = useState(false);

  // Form state
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");

  const [educations, setEducations] = useState<Education[]>(educationData);

  const handleAddEducation = (e: React.FormEvent) => {
    e.preventDefault();

    if (!startYear || !endYear || !title || !city) {
      alert("Бүх талбарыг бөглөнө үү");
      return;
    }

    const newEducation: Education = {
      startYear,
      endYear,
      title,
      city,
    };

    setEducations((prev) => [...prev, newEducation]);

    // Form цэвэрлэх
    setStartYear("");
    setEndYear("");
    setTitle("");
    setCity("");

    setAddEducationButton(false);
  };

  return (
    <div className="grid gap-6">
      <div className="flex justify-between">
        <div>Educations</div>
        <button
          onClick={() => setAddEducationButton(!addEducationButton)}
          className="w-[40px] rounded border"
          aria-label={addEducationButton ? "Close form" : "Add education"}
        >
          {!addEducationButton ? "+" : "-"}
        </button>
      </div>

      {addEducationButton && (
        <form
          onSubmit={handleAddEducation}
          className="mx-auto mt-4 max-w-md space-y-6 rounded-2xl bg-white p-6 shadow-md"
        >
          {/* Start Year */}
          <div>
            <label
              htmlFor="startYear"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Start Year
            </label>
            <input
              type="text"
              id="startYear"
              value={startYear}
              onChange={(e) => setStartYear(e.target.value)}
              placeholder="Start Year"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* End Year */}
          <div>
            <label
              htmlFor="endYear"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              End Year
            </label>
            <input
              type="text"
              id="endYear"
              value={endYear}
              onChange={(e) => setEndYear(e.target.value)}
              placeholder="End Year"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Degree or Program"
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

      {/* Education List */}
      {educations[0]?.title && <div className="space-y-6">
        {educations.map((education, idx) => (
          <div key={idx} className="flex flex-row gap-16 pb-4">
            <div className="text-md flex gap-2 text-gray-400">
              <div>
                <EditableText
                  value={education.startYear}
                  onSave={() => setStartYear}
                />
              </div>
              -
              <div>
                <EditableText
                  value={education.endYear}
                  onSave={() => setEndYear}
                />
              </div>
            </div>
            <div className="mb-[3px]">
              <div>
                <EditableText value={education.title} onSave={() => setTitle} />
              </div>
              <div className="text-gray-600">
                <EditableText value={education.city} onSave={() => setCity} />
              </div>
            </div>
          </div>
        ))}
      </div>}
    </div>
  );
}
