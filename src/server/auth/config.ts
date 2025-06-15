import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

import { db } from "~/server/db";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authConfig = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  providers: [
    // ✅ Google нэвтрэлт
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),

    // ✅ Email/Password логин
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Имэйл", type: "text" },
        password: { label: "Нууц үг", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials ?? {};

        if (typeof email !== "string" || typeof password !== "string") {
          throw new Error("Имэйл болон нууц үг шаардлагатай");
        }

        const user = await db.user.findUnique({
          where: { email },
        });

        if (!user || !user.hashedPassword) {
          throw new Error("Хэрэглэгч олдсонгүй");
        }

        const isValid = await compare(password, user.hashedPassword);
        if (!isValid) {
          throw new Error("Нууц үг буруу байна");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub as string,
        },
      };
    },
  },
} satisfies NextAuthConfig;
