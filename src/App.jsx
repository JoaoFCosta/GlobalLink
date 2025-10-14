import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import OngLogin from "./pages/OngLogin";
import EmpresaLogin from "./pages/EmpresaLogin";
import EmpresaCadastro from "./pages/EmpresaCadastro";
import OngCadastro from "./pages/OngCadastro";
import DashboardEmpresa from "./pages/DashboardEmpresa";
import IncentivoFiscal from "./pages/IncentivoFiscal";
import DashboardOng from "./pages/DashboardOng";
import Doacoes from "./pages/Doacoes";
import Needs from "./pages/Needs";

function App() {
  return (
    <>
      <BrowserRouter>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/OngLogin" element={<OngLogin />} />
            <Route path="/EmpresaLogin" element={<EmpresaLogin />} />
            <Route path="/EmpresaCadastro" element={<EmpresaCadastro />} />
            <Route path="/OngCadastro" element={<OngCadastro />} />
            <Route path="/DashboardEmpresa" element={<DashboardEmpresa />} />
            <Route path="/IncentivoFiscal" element={<IncentivoFiscal />} />
            <Route path="/DashboardOng" element={<DashboardOng />} />
            <Route path="/Doacoes" element={<Doacoes />} />
            <Route path="/Necessidades" element={<Needs />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
