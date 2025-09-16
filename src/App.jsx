import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import OngLogin from "./pages/OngLogin";
import EmpresaLogin from "./pages/EmpresaLogin";
import EmpresaCadastro from "./pages/EmpresaCadastro";
import OngCadastro from "./pages/OngCadastro";
import DashboardEmpresa from "./pages/DashboardEmpresa";

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
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
