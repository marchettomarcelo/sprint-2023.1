import { type NextPage } from "next";
import { api } from "../utils/api";

import CreateOcorrenciaForm from "../components/CreateOcorrenciaForm";
import BaseLayout from "../components/BaseLayout";
import Link from "next/link";
import LogoDeOlho from "../../public/do2.png";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { status } = useSession();

  if (status === "unauthenticated") {
    return (
      <BaseLayout>
        <h1 className="text-3xl font-extrabold">
          Você precisa estar autenticado para acessar essa página
        </h1>
        <button onClick={() => signIn()}>Login</button>
      </BaseLayout>
    );
  }

  if (status === "loading") {
    return (
      <BaseLayout>
        <h1 className="text-3xl font-extrabold">Carregando...</h1>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <div className="flex w-full items-end justify-between ">
        <div className="flex flex-row gap-4">
          <p className="text-2xl font-semibold ">Seu perfil:</p>
        </div>
        <Image src={LogoDeOlho} alt="Logo" width={120} height={120} />

        <Link href={"/registros"}>
          <p className="font-extrabold text-blue-700 underline">
            Ver Registros:
          </p>
        </Link>
      </div>
      <CreateOcorrenciaForm />
      <div className="flex w-full justify-between gap-4">
        <button
          className="w-1/2 rounded-lg  bg-white border-red-600 hover:bg-red-200 border-4 px-4 py-2 font-bold underline"
          onClick={() => signOut()}
        >
          Log out
        </button>
        <Link
          href={"/registros"}
          className="w-1/2 flex items-center justify-center rounded-lg border-orange-600 border-4 bg-white px-4 py-2 font-bold underline"
        >
          <button className="">Página de registros</button>
        </Link>
      </div>
    </BaseLayout>
  );
};

export default Home;
