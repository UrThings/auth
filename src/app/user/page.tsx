"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import EditableText from "../_components/edit_able_text";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);

  // Profile data
  const [name, setName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [website, setWebsite] = useState("");
  const [about, setAbout] = useState("");

  // Simulated fetch (in real case, replace this with tRPC or fetch call)
  useEffect(() => {
    const fetchProfile = async () => {
      await new Promise((res) => setTimeout(res, 500));

      const data = {
        name: "Sara Lawrence",
        jobTitle: "Design in San Francisco",
        website: "https://create.t3.gg",
        about:
          "I’m a passionate UX designer striving to create intuitive and engaging experiences. I’m a big believer that things can always be simpler than we think.",
      };

      setName(data.name);
      setJobTitle(data.jobTitle);
      setWebsite(data.website);
      setAbout(data.about);
      setLoading(false);
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading profile...</p>;
  }

  return (
    <div className="mx-auto mt-10 max-w-2xl space-y-6 p-6">
      {/* Top Profile Section */}
      <div className="flex items-center gap-6">
        <Image
          src="/profile.jpeg"
          alt="Profile"
          width={130}
          height={130}
          className="rounded-full object-cover"
        />

        <div className="flex flex-col gap-1">
          <EditableText
            className="text-2xl"
            value={name}
            onSave={setName}
          />
          <EditableText
            className="text-gray-600 text-lg"
            value={jobTitle}
            onSave={setJobTitle}
          />
          <EditableText
            className="text-blue-600 underline"
            value={website}
            onSave={setWebsite}
          />
        </div>
      </div>

      {/* About Section */}
      <div className="mt-18 rounded-md bg-gray-100 p-4">
        <h2 className="mb-2 font-semibold text-red">About</h2>
        <EditableText className="mt-10" value={about} onSave={setAbout} />
      </div>

      {/* Work Experience */}
      <div className="mt-18 rounded-md bg-gray-100 p-4">
        <h2 className="mb-2 font-semibold text-red">Work Experience</h2>
        <EditableText value={about} onSave={setAbout} />
      </div>
    </div>
  );
}
