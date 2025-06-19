"use client";

import { useSession } from "next-auth/react";
import { api } from "~/trpc/react";
import { skipToken } from "@tanstack/react-query";

export default function ProfilePage() {
  const { data: session } = useSession();
  const userId = session?.user.id;

  const {
    data: userdetail,
    isLoading,
    error,
  } = api.profile.getUserProfileById.useQuery(userId ? { userId } : skipToken);

  if (isLoading) return <div className="p-4">Уншиж байна...</div>;
  if (error)
    return <div className="p-4 text-red-500">Алдаа: {error.message}</div>;

  if (!userdetail) return <div className="p-4">Мэдээлэл олдсонгүй</div>;

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-6">
      {/* Profile Basic */}
      <div className="flex items-center space-x-6">
        {userdetail.img && (
          <img
            src={userdetail.img}
            alt="Profile"
            className="h-24 w-24 rounded-full border object-cover"
          />
        )}
        <div>
          <h1 className="text-2xl font-bold">{userdetail.name}</h1>
          <p className="text-gray-600">{userdetail.work_city}</p>
          <p className="mt-1 text-sm text-gray-500">{userdetail.about}</p>
        </div>
      </div>

      {/* Contact Links */}
      {userdetail.contact.length > 0 && (
        <div>
          <h2 className="mb-2 text-xl font-semibold">Contact</h2>
          <ul className="list-disc space-y-1 pl-6 text-blue-600">
            {userdetail.contact?.[0] &&
              Object.entries(userdetail.contact[0]).map(([key, value]) => {
                if (!value || key === "id" || key === "userInfoId") return null;
                return (
                  <li key={key}>
                    <a href={value} target="_blank" rel="noopener noreferrer">
                      {key}: {value}
                    </a>
                  </li>
                );
              })}
          </ul>
        </div>
      )}

      {/* Work Experience */}
      {userdetail.work_experience.length > 0 && (
        <div>
          <h2 className="mb-2 text-xl font-semibold">Ажлын туршлага</h2>
          <ul className="space-y-3">
            {userdetail.work_experience.map((work) => (
              <li key={work.id} className="rounded-md border p-4">
                <p className="font-medium">
                  {work.Company} ({work.startYear} - {work.endYear})
                </p>
                <p className="text-sm text-gray-500">{work.City}</p>
                {work.url && (
                  <a
                    href={work.url}
                    className="text-sm text-blue-500"
                    target="_blank"
                  >
                    Вэбсайт
                  </a>
                )}
                {/* Зураг байвал */}
                {work.images.length > 0 && (
                  <div className="mt-2 flex space-x-2">
                    {work.images.map((img) =>
                      img.imageUrl ? (
                        <img
                          key={img.id}
                          src={img.imageUrl || undefined}
                          className="h-16 w-16 rounded object-cover"
                          alt="work"
                        />
                      ) : null,
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Speaking */}
      {userdetail.speaking.length > 0 && (
        <div>
          <h2 className="mb-2 text-xl font-semibold">Илтгэлүүд</h2>
          <ul className="space-y-2">
            {userdetail.speaking.map((s) => (
              <li key={s.id} className="border-b pb-2">
                <p>
                  {s.title} — {s.year} ({s.city})
                </p>
                <div className="space-x-2">
                  {s.url && (
                    <a
                      href={s.url}
                      className="text-sm text-blue-500"
                      target="_blank"
                    >
                      link1
                    </a>
                  )}
                  {s.url2 && (
                    <a
                      href={s.url2}
                      className="text-sm text-blue-500"
                      target="_blank"
                    >
                      link2
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Writing */}
      {userdetail.writing.length > 0 && (
        <div>
          <h2 className="mb-2 text-xl font-semibold">Нийтлэлүүд</h2>
          <ul className="space-y-2">
            {userdetail.writing.map((w) => (
              <li key={w.id} className="border-b pb-2">
                <p>
                  {w.title} — {w.year}
                </p>
                <p className="text-sm text-gray-600">{w.teamInfo}</p>
                <div className="space-x-2">
                  {w.url && (
                    <a
                      href={w.url}
                      className="text-sm text-blue-500"
                      target="_blank"
                    >
                      link1
                    </a>
                  )}
                  {w.url2 && (
                    <a
                      href={w.url2}
                      className="text-sm text-blue-500"
                      target="_blank"
                    >
                      link2
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Side Projects */}
      {userdetail.sideProject.length > 0 && (
        <div>
          <h2 className="mb-2 text-xl font-semibold">Хажуу төслүүд</h2>
          <ul className="list-disc space-y-1 pl-6">
            {userdetail.sideProject.map((s) => (
              <li key={s.id}>
                {s.title} — {s.year}{" "}
                {s.url && (
                  <a
                    href={s.url}
                    className="text-sm text-blue-500"
                    target="_blank"
                  >
                    (link)
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Education */}
      {userdetail.education.length > 0 && (
        <div>
          <h2 className="mb-2 text-xl font-semibold">Боловсрол</h2>
          <ul className="list-disc space-y-1 pl-6">
            {userdetail.education.map((edu) => (
              <li key={edu.id}>
                {edu.title} — {edu.startYear} - {edu.endYear} ({edu.city})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
