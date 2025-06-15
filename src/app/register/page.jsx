"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { status } = useSession();

  const registerMutation = api.post.register.useMutation({
    onSuccess: () => {
      router.push("/login");
    },
    onError: (err) => {
      setError(err.message);
      setLoading(false); // амжилтгүй бол буцааж false болгоно
    },
  });

  const handleSubmit = () => {
    if (!name || !email || !password) {
      setError("Бүх талбарыг бөглөнө үү");
      return;
    }
    setLoading(true);
    registerMutation.mutate({ name, email, password });
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-semibold">Ачааллаж байна...</div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 flex flex-col gap-4">
      <h1 className="text-xl font-bold">Бүртгүүлэх</h1>
      <input
        className="border p-2"
        placeholder="Нэр"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border p-2"
        placeholder="Имэйл"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-2"
        placeholder="Нууц үг"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="text-red-500">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`p-2 ${
          loading
            ? "bg-gray-400 text-white cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        {loading ? "Бүртгүүлж байна..." : "Бүртгүүлэх"}
      </button>

      <p className="text-sm text-gray-500">
        Бүртгэлтэй бол{" "}
        <a href="/login" className="text-blue-600 hover:underline">
          энд дарж нэвтэрнэ үү
        </a>
      </p>
    </div>
  );
}
