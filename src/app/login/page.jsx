"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/profile");
    }
  }, [status, router]);

  const handleLogin = async () => {
    setLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.ok) {
      router.push("/profile");
    } else {
      setError("Имэйл эсвэл нууц үг буруу байна");
      setLoading(false); // Амжилтгүй бол буцааж false болгоно
    }
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-semibold">Ачааллаж байна...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 max-w-sm mx-auto mt-10">
      <h1 className="text-xl font-bold">Нэвтрэх</h1>
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
        onClick={handleLogin}
        disabled={loading}
        className={`p-2 border ${
          loading
            ? "bg-gray-400 text-white cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-white hover:text-black border-blue-600"
        }`}
      >
        {loading ? "Нэвтэрч байна..." : "Нэвтрэх"}
      </button>
      <button
        onClick={() => signIn("google")}
        className="bg-white hover:bg-blue-600 border border-blue-600 text-black hover:text-white p-2 flex items-center justify-center"
        title="Google-р нэвтрэх"
        aria-label="Google-р нэвтрэх"
      >
        <img
          src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
          alt="Google Icon"
          className="w-7 h-7 mr-2"
        />
        Google-р нэвтрэх
      </button>
      <p className="text-sm text-gray-500">
        Бүртгэлгүй бол{" "}
        <a href="/register" className="text-blue-600 hover:underline">
          энд дарж бүртгүүлнэ үү
        </a>
      </p>
    </div>
  );
}
