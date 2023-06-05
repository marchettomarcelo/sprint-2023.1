import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import axios from "axios";
export const ocorrenciasRouter = createTRPCRouter({

  getOcorrencias: protectedProcedure
    .query(async() => {
      try{
        const data = await axios.get(`http://localhost:8080/denuncia`);
        console.log(data);
        return data.data;
        }
        catch(error){
          if (error instanceof Error){
            console.log(error.message);
          }
      }
    }),

  getOccorenciasById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({input}) => {
      try{
        const data = await axios.get(`http://localhost:8080/denuncia/${input.id}`);
        console.log(data);
        return data.data;
        }
        catch(error){
          if (error instanceof Error){
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
    .mutation(async ({input}) => {
      try{
        const data = await axios.delete(`http://localhost:8080/denuncia/delete/${input.id}`);
        console.log(data);
        return data.data;
        }
        catch(error){
          if (error instanceof Error){
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
    .mutation(async({input}) => {
      const newPost = {
        nome: input.nome,
        dataEnchente: input.dataEnchente,
        local: input.local,
        relato: input.relato
    };
      try{
        const data = await axios.post(`http://localhost:8080/denuncia`, newPost);
        console.log(data);
        return data.data;
        }
        catch(error){
          if (error instanceof Error){
            console.log(error.message);
          }
      }
    }),
  });
