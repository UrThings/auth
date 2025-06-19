"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import EditableText from "~/app/_components/edit_able_text";

type Writing = {
  year: string;
  title: string;
  teaminfo: string;
  url: string;
  url2: string;
};

export default function Writing({ writingData = [] }: { writingData?: Writing[] }) {
  const [addWritingButton, setAddWritingButton] = useState(false);

  const [year, setYear] = useState("");
  const [title, setTitle] = useState("");
  const [teaminfo, setTeaminfo] = useState("");
  const [url, setUrl] = useState("");
  const [url2, setUrl2] = useState("");

  const [writings, setWritings] = useState<Writing[]>(writingData);

  const router = useRouter();

  const handleAddWriting = (e: React.FormEvent) => {
    e.preventDefault();

    if (!year || !title || !teaminfo || !url || !url2) {
      alert("Бүх талбарыг бөглөнө үү");
      return;
    }

    const newWriting: Writing = { year, title, teaminfo, url, url2 };
    setWritings((prev) => [...prev, newWriting]);

    setYear("");
    setTitle("");
    setTeaminfo("");
    setUrl("");
    setUrl2("");
    setAddWritingButton(false);
  };

  return (
    <div className="grid gap-6">
      <div className="flex justify-between text-base">
        <div>Writing</div>
        <button
          onClick={() => setAddWritingButton(!addWritingButton)}
          className="w-[40px] rounded border"
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
          <div>
            <label htmlFor="year" className="mb-1 block text-sm font-medium text-gray-700">Year</label>
            <input type="text" id="year" value={year} onChange={(e) => setYear(e.target.value)} className="form-input" />
          </div>

          <div>
            <label htmlFor="title" className="mb-1 block text-sm font-medium text-gray-700">Title</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="form-input" />
          </div>

          <div>
            <label htmlFor="teaminfo" className="mb-1 block text-sm font-medium text-gray-700">Team Info</label>
            <input type="text" id="teaminfo" value={teaminfo} onChange={(e) => setTeaminfo(e.target.value)} className="form-input" />
          </div>

          <div>
            <label htmlFor="url" className="mb-1 block text-sm font-medium text-gray-700">URL</label>
            <input type="text" id="url" value={url} onChange={(e) => setUrl(e.target.value)} className="form-input" />
          </div>

          <div>
            <label htmlFor="url2" className="mb-1 block text-sm font-medium text-gray-700">URL2 (for iframe)</label>
            <input type="text" id="url2" value={url2} onChange={(e) => setUrl2(e.target.value)} className="form-input" />
          </div>

          <div>
            <button type="submit" className="btn-submit">Хадгалах</button>
          </div>
        </form>
      )}

      {writings[0]?.year && (
        <div className="space-y-6">
          {writings.map((writing, idx) => (
            <div key={idx} className="flex flex-row gap-30 pb-4">
              <div className="text-md flex gap-2 text-gray-400">
                <EditableText value={writing.year} onSave={setYear} />
              </div>
              <div>
                <div
                  className="mb-[3px] cursor-pointer hover:underline"
                  onClick={() => router.push(`/${writing.url}`)}
                >
                  <EditableText value={writing.title} onSave={setTitle} />
                </div>
                <div className="text-gray-600">
                  <EditableText value={writing.teaminfo} onSave={setTeaminfo} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
