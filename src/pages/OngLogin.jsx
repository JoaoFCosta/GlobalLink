import React from "react";
import LogedHeader from "../components/LogedHeader";

const OngLogin = () => {
  return (
    <>
      <LogedHeader />
      <div className="container">
        <div className="justify-content-center">
          <div className="col-12 col-md-6 col-lg-5">
            <div className="border rounded-4 bg-white p-4 d-flex text-center justify-content-center flex-column h-100 shadow-sm">
              <i className="bi bi-suit-heart fs-3 text-primary mb-2"></i>
              <span className="fs-2 text-primary">Sou uma ONG</span>
              <span>Organização Não Governamental</span>
              <span className="text-secondary mt-3">
                Monitore doações e estoques em tempo real,
                <br className="d-none d-md-block" /> gerencie necessidades da
                sua comunidade.
              </span>
              <ul className="mt-4 text-secondary text-start mx-auto">
                <li>Monitoramento IoT em tempo real</li>
                <li>Calculadora de necessidades</li>
                <li>Gestão de doadores</li>
                <li>Relatórios de impacto</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OngLogin;
