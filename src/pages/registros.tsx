import BaseLayout from "../components/BaseLayout";
import EditButton from "../components/editButton";
import registros from "../utils/mock.json";

function RegistrosPage() {
  return (
    <BaseLayout>
      {registros.map((registro) => {
        const date = new Date(registro.data).toLocaleDateString("pt-BR");
        return (
          <div className="border-opacity-94 flex  w-full flex-col items-start gap-4 rounded-lg border bg-white bg-opacity-75 p-4 text-2xl text-white shadow-md backdrop-blur-sm backdrop-filter ">
            <div className="flex w-full items-center justify-between text-2xl text-black">
              <h2 className="font-bold">{registro.local}</h2>

              <div className="flex items-center gap-4">
                <h2>{date}</h2> às
                <h2 className="mr-2">{registro.horario}</h2>
                <EditButton />
              </div>
            </div>
          </div>
        );
      })}
    </BaseLayout>
  );
}

export default RegistrosPage;
