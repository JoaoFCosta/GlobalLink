import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import OngLogin from "./pages/OngLogin";

function App() {
  return (
    <>
      <BrowserRouter>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/OngLogin" element={<OngLogin />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
