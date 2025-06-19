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
import { useSession } from "next-auth/react";
import { skipToken } from "@tanstack/react-query";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);

  const { mutate: updateProfile } = api.profile.updateTheProfile.useMutation();
  const { data: session } = useSession();

  const userId = session?.user.id;



  // Profile data
  const [name, setName] = useState(session?.user.name);
  const [jobTitle, setJobTitle] = useState("");
  const [website, setWebsite] = useState("");
  const [about, setAbout] = useState("");

  const {
    data: userdetail,
    isLoading,
    error,
  } = api.profile.getUserProfileById.useQuery(userId ? { userId } : skipToken);

  // Simulated fetch (in real case, replace this with tRPC or fetch call)
  useEffect(() => {
    if (!loading) {
      const timeout = setTimeout(() => {
        updateProfile({
          name: name ? name : "",
          work_city: jobTitle,
          webUrl: website,
          about,
        });
      }, 1000); // 1 секунд хүлээгээд хадгална (debounce)

      return () => clearTimeout(timeout); // өмнөх хадгалах давхардлыг цуцлах
    }
  }, [name, jobTitle, website, about]);

  if (isLoading) return <div className="p-4">Уншиж байна...</div>;
  if (error)
    return <div className="p-4 text-red-500">Алдаа: {error.message}</div>;

  if (!userdetail) return <div className="p-4">Мэдээлэл олдсонгүй</div>;

  return (
    <div className="mx-auto mt-10 w-[70vw] max-w-[900px] min-w-[300px] space-y-6 p-6 md:min-w-[600px]">
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
            value={name ? name : ""}
            onSave={(e) => setName(e)}
          />
          <EditableText
            placeholder="Your job"
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
            placeholder="About"
            className="text-gray-600"
            value={about}
            onSave={() => setAbout}
          />
        </div>
        <WorkExperience
          workexperience={userdetail.work_experience.map((item) => ({
            startDate: item.startYear ?? "",
            endDate: item.endYear ?? "",
            company: item.Company ?? "",
            city: item.City ?? "",
            img: item.images.map((img) => img.imageUrl ?? "").filter(Boolean),
            url: item.url ?? "",
          }))}
        />

        <Writing
          writingData={userdetail.writing.map((item) => ({
            year: item.year ?? "",
            title: item.title ?? "",
            teaminfo: item.teamInfo ?? "",
            url: item.url ?? "",
            url2: item.url2 ?? "",
          }))}
        />

        <Speaking
          speakingData={userdetail.speaking.map((item) => ({
            year: item.year ?? "",
            title: item.title ?? "",
            city: item.city ?? "",
            url: item.url ?? "",
            url2: item.url2 ?? "",
          }))}
        />

        <SideProject
          projectData={userdetail.sideProject.map((item) => ({
            year: item.year ?? "",
            title: item.title ?? "",
            url: item.url ?? "",
          }))}
        />

        <Education
          educationData={userdetail.education.map((item) => ({
            startYear: item.startYear ?? "",
            endYear: item.endYear ?? "",
            title: item.title ?? "",
            city: item.city ?? "",
          }))}
        />
      </div>
    </div>
  );
}
