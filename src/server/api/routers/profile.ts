import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const profileRouter = createTRPCRouter({
  updateTheProfile: protectedProcedure
    .input(
      z.object({
        profileImg: z.string().url().optional(),
        name: z.string().optional(),
        work_city: z.string().optional(),
        webUrl: z.string().url().optional(),
        about: z.string().optional(),
        Threads: z.string().url().optional(),
        Figma: z.string().url().optional(),
        Instagram: z.string().url().optional(),
        Bluesky: z.string().url().optional(),
        Mastodon: z.string().url().optional(),
        X: z.string().url().optional(),

        work_experience: z
          .array(
            z.object({
              startYear: z.string().optional(),
              endYear: z.string().optional(),
              Company: z.string().optional(),
              City: z.string().optional(),
              url: z.string().url().optional(),
              images: z
                .array(
                  z.object({
                    imageUrl: z.string().url().optional(),
                  }),
                )
                .optional(),
            }),
          )
          .optional(),

        speaking: z
          .array(
            z.object({
              year: z.string().optional(),
              title: z.string().optional(),
              city: z.string().optional(),
              url: z.string().url().optional(),
              url2: z.string().url().optional(),
            }),
          )
          .optional(),

        writing: z
          .array(
            z.object({
              year: z.string().optional(),
              title: z.string().optional(),
              teamInfo: z.string().optional(),
              url: z.string().url().optional(),
              url2: z.string().url().optional(),
            }),
          )
          .optional(),

        sideProject: z
          .array(
            z.object({
              year: z.string().optional(),
              title: z.string().optional(),
              url: z.string().url().optional(),
            }),
          )
          .optional(),

        education: z
          .array(
            z.object({
              startYear: z.string().optional(),
              endYear: z.string().optional(),
              title: z.string().optional(),
              city: z.string().optional(),
            }),
          )
          .optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      if (typeof userId == "string") {
        throw new Error("userId aldaatai baina");
        return;
      }

      const userInfo = await ctx.db.userInfo.findFirst({
        where: { userId: userId },
      });

      if (!userInfo) throw new Error("User info not found");

      // ✅ Үндсэн UserInfo update
      await ctx.db.userInfo.update({
        where: { id: userInfo.id },
        data: {
          ...(input.profileImg !== undefined && { img: input.profileImg }),
          ...(input.name !== undefined && { name: input.name }),
          ...(input.work_city !== undefined && { work_city: input.work_city }),
          ...(input.webUrl !== undefined && { webUrl: input.webUrl }),
          ...(input.about !== undefined && { about: input.about }),
        },
      });

      const userInfoId = userInfo.id;

      // ✅ Work experience create
      if (input.work_experience) {
        for (const work of input.work_experience) {
          const createdWork = await ctx.db.work_experience.create({
            data: {
              startYear: work.startYear ?? undefined,
              endYear: work.endYear ?? undefined,
              Company: work.Company ?? undefined,
              City: work.City ?? undefined,
              url: work.url ?? undefined,
              userinfo: { connect: { id: userInfoId } },
            },
          });

          if (work.images) {
            for (const image of work.images) {
              await ctx.db.workImage.create({
                data: {
                  imageUrl: image.imageUrl ?? undefined,
                  workExperience: { connect: { id: createdWork.id } },
                },
              });
            }
          }
        }
      }

      // ✅ Speaking create
      if (input.speaking) {
        for (const speak of input.speaking) {
          await ctx.db.speaking.create({
            data: {
              year: speak.year,
              title: speak.title,
              city: speak.city,
              url: speak.url,
              url2: speak.url2,
              userinfo: { connect: { id: userInfoId } },
            },
          });
        }
      }

      // ✅ Writing create
      if (input.writing) {
        for (const write of input.writing) {
          await ctx.db.writing.create({
            data: {
              year: write.year,
              title: write.title,
              teamInfo: write.teamInfo,
              url: write.url,
              url2: write.url2,
              userinfo: { connect: { id: userInfoId } },
            },
          });
        }
      }

      // ✅ SideProject create
      if (input.sideProject) {
        for (const side of input.sideProject) {
          await ctx.db.sideProject.create({
            data: {
              year: side.year,
              title: side.title,
              url: side.url,
              userinfo: { connect: { id: userInfoId } },
            },
          });
        }
      }

      // ✅ Education create
      if (input.education) {
        for (const edu of input.education) {
          await ctx.db.education.create({
            data: {
              startYear: edu.startYear,
              endYear: edu.endYear,
              title: edu.title,
              city: edu.city,
              userinfo: { connect: { id: userInfoId } },
            },
          });
        }
      }

      // ✅ Contact create
      await ctx.db.contact.create({
        data: {
          Threads: input.Threads,
          Figma: input.Figma,
          Instagram: input.Instagram,
          Bluesky: input.Bluesky,
          Mastodon: input.Mastodon,
          X: input.X,
          userinfo: { connect: { id: userInfoId } },
        },
      });

      return { success: true };
    }),
});
