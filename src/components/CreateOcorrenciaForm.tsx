import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "~/server/uploadthing";
// You need to import our styles for the button to look right. Best to import in the root /_app.tsx but this is fine
import "@uploadthing/react/styles.css";
import { api } from "~/utils/api";

const schema = z.object({
  date: z.enum(["ontem", "hoje", "anteontem"]),
  idade: z.string().min(1, "Idade é obrigatória"),
  description: z.string().min(1, "Descrição é obrigatória"),
  name: z.string().min(1, "Nome é obrigatório"),
  location: z.enum([
    "Barbinos",
    "Fruta de Santo Amaro",
    "Maciel Parente",
    "Florestal",
    "Mina",
    "Flor do Pinhal",
    "Itamarati",
    "Triangulo",
    "Imperador",
    "João Lanhoso",
    "Anny",
    "Delamare",
    "Presidente Wilson",
    "Comandante Taylor",
  ]),
});

type FormData = z.infer<typeof schema>;

const CreateOcorrenciaForm: React.FC = () => {
  const { mutate } = api.ocorrencias.createOcorrencias.useMutation({
    onSuccess: () => {
      alert("Ocorrência criada com sucesso");
    },
    onError: (e) => {
      alert("Ocorreu um erro ao criar a ocorrência");
      console.error(e);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [fileUrl, setFileUrl] = React.useState<string | null>(null);

  const onSubmit = (data: FormData) => {
    if (!fileUrl) {
      alert("Você precisa enviar uma foto");
      return;
    }

    const dateOptions = {
      ontem: new Date(Date.now() - 86400000).toISOString().split("T")[0],
      hoje: new Date().toISOString().split("T")[0],
      anteontem: new Date(Date.now() - 2 * 86400000)
        .toISOString()
        .split("T")[0],
    };

    mutate({
      // dataEnchente: dateOptions[data.date],
      dataEnchente: dateOptions[data.date] as string,
      relato: data.description,
      local: data.location,
      nome: data.name,
      link: fileUrl,
      idade: data.idade,
    });
  };

  return (
    <div className="flex w-full flex-col items-center justify-center  ">
      <form
        className="mb-4 w-full  rounded-lg bg-white px-8 pb-8 pt-6 shadow-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold" htmlFor="name">
            Nome:
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
            type="text"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-xs italic text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold" htmlFor="age">
            Idade:
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
            type="number"
            min="1"
            {...register("idade")}
          />
          {errors.idade && (
            <p className="text-xs italic text-red-500">
              {errors.idade.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-bold" htmlFor="option">
            Local:
          </label>
          <select
            className="block w-full appearance-none rounded border border-gray-200 bg-white px-4 py-3 pr-8 leading-tight focus:border-gray-500 focus:bg-white focus:outline-none"
            {...register("location")}
          >
            <option value="Barbinos"> Barbinos</option>
            <option value="Fruta de Santo Amaro">Fruta de Santo Amaro</option>
            <option value="Maciel Parente"> Maciel Parente</option>
            <option value="Florestal"> Florestal</option>
            <option value="Mina"> Mina</option>
            <option value="Flor do Pinhal"> Flor do Pinhal</option>
            <option value="Itamarati"> Itamarati</option>
            <option value="Triangulo"> Triangulo</option>
            <option value="Imperador"> Imperador</option>
            <option value="João Lanhoso"> João Lanhoso</option>
            <option value="Anny">Anny</option>
            <option value="Delamare">Delamare</option>
            <option value="Presidente Wilson">Presidente Wilson</option>
            <option value="Comandante Taylor">Comandante Taylor</option>
          </select>
          {errors.location && (
            <p className="text-xs italic text-red-500">
              {errors.location.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold" htmlFor="date">
            Data da enchente:
          </label>
          <select
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
            {...register("date")}
          >
            <option value="ontem">Ontem</option>
            <option value="hoje">Hoje</option>
            <option value="anteontem">Anteontem</option>
          </select>
          {errors.date && (
            <p className="text-xs italic text-red-500">{errors.date.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold" htmlFor="description">
            Descrição:
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
            type="text"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-xs italic text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="mb-4 flex flex-col items-start justify-start">
          <label className="mb-2 block text-sm font-bold" htmlFor="file">
            Insira uma imagem:
          </label>

          <UploadButton<OurFileRouter>
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              // Do something with the response
              if (res) {
                setFileUrl(res[0]?.fileUrl || null);
              }
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            className=" w-1/3  cursor-pointer rounded border-2 border-black bg-orange-400  px-4 py-2 font-bold focus:outline-none"
            type="submit"
            value="Registrar"
          >
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateOcorrenciaForm;
