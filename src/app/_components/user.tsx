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
  // Хууль ёсны hook дуудах
  const deleteUserMutation = api.post.deleteUser.useMutation();
  const updateToAdminMutation = api.post.updateToAdmin.useMutation();
  const updateToUserMutation = api.post.updateToUser.useMutation();

  // Event handler-ууд
  const onDelete = () => {
    deleteUserMutation.mutate({ email });
    refreshPage(!page)
  };

  const onMakeAdmin = () => {
    updateToAdminMutation.mutate({ email });
    refreshPage(!page)
  };

  const onMakeUser = () => {
    updateToUserMutation.mutate({ email });
    refreshPage(!page)
  };

  return (
    <div className="flex items-center justify-between border p-4 rounded-xl shadow mb-3 bg-white hover:shadow-lg transition">
      <div>
        <h2 className="font-bold text-xl text-gray-800">{name}</h2>
        <p className="text-sm text-gray-600">📧 {email}</p>
        <p className="text-sm text-gray-500">🎖️ Role: {role}</p>
      </div>

      <div className="flex flex-col gap-2">
        {role !== "admin" ? (
          <button
            onClick={onMakeAdmin}
            className="bg-blue-600 w-[150px] text-white text-[12px] px-3 py-1 rounded hover:bg-blue-700 transition"
          >
            Admin болгох
          </button>
        ) : (
          <button
            onClick={onMakeUser}
            className="bg-blue-600 w-[150px] text-white text-[12px] px-3 py-1 rounded hover:bg-blue-700 transition"
          >
            User болгох
          </button>
        )}

        <button
          onClick={onDelete}
          className="bg-red-500 w-[150px] text-[12px] text-white px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Устгах
        </button>
      </div>
    </div>
  );
}
