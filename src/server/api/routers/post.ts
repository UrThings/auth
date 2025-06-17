import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  createQuestion: protectedProcedure
  .input(z.object({
    title: z.string(),
    question: z.string(),
    answer: z.string(),
    // userId-г авирахгүй!
  }))
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;

    return ctx.db.question.create({
      data: {
        title: input.title,
        question: input.question,
        answer: input.answer,
        userId,
      },
    });
  }),


  answerTheQuestion: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        QuestionId: z.string(),
        text: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.result.create({
        data: {
          userId: input.userId,
          QuestionId: input.QuestionId,
          text: input.text,
        },
      });
    }),

  getQuestion: protectedProcedure.query(({ ctx }) => {
    if (ctx.session.user.role !== "admin") {
      throw new Error("admin baih ystoi");
    }
    return ctx.db.question.findMany();
  }),
});
