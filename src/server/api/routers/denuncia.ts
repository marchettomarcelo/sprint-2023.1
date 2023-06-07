import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import axios from "axios";
import { TRPCError } from "@trpc/server";

const baseUrl = "http://3.23.96.142:8080";

export const ocorrenciasRouter = createTRPCRouter({
  getOcorrencias: protectedProcedure.query(async () => {
    
    try {
      const data = await axios.get(`${baseUrl}/denuncia`);
    
      return data.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }
    }
  }),

  getOccorenciasById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        const data = await axios.get(`${baseUrl}/denuncia/${input.id}`);
        console.log(data.data);
        return data.data;
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: error.message,
          });
        }
      }
    }),

  deleteOcorrenciasById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const data = await axios.delete(
          `${baseUrl}/denuncia/delete/${input.id}`
        );
        console.log(data);
        return data.data;
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);

          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: error.message,
          });
        }
      }
    }),

  createOcorrencias: protectedProcedure

    .input(
      z.object({
        nome: z.string(),
        dataEnchente: z.string(),
        local: z.string(),
        relato: z.string(),
        idade: z.string(),
        link: z.string(),
      })
    )
    .mutation(async ({ input }) => {

      // check if link is a png or jpg
      const link = input.link;
      const linkArray = link.split(".");
      const linkType = linkArray[linkArray.length - 1];

      let mediaType = null;

      if (linkType === "png" ) {
        mediaType = ".png";
      }

      const newPost = {
        nome: input.nome,
        dataEnchente: input.dataEnchente,
        local: input.local,
        relato: input.relato,
        idade: input.idade,
        link: input.link,
        media: null,
        mediaType: mediaType,
      };
      try {
        const data = await axios.post(`${baseUrl}/denuncia`, newPost);
        console.log(data);
        return data.data;
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);

          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: error.message,
          });
        }
      }
    }),
});
