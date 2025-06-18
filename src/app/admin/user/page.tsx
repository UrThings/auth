"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import React, { useEffect } from "react";
import { UserComponent } from "~/app/_components/user";
import { success } from "zod/v4";

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

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (session?.user.role !== "admin") {
      router.push("/profile");
    }
  }, [status, session?.user.role, router]);

  const handleRefetch = async () => {
    const result = await refetch();
  };

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
    <div>
      <div className="flex h-[100px] w-full items-center justify-around bg-blue-300">
        <div className="ml-[250px]">
          <button
            onClick={() => {
              router.push("/admin/user");
            }}
            className="h-[50px] w-[150px] rounded-md bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-700"
          >
            Users
          </button>
        </div>

        <div className="text-[60px] font-bold text-blue-600">Admin</div>
        <div className="flex w-[500px] justify-around">
          <button
            onClick={() => {
              signOut({ callbackUrl: "/login" });
            }}
            className="h-[50px] w-[150px] rounded-md bg-red-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
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
                refresh={refresh}
                refreshPage={() => setRefresh((prev) => !prev)}
                handleRefetch={() => handleRefetch()}
              />
            ))}
          </ul>
        </center>
      </div>
    </div>
  );
}
