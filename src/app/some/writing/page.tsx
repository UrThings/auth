"use client";

import { useState } from "react";
import ImagesUploader from "~/app/_components/imagesUploader";
import { useRouter } from "next/navigation";

type Writing = {
  year: string;
  title: string;
  teaminfo: string;
  url: string;
  url2: string;
};

export default function ProfilePage() {
  const [addWritingButton, setAddWritingButton] = useState(false);

  // Form state
  const [year, setYear] = useState("");
  const [title, setTitle] = useState("");
  const [teaminfo, setTeaminfo] = useState("");
  const [url, setUrl] = useState("");
  const [url2, setUrl2] = useState("");
  const [images, setImages] = useState<string[]>([]); // Хэрэв зураг оруулах шаардлагатай бол

  const [writings, setWritings] = useState<Writing[]>([
    {
      year: "2023",
      title: "My First Writing",
      teaminfo: "Team A",
      url: "https://example.com",
      url2: "https://example.com/embed",
    },
    {
      year: "2024",
      title: "Second Writing",
      teaminfo: "Team B",
      url: "https://example2.com",
      url2: "https://example.com/embed",
    },
  ]);

  const router = useRouter();

  const handleAddWriting = (e: React.FormEvent) => {
    e.preventDefault();

    if (!year || !title || !teaminfo || !url || !url2) {
      alert("Бүх талбарыг бөглөнө үү");
      return;
    }

    const newWriting: Writing = {
      year,
      title,
      teaminfo,
      url,
      url2,
    };

    setWritings((prev) => [...prev, newWriting]);

    setYear("");
    setTitle("");
    setTeaminfo("");
    setUrl("");
    setUrl2("");

    setAddWritingButton(false);
  };

  return (
    <div className="ml-[50px] grid gap-6">
      <div className="flex w-[700px] justify-between text-[20px]">
        <div>Writings</div>
        <button
          onClick={() => setAddWritingButton(!addWritingButton)}
          className="w-[40px] border rounded"
          aria-label={addWritingButton ? "Close form" : "Add writing"}
        >
          {!addWritingButton ? "+" : "-"}
        </button>
      </div>

      {addWritingButton && (
        <form
          onSubmit={handleAddWriting}
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
              value={teaminfo}
              onChange={(e) => setTeaminfo(e.target.value)}
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

          {/* URL2 */}
          <div>
            <label
              htmlFor="url2"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              URL2 (for iframe)
            </label>
            <input
              type="text"
              id="url2"
              value={url2}
              onChange={(e) => setUrl2(e.target.value)}
              placeholder="Embed URL"
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

      {/* Writings List */}
      <div className="space-y-6">
        {writings.map((writing, idx) => (
          <div key={idx} className="flex flex-col gap-2 border-b pb-4">
            <div className="flex gap-2 font-semibold text-lg">
              <div>{writing.year}</div>
            </div>
            <div
              className="cursor-pointer hover:underline text-blue-600"
              onClick={() => router.push(`/${writing.url}`)}
            >
              {writing.title}
            </div>
            <div>{writing.teaminfo}</div>
            <div className="flex gap-5 overflow-x-auto">
              <iframe src={writing.url2} frameBorder="0" className="w-full h-[300px]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
