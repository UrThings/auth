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
  const [gLoading, setGoogle] = useState(false);
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

    if (!res?.error) {
        router.push("/profile");
  
    } else {
      setError("Имэйл эсвэл нууц үг буруу байна");
      setLoading(false); // Амжилтгүй бол буцааж false болгоно
    }
  };

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg font-semibold">Ачааллаж байна...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 flex max-w-sm flex-col gap-4">
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
      {error ? <p className="text-red-500">{error}</p> : ""}
      <button
        onClick={handleLogin}
        disabled={loading}
        className={`border p-2 ${
          loading
            ? "cursor-not-allowed bg-gray-400 text-white"
            : "border-blue-600 bg-blue-600 text-white hover:bg-white hover:text-black"
        }`}
      >
        {loading ? "Нэвтэрч байна..." : "Нэвтрэх"}
      </button>
      <button
        onClick={() => {
          setGoogle(true);
          signIn("google");
          setGoogle(false);
        }}
        className="flex items-center justify-center border border-blue-600 bg-white p-2 text-black hover:bg-blue-600 hover:text-white"
        title="Google-р нэвтрэх"
        aria-label="Google-р нэвтрэх"
      >
        <img
          src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
          alt="Google Icon"
          className="mr-2 h-7 w-7"
        />
        {gLoading ? "Нэвтэрч байна..." : "Google-р нэвтрэх"}
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
