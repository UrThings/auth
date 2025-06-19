// ~/server/api/routers/auth.ts
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { hash } from "bcryptjs";
import { error } from "console";
import type { userInfo } from "os";

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        password: z.string().min(6),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const existingUser = await ctx.db.user.findUnique({
        where: { email: input.email },
      });

      if (existingUser) {
        throw new Error("Ийм имэйлтэй хэрэглэгч бүртгэлтэй байна");
      }

      const hashedPassword = await hash(input.password, 12);

      const signUser = await ctx.db.user.create({
        data: {
          name: input.name,
          email: input.email,
          hashedPassword,
        },
      });
      const user = await ctx.db.userInfo.create({
        data: {
          userId: signUser?.id ? signUser?.id : "undefined"
        }
      })

      

      const userWork = await ctx.db.work_experience.create({
        data: {
          userInfoId: user?.id ? user?.id : "undefined"
        }
      })

      await ctx.db.workImage.create({
        data: {
          workExperienceId : userWork?.id ? userWork?.id : "undefined"
        }
      })


      await ctx.db.writing.create({
        data: {
          userInfoId: user?.id ? user?.id : "undefined"
        }
      })

      await ctx.db.speaking.create({
        data: {
          userInfoId: user?.id ? user?.id : "undefined"
        }
      })

      await ctx.db.sideProject.create({
        data: {
          userInfoId: user?.id ? user?.id : "undefined"
        }
      })

      await ctx.db.education.create({
        data: {
          userInfoId: user?.id ? user?.id : "undefined"
        }
      })

      await ctx.db.contact.create({
        data: {
          userInfoId: user?.id ? user?.id : "undefined"
        }
      })

      return { success: true };
    }),
  getName: protectedProcedure.query(({ ctx }) => {
    if (!ctx.session.user) {
      throw new Error("Хэрэглэгч нэвтрээгүй байна");
    }
    return ctx.session.user.name;
  }),
  getUsers: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.session.user.role !== "admin") {
      throw new Error("admin zuwhun newterne");
    }

    const users = await ctx.db.user.findMany();

    return users; // users-ийг шууд буцааж болно, эсвэл хүсвэл { users } гэж обьект хийж болно
  }),

  deleteUser: protectedProcedure
    .input(
      z.object({
        email: z.string().email(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.session.user.role !== "admin") {
        throw new Error("admin baih");
      }

      await ctx.db.user.delete({
        where: {
          email: input.email,
        },
      });
    }),

  updateToAdmin: protectedProcedure
    .input(
      z.object({
        email: z.string().email(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // if (ctx.session.user.role !== "admin") {
      //   throw new Error("admin baih");
      // }

      await ctx.db.user.update({
        where: {
          email: input.email,
        },
        data: {
          role: "admin",
        },
      });
    }),

  updateToUser: protectedProcedure
    .input(
      z.object({
        email: z.string().email(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.session.user.role !== "admin") {
        throw new Error("admin baih");
      }

      await ctx.db.user.update({
        where: {
          email: input.email,
        },
        data: {
          role: "user",
        },
      });
    }),
});
