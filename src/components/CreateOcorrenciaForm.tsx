import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";


const schema = z.object({
  date: z.date().refine((date) => date !== null, {
    message: "Data é obrigatória",
  }),
  time: z.string().nonempty("Hora é obrigatória"),
  description: z.string().min(1, "Descrição é obrigatória"),
  name: z.string().min(1, "Nome é obrigatório"),
  location: z.enum(["option1", "option2"]),
  file: z.any(),
});

type FormData = z.infer<typeof schema>;

const CreateOcorrenciaForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
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

        <div className="mb-6">
          <label className="mb-2 block text-sm font-bold" htmlFor="option">
            Local:
          </label>
          <select
            className="block w-full appearance-none rounded border border-gray-200 bg-white px-4 py-3 pr-8 leading-tight focus:border-gray-500 focus:bg-white focus:outline-none"
            {...register("location")}
          >
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
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
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
            type="date"
            {...register("date", { valueAsDate: true })}
          />
          {errors.date && (
            <p className="text-xs italic text-red-500">{errors.date.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold" htmlFor="time">
            Hora da enchente:
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
            type="time"
            {...register("time")}
          />
          {errors.time && (
            <p className="text-xs italic text-red-500">{errors.time.message}</p>
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
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold"
            htmlFor="file"
          >
            Insira uma imagem:
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border bg-white px-3 py-2 leading-tight shadow focus:outline-none"
            {...register("file")}
            type="file"
            accept=".png"
            onChange={(e) => {
              return e.target.files ? e.target.files[0] : null;
            }}
          />
          {errors.file?.message && (
            <p className="text-xs italic text-red-500">
              {String(errors.file.message)}
            </p>
          )}
        </div>
        <div className="flex items-center justify-center">
          <input
            className="focus:shadow-outline rounded bg-orange-500 cursor-pointer px-4 py-2 font-bold text-white hover:bg-orange-600 focus:outline-none"
            type="submit"
            value="Registrar"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateOcorrenciaForm;
