import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Estabelecimento from "./pages/Estabelecimento";
import Confirmacao from "./pages/Confirmacao";
import Agendamentos from "./pages/Agendamentos";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/estabelecimento/:id" element={<Estabelecimento />} />
        <Route path="/estabelecimento/:id/agendamentos" element={<Agendamentos />} />
        <Route path="/confirmacao" element={<Confirmacao />} />
      </Routes>
    </BrowserRouter>
  );
}
