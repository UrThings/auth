"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Project = {
  year: string;
  title: string;
  url: string;
};

export default function ProfilePage() {
  const [addProjectButton, setAddProjectButton] = useState(false);

  // Form state
  const [year, setYear] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const [projects, setProjects] = useState<Project[]>([
    {
      year: "2023",
      title: "Odoo Custom Module Development",
      url: "odoo-custom-module",
    },
    {
      year: "2024",
      title: "Odoo ERP Integration Project",
      url: "odoo-erp-integration",
    },
  ]);

  const router = useRouter();

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();

    if (!year || !title || !url) {
      alert("Бүх талбарыг бөглөнө үү");
      return;
    }

    const newProject: Project = {
      year,
      title,
      url,
    };

    setProjects((prev) => [...prev, newProject]);

    // Form цэвэрлэх
    setYear("");
    setTitle("");
    setUrl("");

    setAddProjectButton(false);
  };

  return (
    <div className="ml-[50px] grid gap-6">
      <div className="flex w-[700px] justify-between text-[20px]">
        <div>Side Projects</div>
        <button
          onClick={() => setAddProjectButton(!addProjectButton)}
          className="w-[40px] border rounded"
          aria-label={addProjectButton ? "Close form" : "Add project"}
        >
          {!addProjectButton ? "+" : "-"}
        </button>
      </div>

      {addProjectButton && (
        <form
          onSubmit={handleAddProject}
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
              placeholder="Project Title"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* URL */}
          <div>
            <label
              htmlFor="url"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              URL (slug)
            </label>
            <input
              type="text"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Project URL Slug"
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

      {/* Projects List */}
      <div className="space-y-6">
        {projects.map((project, idx) => (
          <div key={idx} className="flex flex-col gap-2 border-b pb-4">
            <div className="flex gap-2 font-semibold text-lg">
              <div>{project.year}</div>
            </div>
            <div
              className="cursor-pointer hover:underline text-blue-600"
              onClick={() => router.push(`/${project.url}`)}
            >
              {project.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
