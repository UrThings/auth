"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import React, { useEffect } from "react";
import { UserComponent } from "../_components/user";

export default function AdminPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [refresh, setRefresh] = React.useState(false);

  const {
    data: users,
    isLoading,
    error,
    refetch,
  } = api.post.getUsers.useQuery(undefined, {
    enabled: status === "authenticated" && session?.user.role === "admin",
  });

  // Role шалгах логик
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (session?.user.role !== "admin") {
      router.push("/profile");
    }
  }, [status, session?.user.role, router]);

  // refresh болгонд refetch хийх
  useEffect(() => {
    if (status === "authenticated" && session?.user.role === "admin") {
      refetch();
    }
  }, [refresh]);

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
    <div className="mx-auto mt-10 w-full max-w-[1400px] rounded-lg bg-white p-6 shadow-md">
      <center>
        <h1 className="text-[32px] font-bold text-blue-500">Admin Page</h1>
        <p>Таны хэрэглэгчийн жагсаалт:</p>
        <ul className="mt-[50px]">
          {users?.map((user) => (
            <UserComponent
              key={user.email} // эсвэл user.id
              name={user.name ?? ""}
              email={user.email ?? ""}
              role={user.role ?? "user"}
              page={refresh}
              refreshPage={() => setRefresh((prev) => !prev)}
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
