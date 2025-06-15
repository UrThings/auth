import Link from "next/link";

// import { LatestPost } from "~/app/_components/post";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    // void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div>
          <Link
            href="/login"
            className="rounded-full mt-[20px] bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          >
            Нэвтрэх
          </Link>
        </div>
      </main>
    </HydrateClient>
  );
}
