"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import React, { useEffect, useState } from "react";
import { UserComponent } from "~/app/_components/user";
import { success } from "zod/v4";
import QuestionList from "~/app/_components/question";

export default function AdminPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [refresh, setRefresh] = React.useState(false);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [answer, setAnswer] = useState("");

  const {
    data: users,
    isLoading,
    error,
  } = api.question.getQuestion.useQuery(undefined, {
    enabled: status === "authenticated" && session?.user.role === "admin",
  });

  const createQ = api.question.createQuestion.useMutation({
    onSuccess: () => {
      alert("amjilttai asuult vvslee");
      router.push("/admin/question");
    },
    onError: (err) => {
      alert("amjiltgvi bolloo: " + err.message);
    },
  });

  const createQuestion = async () => {
    if (!session?.user?.id) {
      console.error("User not logged in");
      return;
    }

    createQ.mutate({
      title,
      question: text,
      answer,
    });

    setText("");
    setAnswer("");
    setTitle("");
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
              router.push("/admin/question");
            }}
            className="h-[50px] w-[150px] rounded-md bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-700"
          >
            question
          </button>
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
        <div className="flex justify-between">
          <div className="mt-[130px] w-[30%]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                createQuestion();
              }}
              className="mx-auto max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-xl"
            >
              <div>
                <label
                  htmlFor="title"
                  className="mb-2 block font-semibold text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="question"
                  className="mb-2 block font-semibold text-gray-700"
                >
                  Question
                </label>
                <input
                  type="text"
                  id="question"
                  name="question"
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                  }}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="answer"
                  className="mb-2 block font-semibold text-gray-700"
                >
                  Correct Answer
                </label>
                <input
                  type="text"
                  id="answer"
                  name="answer"
                  value={answer}
                  onChange={(e) => {
                    setAnswer(e.target.value);
                  }}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 py-2 text-white transition-all hover:bg-blue-700"
              >
                Submit
              </button>
            </form>
          </div>
          <div className="w-[65%]">
            <h1 className="text-[32px] font-bold text-blue-500">Admin Page</h1>
            <p>Question жагсаалт:</p>
            <ul className="mt-[50px] grid grid-cols-2">
              {users?.map((user) => (
                <QuestionList
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
        </div>
      </div>
    </div>
  );
}
