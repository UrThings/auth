"use client";
import { api } from "~/trpc/react";

type UserProps = {
  name: string;
  email: string;
  role: string;
  refreshPage: (val: boolean) => void;
  refresh: boolean;
  handleRefetch: Function
};

export function UserComponent({
  name,
  email,
  role,
  refreshPage,
  refresh,
  handleRefetch
}: UserProps) {
  const deleteUserMutation = api.post.deleteUser.useMutation();
  const updateToAdminMutation = api.post.updateToAdmin.useMutation();
  const updateToUserMutation = api.post.updateToUser.useMutation();

  const onDelete = () => {
    deleteUserMutation.mutate({ email });
    refreshPage(!refresh);
    alert("amjilttai");
    handleRefetch();
  };

  const onMakeAdmin = () => {
    updateToAdminMutation.mutate({ email });
    refreshPage(!refresh);
    alert("amjilttai");
    handleRefetch();
  };

  const onMakeUser = () => {
    updateToUserMutation.mutate({ email });
    refreshPage(!refresh);
    alert("amjilttai");
    handleRefetch();
    
  };

  return (
    <div className="mb-4 flex items-center justify-between gap-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      {/* Зүүн талын мэдээлэл */}
      <div className="flex w-full items-center gap-6">
        <div className="flex w-[70%] min-w-[500px] items-center justify-between">
          <span className="text-base font-semibold text-gray-800">
            Name: {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
          </span>
          <span className="text-sm text-gray-500">📧Email: {email}</span>
          <span
            className={`mt-1 inline-block w-fit rounded-full px-3 py-1 text-xs font-medium ${
              role === "admin"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            🎖️ Role: {role}
          </span>
        </div>

        {/* Баруун талын товчлуурууд */}
        <div className="ml-auto flex gap-3">
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
