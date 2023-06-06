import Link from "next/link";
import BaseLayout from "../../components/BaseLayout";
import EditButton from "../../components/editButton";
import registros from "../../utils/mock.json";
import { api } from "~/utils/api";

function RegistrosPage() {
  const { data, isLoading } = api.ocorrencias.getOcorrencias.useQuery();

  if (isLoading) {
    return (
      <BaseLayout>
        <h1>Carregando...</h1>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <Link href={"/"} className="w-full">
        <div className="border-opacity-94 flex w-full flex-col   items-center justify-center gap-4 rounded-lg border bg-white bg-opacity-75 p-4 text-2xl text-white shadow-md backdrop-blur-sm backdrop-filter ">
          <h2 className="font-bold text-black "> Adicionar novo registro + </h2>
        </div>
      </Link>
      <hr className="my-2 h-px w-full rounded-md border-2 border-black "></hr>

      {data?.map((registro: any, idx: number) => {
        const date = new Date(registro.dataEnchente).toLocaleDateString(
          "pt-BR"
        );

        return (
          <Link
            className="w-full"
            key={idx}
            href={`/registros/${registro.identifier}`}
          >
            <div className="border-opacity-94 flex  w-full flex-col items-start gap-4 rounded-lg border bg-white bg-opacity-75 p-4 text-2xl text-white shadow-md backdrop-blur-sm backdrop-filter ">
              <div className="flex w-full items-center justify-between text-2xl text-black">
                <h2 className="font-bold">{registro.local}</h2>

                <div className="flex items-center gap-4">
                  <h2>{date}</h2>

                  <EditButton />
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </BaseLayout>
  );
}

export default RegistrosPage;
