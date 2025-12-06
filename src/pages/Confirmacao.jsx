import { useSearchParams, Link } from "react-router-dom";
import { estabelecimentos } from "../data/estabelecimentos";

export default function Confirmacao() {
  const [params] = useSearchParams();
  const est = estabelecimentos.find((e) => e.id == params.get("est"));
  const data = params.get("data");
  const hora = params.get("hora");

  return (
    <div className="p-6 max-w-xl mx-auto text-center self-center">
      <h1 className="text-2xl font-bold mb-4">Agendamento Confirmado!</h1>

      <p className="mb-3 text-lg">{est.nome}</p>
      <p>{est.endereco}</p>
      <p className="mt-2 font-medium text-green-700">
        Dia {data} às {hora}
      </p>

      <Link to="/" className="mt-6 block bg-blue-600 text-white p-3 rounded">
        Voltar à Home
      </Link>
    </div>
  );
}
