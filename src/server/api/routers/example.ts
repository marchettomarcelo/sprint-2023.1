import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const ocorrenciasRouter = createTRPCRouter({

  getOcorrencias: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return {
        nomeUsuario: "bruno",
        data: "2023-05-30",
        horario: "18:00",
        descricao:
          "Meu nome é Ana e gostaria de compartilhar o relato sobre a terrível experiência que tive ao enfrentar uma enchente em minha casa. No dia 15 de março de 2023, uma forte tempestade atingiu a minha região, trazendo consigo uma quantidade impressionante de chuva. O nível da água subiu rapidamente e, em pouco tempo, minha casa foi completamente invadida pelas águas.",
        local: "rio de janeiro",
        registroFotoVideo:
          "https://conexaoplaneta.com.br/wp-content/uploads/2020/02/enchentes-sao-paulo-conexao-planeta.jpg",
        mmChovido: 15,
        previsaoTempo: "cloudy",
      };
    }),


  // getOcorrenciasById: protectedProcedure
  // deleteOcorrenciasById: protectedProcedure
  // createOcorrenciasById: protectedProcedure
});
