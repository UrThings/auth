"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import EditableText from "~/app/_components/edit_able_text";

type Speaking = {
  year: string;
  title: string;
  city: string;
  url: string;
  url2: string;
};

export default function Speaking({ speakingData }: { speakingData: Speaking[] }) 
 {
  const [addSpeakingButton, setAddSpeakingButton] = useState(false);

  // Form state
  const [year, setYear] = useState("");
  const [title, setTitle] = useState("");
  const [city, setcity] = useState("");
  const [url, setUrl] = useState("");
  const [url2, setUrl2] = useState("");

  const [speakings, setSpeakings] = useState<Speaking[]>(speakingData);

  const router = useRouter();

  const handleAddSpeaking = (e: React.FormEvent) => {
    e.preventDefault();

    if (!year || !title || !city || !url ) {
      alert("Бүх талбарыг бөглөнө үү");
      return;
    }

    const newSpeaking: Speaking = {
      year,
      title,
      city,
      url,
      url2,
    };

    setSpeakings((prev) => [...prev, newSpeaking]);

    // Form цэвэрлэх
    setYear("");
    setTitle("");
    setcity("");
    setUrl("");
    setUrl2("");

    setAddSpeakingButton(false);
  };

  return (
    <div className="grid gap-6">
      <div className="flex justify-between">
        <div>Speaking</div>
        <button
          onClick={() => setAddSpeakingButton(!addSpeakingButton)}
          className="w-[40px] rounded border"
          aria-label={addSpeakingButton ? "Close form" : "Add speaking"}
        >
          {!addSpeakingButton ? "+" : "-"}
        </button>
      </div>

      {addSpeakingButton && (
        <form
          onSubmit={handleAddSpeaking}
          className="mx-auto mt-4 max-w-md space-y-6 rounded-2xl bg-white p-6 shadow-md"
        >
          {/* Year */}
          <div>
            <label
              htmlFor="year"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Year
            </label>
            <input
              type="text"
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Year"
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
              placeholder="Title"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Team Info */}
          <div>
            <label
              htmlFor="teaminfo"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Team Info
            </label>
            <input
              type="text"
              id="teaminfo"
              value={city}
              onChange={(e) => setcity(e.target.value)}
              placeholder="Team info"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* URL */}
          <div>
            <label
              htmlFor="url"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              URL
            </label>
            <input
              type="text"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="URL"
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

      {/* Speakings List */}
      {speakings[0]?.year && <div className="space-y-6">
        {speakings.map((speaking, idx) => (
          <div key={idx} className="flex flex-row gap-30 pb-4">
            <div className="text-md flex text-gray-400">
              <div>
                <EditableText value={speaking.year} onSave={() => setYear} />
              </div>
            </div>
            <div>
              <div
                className="mb-[3px] cursor-pointer hover:underline"
                onClick={() =>
                  router.push(
                    `/${(
                      <EditableText
                        value={speaking.url}
                        onSave={() => setUrl}
                      />
                    )}`,
                  )
                }
              >
                <EditableText value={speaking.title} onSave={() => setTitle} />
              </div>
              <div className="text-gray-600">
                <EditableText value={speaking.city} onSave={() => setcity} />
              </div>
            </div>
          </div>
        ))}
      </div>}
    </div>
  );
}
