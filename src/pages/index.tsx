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
      <button onClick={()=> signOut()}>Sair</button>
    </BaseLayout>
  );
};

export default Home;
