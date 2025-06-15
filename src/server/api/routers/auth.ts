// ~/server/api/routers/auth.ts
import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "~/server/api/trpc";
import { hash } from "bcryptjs";

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        password: z.string().min(6),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const existingUser = await ctx.db.user.findUnique({
        where: { email: input.email },
      });

      if (existingUser) {
        throw new Error("Ийм имэйлтэй хэрэглэгч бүртгэлтэй байна");
      }

      const hashedPassword = await hash(input.password, 12);

      await ctx.db.user.create({
        data: {
          name: input.name,
          email: input.email,
          hashedPassword,
        },
      });

      return { success: true };
    }),
    getName: protectedProcedure.query(({ctx}) => {
      if (!ctx.session.user) {
        throw new Error("Хэрэглэгч нэвтрээгүй байна");
      }
      return ctx.session.user.name;
    }),
});
