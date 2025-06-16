"use client";
import { api } from "~/trpc/react";

type UserProps = {
  name: string;
  email: string;
  role: string;
  refreshPage: (val: boolean) => void;
  page: boolean;
};

export function UserComponent({ name, email, role, refreshPage, page }: UserProps) {
  const deleteUserMutation = api.post.deleteUser.useMutation();
  const updateToAdminMutation = api.post.updateToAdmin.useMutation();
  const updateToUserMutation = api.post.updateToUser.useMutation();

  const onDelete = () => {
    deleteUserMutation.mutate({ email });
    refreshPage(!page);
  };

  const onMakeAdmin = () => {
    updateToAdminMutation.mutate({ email });
    refreshPage(!page);
  };

  const onMakeUser = () => {
    updateToUserMutation.mutate({ email });
    refreshPage(!page);
  };

  return (
    <div className="flex items-center justify-between gap-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md mb-4">
      {/* Зүүн талын мэдээлэл */}
      <div className="flex items-center gap-6 w-full">
        <div className="flex items-center justify-between min-w-[500px] w-[70%]">
          <span className="text-base font-semibold text-gray-800">Name: {name}</span>
          <span className="text-sm text-gray-500">📧Email: {email}</span>
          <span
            className={`mt-1 inline-block w-fit rounded-full px-3 py-1 text-xs font-medium ${
              role === "admin" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
            }`}
          >
            🎖️ Role: {role}
          </span>
        </div>

        {/* Баруун талын товчлуурууд */}
        <div className="flex gap-3 ml-auto">
          {role !== "admin" ? (
            <button
              onClick={onMakeAdmin}
              className="rounded-md bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-700"
            >
              Admin болгох
            </button>
          ) : (
            <button
              onClick={onMakeUser}
              className="rounded-md bg-blue-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-600"
            >
              User болгох
            </button>
          )}

          <button
            onClick={onDelete}
            className="rounded-md bg-red-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-red-600"
          >
            Устгах
          </button>
        </div>
      </div>
    </div>
  );
}
