import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import OngLogin from "./pages/OngLogin";
import EmpresaLogin from "./pages/EmpresaLogin";
import EmpresaCadastro from "./pages/EmpresaCadastro";

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
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
