"use client";

import { signIn ,useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import React from "react";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const { data, isLoading } = api.post.getName.useQuery(undefined, {
    enabled: status === "authenticated",
  });
  const updateToAdminMutation = api.post.updateToAdmin.useMutation({
    onSuccess: async() => {
      await signIn("credentials", { redirect: false, email: localStorage.getItem("email"), password: localStorage.getItem("password") }); 
      router.refresh?.(); 
      router.push("/admin");
    },
  });

  const onMakeAdmin = async() => {
    updateToAdminMutation.mutate({ email: session?.user.email || "" });
  
  };


  React.useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
    if (session?.user.role == "admin") {
      router.push("/admin");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg font-semibold">Ачааллаж байна...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 w-full max-w-md rounded-lg bg-white p-6 shadow-md">
      <center>
        <h1>Profile Page</h1>
        <p>Welcome to your profile, {data ?? "..."}</p>
        <button
          onClick={() => {
            signOut({ callbackUrl: "/login" });
          }}
          className="mt-[50px] rounded-full bg-red-500 px-10 py-3 font-semibold transition hover:bg-red-700"
        >
          Logout
        </button>
        <button 
        onClick={() => onMakeAdmin()}
        className="mt-[50px] rounded-full bg-blue-500 px-10 py-3 font-semibold transition hover:bg-blue-700"
        >
          Admin boloh
        </button>
      </center>
    </div>
  );
}
