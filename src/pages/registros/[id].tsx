import Link from "next/link";
import { useRouter } from "next/router";
import BaseLayout from "~/components/BaseLayout";
import LoadingPage from "~/components/LoadingPage";
import { api } from "~/utils/api";

function PaginaRegistro() {
  const { query } = useRouter();

  const { data, isLoading } = api.ocorrencias.getOcorrencias.useQuery(
    { id: "jasdadsc" },
    { enabled: !!query.id }
  );


  console.log(query);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!data) {
    return <div>Erro ao carregar</div>;
  }

  console.log(data);

  const date = new Date(data.data).toLocaleDateString("pt-BR");
  return (
    <BaseLayout>
      <h1 className="text-6xl font-extrabold">{data.local}</h1>
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-3 text-3xl font-bold">
          <h2>{date}</h2> às <h2>{data.horario}</h2>
        </div>

        <h3 className="font-bold">Registrado por: {data.nomeUsuario}</h3>

        <div>
          <h3 className="font-bold"> Descrição do usuário:</h3>
          <h2> {data.descricao}</h2>
        </div>
        <div className="flex gap-3 ">
          <h2 className="font-bold italic">
            {data.mmChovido}mm chovidos na data
          </h2>
        </div>
      </div>

      <iframe
        width="800"
        height="450"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>

      <Link href={"/registros"}>
        <button className="rounded-lg border bg-white px-4 py-2 font-bold underline">
          Página de registros
        </button>
      </Link>
    </BaseLayout>
  );
}

export default PaginaRegistro;
