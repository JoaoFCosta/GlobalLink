import React from "react";
import { Link } from "react-router";
import Header from "../components/Header";

const IncentivoFiscal = () => {
  return (
    <>
      <div className="d-flex justify-content-between">
        <Link to="/DashboardEmpresa" className="m-3 text-decoration-none">
          <i className="bi bi-arrow-left-short"></i> Voltar
        </Link>
        <Header />
      </div>

      <div className="m-5 border border-2 border-primary bg-white">
        <div className="d-flex flex-column justify-content-center align-content-center text-center">
          <i className="bi bi-suit-heart fs-1 mt-3"></i>

          <h3 className="fw-bold mt-2">
            Transforme seu imposto em solidariedade
          </h3>

          <h5 className="mt-4">
            Sua empresa pode destinar parte do Imposto de Renda para projetos
            sociais <br /> aprovados, sem custo adicional. Doe medicamentos,
            alimentos, kits de higiene <br /> e muito mais.
          </h5>

          <div className="mt-5">
            <span className="btn btn-danger me-3">PRONAS/PCD</span>
            <span className="btn btn-success">Fundo do idoso</span>
            <span className="btn btn-primary ms-3">Fundo da criança</span>
          </div>

          <div className="my-5">
            <button className="btn btn-info me-3">
              Quero falar com um especialista
            </button>
            <button className="btn btn-info">
              Saiba como doar com incentivo fiscal
            </button>
          </div>
        </div>
      </div>

      <div className="text-center m-5">
        <h3>3 Leis Principais para Doação Empresarial</h3>

        <div className="col-12 row gap-4 d-flex justify-content-center mt-5">
          <div className="col-3 bg-white rounded-3 border border-danger p-2">
            <i className="bi bi-suit-heart fs-2 text-danger"></i>
            <p className="fw-medium">PRONAS/PCD (Saúde)</p>
            <p className="fw-bolder fs-3 text-danger">1%</p>
            <small>Até 1% do IR devido</small>
            <p>Ideal para doação de medicamentos e insumos de saúde</p>
            <span className="fw-bolder">Ideal para a doação de:</span> <br />
            <small>
              {" "}
              Medicamentos / Equipamentos / médicos Insumos hospitalares /
              Material de primeiros socorros
            </small>
          </div>

          <div className="col-3 bg-white rounded-3 border border-danger p-4">
            <i className="bi bi-people fs-2 text-success"></i>
            <p className="fw-medium">PRONAS/PCD (Saúde)</p>
            <p className="fw-bolder fs-3 text-success">1%</p>
            <small>Até 1% do IR devido</small>
            <p>
              Ideal para doação de alimentos e kits de higiene para abrigos de
              idosos
            </p>
            <span className="fw-bolder">Ideal para a doação de:</span> <br />
            <small>
              {" "}
              Alimentos não perecíveis / Kits de higiene / Fraldas geriátricas /
              Suplementos alimentares /
            </small>
          </div>

          <div className="col-3 bg-white rounded-3 border border-danger p-4">
            <i className="bi bi-building fs-2 text-primary"></i>
            <p className="fw-medium">PRONAS/PCD (Saúde)</p>
            <p className="fw-bolder fs-3 text-primary">1%</p>
            <small>Até 1% do IR devido</small>
            <p>Ideal para doação de alimentos, roupas e material escolar</p>
            <span className="fw-bolder">Ideal para a doação de:</span> <br />
            <small>
              {" "}
              Alimentos infantis / Material escolar / Roupas e calçados /
              Brinquedos educativos
            </small>
          </div>
        </div>
      </div>

      <div className="m-5 border border-primary">
        <div className="bg-warning-subtle p-4">
          <i className="bi bi-exclamation-circle fs-3 text-danger"></i>
          <p className="text-danger fw-bolder">Observação Importante</p>
          <small className="text-danger">
            O GlobalLink auxilia sua empresa na identificação do fundo mais
            adequado para sua doação e fornece toda a documentação necessária
            (recibos e prestação de contas) para a dedução fiscal.
          </small>
        </div>
      </div>

      <div className="m-5 border border-1 bg-white p-4 rounded-3    ">
        <h3 className="text-center">Processo Simplificado</h3>
        <p className="text-center">Nós facilitamos todo o processo para você</p>
        <p className="mb-4">
          <strong className="bg-primary text-light py-2 px-3 rounded-circle me-3">
            1
          </strong>{" "}
          Realize sua doação (dinheiro ou produtos) através da plataforma
          GlobalLink
        </p>

        <p className="mb-4">
          <strong className="bg-primary text-light py-2 px-3 rounded-circle me-3">
            2
          </strong>{" "}
          Nossa equipe fornece toda documentação necessária (recibo e relatório)
        </p>

        <p className="mb-4">
          <strong className="bg-primary text-light py-2 px-3 rounded-circle me-3">
            3
          </strong>{" "}
          Seu contador solicita o abatimento junto à Receita Federal
        </p>

        <p className="mb-4">
          <strong className="bg-primary text-light py-2 px-3 rounded-circle me-3">
            4
          </strong>{" "}
          Redução automática no seu imposto a pagar na declaração
        </p>

        <p className="mb-4">
          <strong className="bg-primary text-light py-2 px-3 rounded-circle me-3">
            5
          </strong>{" "}
          Você apoia a comunidade local sem custo adicional
        </p>
      </div>
    </>
  );
};

export default IncentivoFiscal;
