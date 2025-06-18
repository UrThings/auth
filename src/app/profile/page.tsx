"use client";

import { signIn, useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import React from "react";
import QuestionListForUsers from "../_components/QuestionListForUsers";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const { data, isLoading } = api.post.getName.useQuery(undefined, {
    enabled: status === "authenticated",
  });
  const updateToAdminMutation = api.post.updateToAdmin.useMutation({
    onSuccess: async () => {
      await signIn("credentials", {
        redirect: false,
        email: localStorage.getItem("email"),
        password: localStorage.getItem("password"),
      });
      router.refresh?.();
      router.push("/admin/user");
    },
  });

  const onMakeAdmin = async () => {
    updateToAdminMutation.mutate({ email: session?.user.email || "" });
  };

  const { data: users, error } = api.question.getQuestion.useQuery(undefined, {
    enabled: status === "authenticated"
  });

  React.useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
    if (session?.user.role == "admin") {
      router.push("/admin/user");
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
    <div className="mx-auto mt-10 w-full  rounded-lg bg-white p-6 shadow-md">
      <center>
        <h1>Profile Page</h1>
        <p>Welcome to your profile, {data ?? "..."}</p>
        <button
          onClick={() => {
            signOut({ callbackUrl: "/login" });
          }}
          className="mt-[50px] rounded-full text-white mr-[20px] bg-red-500 px-10 py-3 font-semibold transition hover:bg-red-700"
        >
          Logout
        </button>
        <button
          onClick={() => onMakeAdmin()}
          className="mt-[50px] rounded-full bg-blue-500 px-10 text-white py-3 font-semibold transition hover:bg-blue-700"
        >
          Admin boloh
        </button>
      </center>
      <ul className="mt-[50px] grid grid-cols-2">
        {users?.map((user) => (
          <QuestionListForUsers
            key={user.id} // unique key-г яг энд зааж өгөх хэрэгтэй
            questions={[
              {
                id: user.id ?? "",
                title: user.title,
                question: user.question ?? "",
                answer: user.answer,
                user: {
                  name: "User name",
                },
              },
            ]}
          />
        ))}
      </ul>
    </div>
  );
}
