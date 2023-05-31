import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  verifyEmail: protectedProcedure
    .input(z.object({ userId: z.string() }))

    .query(async ({ ctx, input }) => {
      const validEmails = ["marchetto.marcelo@gmail.com"];

      const email = ctx.session.user.email;
      // console.log(validEmails.includes(authUserEmail));
      if (email) {
        return validEmails.includes(email);
      } else {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Unauthorized",
        });
      }
    }),
});
