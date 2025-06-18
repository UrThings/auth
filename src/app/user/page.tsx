"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import EditableText from "../_components/edit_able_text";
import { api } from "~/trpc/react";
import WorkExperience from "../some/page";
import Writing from "../some/writing/page";
import SideProject from "../some/sproject/page";
import Education from "../some/education/page";
import Speaking from "../some/speaking/page";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);

  const { mutate: updateProfile } = api.profile.updateTheProfile.useMutation();

  // Profile data
  const [name, setName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [website, setWebsite] = useState("");
  const [about, setAbout] = useState("");

  // Simulated fetch (in real case, replace this with tRPC or fetch call)
  useEffect(() => {
    if (!loading) {
      const timeout = setTimeout(() => {
        updateProfile({
          name,
          work_city: jobTitle,
          webUrl: website,
          about,
        });
      }, 1000); // 1 секунд хүлээгээд хадгална (debounce)

      return () => clearTimeout(timeout); // өмнөх хадгалах давхардлыг цуцлах
    }
  }, [name, jobTitle, website, about]);

  return (
    <div className="mx-auto mt-10 min-w-[300px] md:min-w-[600px] w-[70vw] max-w-[900px] space-y-6 p-6">
      {/* Top Profile Section */}
      <div className="flex items-center gap-6">
        <Image
          src="/profile.jpeg"
          alt="Profile"
          width={130}
          height={130}
          className="bo rounded-full object-cover"
        />

        <div className="flex flex-col gap-1">
          <EditableText
            placeholder="Your name"
            className="text-base"
            value={name}
            onSave={() => setName}
          />
          <EditableText
            placeholder="----"
            className="text-lg text-gray-600"
            value={jobTitle}
            onSave={() => setJobTitle}
          />
          <EditableText
            placeholder="url"
            className="flex w-fit items-center justify-center rounded-2xl bg-gray-100 px-4 py-1.5 text-center text-sm text-gray-600"
            value={website}
            onSave={() => setWebsite}
          />
        </div>
      </div>
      <div className="space-y-14">
        {/* About Section */}
        <div className="mt-18 rounded-md py-4">
          <h2 className="mb-2">About</h2>
          <EditableText
            className="text-gray-600"
            value={about}
            onSave={() => setAbout}
          />
        </div>
        <WorkExperience />
        <Writing />
        <Speaking />
        <SideProject />
        <Education />
      </div>
    </div>
  );
}
