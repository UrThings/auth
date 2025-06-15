"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import React from "react";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const { data, isLoading } = api.post.getName.useQuery(undefined, {
    enabled: status === "authenticated", 
  });

  React.useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-semibold">Ачааллаж байна...</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <center>
        <h1>Profile Page</h1>
        <p>Welcome to your profile, {data ?? "..."}</p>
        <button
          onClick={() => {
            signOut({ callbackUrl: "/login" });
          }}
          className="rounded-full mt-[50px] px-10 bg-red-500 py-3 font-semibold transition hover:bg-red-700"
        >
          Logout
        </button>
      </center>
    </div>
  );
}
