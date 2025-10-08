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

      {/* Hero Section - Responsivo */}
      <div className="mx-3 mx-md-5 border border-2 border-primary bg-white">
        <div className="d-flex flex-column justify-content-center align-content-center text-center p-3 p-md-4">
          <i className="bi bi-suit-heart fs-1 mt-3"></i>

          <h3 className="fw-bold mt-2 px-2">
            Transforme seu imposto em solidariedade
          </h3>

          <h5 className="mt-4 px-2 d-none d-md-block">
            Sua empresa pode destinar parte do Imposto de Renda para projetos
            sociais aprovados, sem custo adicional. Doe medicamentos, alimentos,
            kits de higiene e muito mais.
          </h5>

          {/* Versão mobile simplificada */}
          <p className="mt-4 px-2 d-md-none">
            Sua empresa pode destinar parte do Imposto de Renda para projetos
            sociais aprovados, sem custo adicional.
          </p>

          {/* Botões responsivos */}
          <div className="mt-4 d-flex flex-column flex-md-row justify-content-center gap-2">
            <span className="btn btn-danger">PRONAS/PCD</span>
            <span className="btn btn-success">Fundo do idoso</span>
            <span className="btn btn-primary">Fundo da criança</span>
          </div>

          {/* Botões de ação responsivos */}
          <div className="my-4 d-flex flex-column flex-md-row justify-content-center gap-2">
            <button className="btn btn-info">
              <span className="d-none d-md-inline">
                Quero falar com um especialista
              </span>
              <span className="d-md-none">Falar com especialista</span>
            </button>
          </div>
        </div>
      </div>

      {/* Seção das 3 Leis - Responsiva */}
      <div className="text-center mx-3 mx-md-5 my-4 my-md-5">
        <h3 className="mb-4">Leis para Doação Empresarial</h3>

        <div className="row g-3 g-md-4 justify-content-center">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="bg-white rounded-3 border border-danger p-3 h-100">
              <i className="bi bi-suit-heart fs-2 text-danger"></i>
              <p className="fw-medium mb-2">PRONAS/PCD (Saúde)</p>
              <p className="fw-bolder fs-3 text-danger mb-2">1%</p>
              <p className="mb-3">
                O doador pode destinar até 1% do seu IR para projetos do
                Programa Nacional de Apoio à Atenção Oncológica (Pronon) e mais
                1% para projetos do Programa Nacional de Apoio à Atenção da
                Saúde da Pessoa com Deficiência (Pronas/PcD) aprovados pelo
                Ministério da Saúde.
              </p>
              <span className="fw-bolder d-block mb-2">
                Ideal para a doação de:
              </span>
              <small>
                Medicamentos / Equipamentos médicos / Insumos hospitalares /
                Material de primeiros socorros
              </small>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <div className="bg-white rounded-3 border border-primary p-3 h-100">
              <i className="bi bi-building fs-2 text-primary"></i>
              <p className="fw-medium mb-2">
                Fundo da Criança, do Adolescente ou do Idoso
              </p>
              <p className="fw-bolder fs-3 text-primary mb-2">6%</p>
              <p className="mb-3">
                O doador pode destinar até 6% do IR para os fundos nacional,
                distrital, estadual e municipal da criança e adolescente ou do
                idoso, que apoiam projetos para o público prioritário da
                infância e adolescência ou idoso.
              </p>
              <span className="fw-bolder d-block mb-2">
                Ideal para a doação de:
              </span>
              <small>
                Alimentos infantis / Material escolar / Roupas e calçados /
                Brinquedos educativos
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* Observação Important - Responsiva */}
      <div className="mx-3 mx-md-5 border border-primary rounded-3">
        <div className="bg-warning-subtle p-3 p-md-4 rounded-3">
          <div className="d-flex flex-column flex-sm-row align-items-start">
            <i className="bi bi-exclamation-circle fs-3 text-danger me-0 me-sm-3 mb-2 mb-sm-0"></i>
            <div>
              <p className="text-danger fw-bolder mb-2">
                Observação Importante
              </p>
              <small className="text-danger">
                O GlobalLink auxilia sua empresa na identificação do fundo mais
                adequado para sua doação e fornece toda a documentação
                necessária (recibos e prestação de contas) para a dedução
                fiscal.
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* Processo Simplificado - Responsivo */}
      <div className="mx-3 mx-md-5 my-4 my-md-5 border border-1 bg-white p-3 p-md-4 rounded-3">
        <h3 className="text-center mb-3">Processo Simplificado</h3>
        <p className="text-center mb-4">
          Nós facilitamos todo o processo para você
        </p>

        <div className="row g-3">
          <div className="col-12">
            <div className="d-flex flex-column flex-sm-row align-items-start">
              <strong className="bg-primary text-light py-2 px-3 rounded-circle me-0 me-sm-3 mb-2 mb-sm-0 flex-shrink-0">
                1
              </strong>
              <p className="mb-0">
                Realize sua doação (dinheiro ou produtos) através da plataforma
                GlobalLink
              </p>
            </div>
          </div>

          <div className="col-12">
            <div className="d-flex flex-column flex-sm-row align-items-start">
              <strong className="bg-primary text-light py-2 px-3 rounded-circle me-0 me-sm-3 mb-2 mb-sm-0 flex-shrink-0">
                2
              </strong>
              <p className="mb-0">
                Nossa equipe fornece toda documentação necessária (recibo e
                relatório)
              </p>
            </div>
          </div>

          <div className="col-12">
            <div className="d-flex flex-column flex-sm-row align-items-start">
              <strong className="bg-primary text-light py-2 px-3 rounded-circle me-0 me-sm-3 mb-2 mb-sm-0 flex-shrink-0">
                3
              </strong>
              <p className="mb-0">
                Seu contador solicita o abatimento junto à Receita Federal
              </p>
            </div>
          </div>

          <div className="col-12">
            <div className="d-flex flex-column flex-sm-row align-items-start">
              <strong className="bg-primary text-light py-2 px-3 rounded-circle me-0 me-sm-3 mb-2 mb-sm-0 flex-shrink-0">
                4
              </strong>
              <p className="mb-0">
                Redução automática no seu imposto a pagar na declaração
              </p>
            </div>
          </div>

          <div className="col-12">
            <div className="d-flex flex-column flex-sm-row align-items-start">
              <strong className="bg-primary text-light py-2 px-3 rounded-circle me-0 me-sm-3 mb-2 mb-sm-0 flex-shrink-0">
                5
              </strong>
              <p className="mb-0">
                Você apoia a comunidade local sem custo adicional
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IncentivoFiscal;
