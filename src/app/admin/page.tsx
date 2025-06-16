"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import React, { useEffect, useState } from "react";
import { UserComponent } from "../_components/user";

export default function AdminPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [page, refreshPage] = useState(false);

  const {
    data: users,
    isLoading,
    error,
    refetch
  } = api.post.getUsers.useQuery(undefined, {
    enabled: status === "authenticated" && session?.user.role === "admin",
  });

  
useEffect(() => {
  if (status === "authenticated" && session?.user.role === "admin") {
    refetch();
  }
}, [page, status, session?.user.role, refetch]);


  console.log(users);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
    if (session?.user.role !== "admin") {
      router.push("/profile");
    }
  }, [status, session?.user.role, router]);

  if (status === "loading" || isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg font-semibold">Ачааллаж байна...</div>
      </div>
    );
  }

  if (error) {
    return <div>Алдаа гарлаа: {error.message}</div>;
  }

  return (
    <div className="mx-auto mt-10 w-full max-w-md rounded-lg bg-white p-6 shadow-md">
      <center>
        <h1>Admin Page</h1>
        <p>Таны хэрэглэгчийн жагсаалт:</p>
        <ul>
          {users?.map((user) => (
            <UserComponent
              name={user.name ?? ""}
              email={user.email ?? ""}
              role={user.role ?? "user"}
              page={page}
              refreshPage={refreshPage}

            />
          ))}
        </ul>
        <button
          onClick={() => {
            signOut({ callbackUrl: "/login" });
          }}
          className="mt-[50px] rounded-full bg-red-500 px-10 py-3 font-semibold transition hover:bg-red-700"
        >
          Logout
        </button>
      </center>
    </div>
  );
}
