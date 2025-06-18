"use client";

import React, { useState } from "react";

type Contact = {
  id: string;
  userInfoId: string;
  Threads?: string;
  Figma?: string;
  Instagram?: string;
  Bluesky?: string;
  Mastodon?: string;
  X?: string;
};

type Props = {
  userInfoId: string;
};

export default function ContactManager({ userInfoId }: Props) {
  const [addContactOpen, setAddContactOpen] = useState(false);

  // Form-н state
  const [threads, setThreads] = useState("");
  const [figma, setFigma] = useState("");
  const [instagram, setInstagram] = useState("");
  const [bluesky, setBluesky] = useState("");
  const [mastodon, setMastodon] = useState("");
  const [x, setX] = useState("");

  // Contacts list
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "1",
      userInfoId,
      Threads: "https://threads.net/@exampleuser",
      Figma: "https://www.figma.com/@exampleuser",
      Instagram: "https://instagram.com/exampleuser",
      Bluesky: "https://blueskyweb.xyz/user/exampleuser",
      Mastodon: "https://mastodon.social/@exampleuser",
      X: "https://twitter.com/exampleuser",
    },
    {
      id: "2",
      userInfoId,
      Threads: "https://threads.net/@anotheruser",
      Instagram: "https://instagram.com/anotheruser",
      X: "https://twitter.com/anotheruser",
    },
  ]);
  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();

    // Хамгийн голыг шалгах, шаардлагатай бол өөрчлөх боломжтой
    if (!userInfoId) {
      alert("UserInfoId байхгүй байна");
      return;
    }

    // Шинэ контакт үүсгэх
    const newContact: Contact = {
      id: Date.now().toString(),
      userInfoId,
      Threads: threads || undefined,
      Figma: figma || undefined,
      Instagram: instagram || undefined,
      Bluesky: bluesky || undefined,
      Mastodon: mastodon || undefined,
      X: x || undefined,
    };

    setContacts((prev) => [...prev, newContact]);

    // Форм цэвэрлэх
    setThreads("");
    setFigma("");
    setInstagram("");
    setBluesky("");
    setMastodon("");
    setX("");

    // Form хаах
    setAddContactOpen(false);
  };

  return (
    <div className="ml-[50px] max-w-2xl space-y-6">
      <div className="flex justify-between items-center text-[20px] w-full max-w-xl">
        <h2>Contacts</h2>
        <button
          onClick={() => setAddContactOpen((v) => !v)}
          aria-label={addContactOpen ? "Close form" : "Add contact"}
          className="w-[40px] h-[40px] rounded border text-xl font-bold select-none"
        >
          {addContactOpen ? "-" : "+"}
        </button>
      </div>

      {addContactOpen && (
        <form
          onSubmit={handleAddContact}
          className="mx-auto mt-4 max-w-xl space-y-6 rounded-2xl bg-white p-6 shadow-md"
        >
          {[
            { label: "Threads", value: threads, setter: setThreads, placeholder: "Threads URL" },
            { label: "Figma", value: figma, setter: setFigma, placeholder: "Figma URL" },
            { label: "Instagram", value: instagram, setter: setInstagram, placeholder: "Instagram username or URL" },
            { label: "Bluesky", value: bluesky, setter: setBluesky, placeholder: "Bluesky URL" },
            { label: "Mastodon", value: mastodon, setter: setMastodon, placeholder: "Mastodon URL" },
            { label: "X (Twitter)", value: x, setter: setX, placeholder: "X username or URL" },
          ].map(({ label, value, setter, placeholder }) => (
            <div key={label}>
              <label htmlFor={label} className="block mb-1 font-medium text-gray-700">
                {label}
              </label>
              <input
                id={label}
                type="text"
                value={value}
                onChange={(e) => setter(e.target.value)}
                placeholder={placeholder}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white shadow hover:bg-blue-700 transition duration-300"
          >
            Хадгалах
          </button>
        </form>
      )}

      {/* Contacts list */}
      <div className="space-y-4 max-w-xl">
        {contacts.length === 0 && <p className="text-gray-500">Contact нэмэгдээгүй байна.</p>}

        {contacts.map((c) => (
          <div key={c.id} className="rounded border p-4 shadow-sm space-y-1">
             
              <p>
                <strong>Threads:</strong>{" "}
                <a href={c.Threads} target="_blank" rel="noopener noreferrer" className=" hover:underline">
                  {c.Threads ?? "username"}
                </a>
              </p>
            
            
              <p>
                <strong>Figma:</strong>{" "}
                <a href={c.Figma} target="_blank" rel="noopener noreferrer" className=" hover:underline">
                  {c.Figma ?? "username"}
                </a>
              </p>
            
           
              <p>
                <strong>Instagram:</strong>{" "}
                <a href={c.Instagram} target="_blank" rel="noopener noreferrer" className=" hover:underline">
                  {c.Instagram ?? "username"}
                </a>
              </p>
            
            
              <p>
                <strong>Bluesky:</strong>{" "}
                <a href={c.Bluesky} target="_blank" rel="noopener noreferrer" className=" hover:underline">
                  {c.Bluesky ?? "username"}
                </a>
              </p>
        
              <p>
                <strong>Mastodon:</strong>{" "}
                <a href={c.Mastodon} target="_blank" rel="noopener noreferrer" className=" hover:underline">
                  {c.Mastodon ?? "username"}
                </a>
              </p>
              <p>
                <strong>X (Twitter):</strong>{" "}
                <a href={c.X} target="_blank" rel="noopener noreferrer" className=" hover:underline">
                  {c.X ?? "username"}
                </a>
              </p>
          </div>
        ))}
      </div>
    </div>
  );
}
