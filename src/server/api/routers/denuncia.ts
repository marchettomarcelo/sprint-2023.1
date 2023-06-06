import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import axios from "axios";
import { TRPCError } from "@trpc/server";

const baseUrl = "https://3618-186-232-61-4.ngrok-free.app";
// const baseUrl = "http://localhost:8080";

export const ocorrenciasRouter = createTRPCRouter({
  getOcorrencias: protectedProcedure.query(async () => {
    console.log("ladnvluasdvl asdvlhasdvasdv");
    try {
      const data = await axios.get(`${baseUrl}/denuncia`);
      console.log(data);
      return data.data;


    } catch (error) {
      if (error instanceof Error) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error.message });
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
        console.log(data);
        return data.data;
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
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
        }
      }
    }),

  createOcorrenciasById: protectedProcedure
    .input(
      z.object({
        nome: z.string(),
        dataEnchente: z.string(),
        local: z.string(),
        relato: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const newPost = {
        nome: input.nome,
        dataEnchente: input.dataEnchente,
        local: input.local,
        relato: input.relato,
      };
      try {
        const data = await axios.post(`${baseUrl}/denuncia`, newPost);
        console.log(data);
        return data.data;
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    }),
});
