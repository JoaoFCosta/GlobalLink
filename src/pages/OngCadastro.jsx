import React, { useState } from "react";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router";

const OngCadastro = () => {
  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cep, setCep] = useState("");
  const navigate = useNavigate();

  const handleCreateAcc = async (e) => {
    e.preventDefault();

    // Validação simples
    if (
      !nome ||
      !cnpj ||
      !email ||
      !password ||
      !rua ||
      !numero ||
      !bairro ||
      !cep ||
      !tel
    ) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    try {
      const response = await fetch(
        "http://www.globallinkapi.somee.com/api/Auth/OngRegister",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Nome: nome,
            Cnpj: cnpj,
            Email: email,
            Senha: password,
            Rua: rua,
            Numero: numero,
            Bairro: bairro,
            Cep: cep,
            Telefone: tel,
          }),
        }
      );

      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        navigate("/OngLogin"); // Redireciona para a página de login
      } else {
        const errorData = await response.json();
        alert(
          errorData ||
            "Erro ao cadastrar. Verifique os dados e tente novamente."
        );
      }
    } catch (error) {
      console.error("Erro ao realizar o cadastro:", error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <Link to="/" className="m-3 text-decoration-none">
          <i className="bi bi-arrow-left-short"></i> Voltar
        </Link>
        <Header />
      </div>

      <div className="container-fluid">
        <div className="row justify-content-center text-center g-0">
          <div className="col-11 col-md-10 col-lg-8">
            <div className="border rounded-4 bg-white p-3 p-md-4 d-flex text-center justify-content-center flex-column h-100 shadow-sm">
              <h1 className="fw-normal text-primary">Cadastro de ONG</h1>
              <span className="mb-3">
                Registre sua organização para receber doações e monitorar
                estoques
              </span>

              <form className="container-fluid" onSubmit={handleCreateAcc}>
                <div className="row justify-content-center text-center g-0">
                  <div className="row align-items-center justify-content-center text-start mt-3 g-2">
                    <span className="fw-medium fs-5 mb-3">
                      Dados Básicos da ONG
                    </span>

                    <div className="col-12 col-md-6">
                      <label className="fw-medium" htmlFor="frmNome">
                        Nome da ONG *
                      </label>
                      <input
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        type="text"
                        name="frmNome"
                        id="frmNome"
                        className="form-control w-100 rounded-3 border-0 bg-secondary-subtle p-2"
                        placeholder="Ex: Instituto Ajudar"
                        required
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="fw-medium" htmlFor="frmCNPJ">
                        CNPJ *
                      </label>
                      <input
                        value={cnpj}
                        onChange={(e) => setCnpj(e.target.value)}
                        type="text"
                        name="frmCNPJ"
                        id="frmCNPJ"
                        className="w-100 rounded-3 border-0 bg-secondary-subtle p-2"
                        placeholder="00.000.000/0000-00"
                        required
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="fw-medium" htmlFor="frmEmail">
                        E-mail *
                      </label>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        name="frmEmail"
                        id="frmEmail"
                        className="form-control w-100 rounded-3 border-0 bg-secondary-subtle p-2"
                        placeholder="Ex: contato@ajudar.com"
                        required
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="fw-medium" htmlFor="frmTel">
                        Telefone *
                      </label>
                      <input
                        value={tel}
                        onChange={(e) => setTel(e.target.value)}
                        type="tel"
                        name="frmTel"
                        id="frmTel"
                        className="w-100 rounded-3 border-0 bg-secondary-subtle p-2"
                        placeholder="(11) 99999-9999"
                        required
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="fw-medium" htmlFor="frmPassword">
                        Senha *
                      </label>
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        name="frmPassword"
                        id="frmPassword"
                        className="w-100 rounded-3 border-0 bg-secondary-subtle p-2"
                        required
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="fw-medium" htmlFor="frmPasswordConfirm">
                        Confirmar Senha *
                      </label>
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        name="frmPasswordConfirm"
                        id="frmPasswordConfirm"
                        className="w-100 rounded-3 border-0 bg-secondary-subtle p-2"
                        required
                      />
                    </div>

                    <span className="fw-medium fs-5 mt-4 mb-3">Endereço</span>

                    <div className="col-12 col-md-9">
                      <label className="fw-medium" htmlFor="frmRua">
                        Rua *
                      </label>
                      <input
                        value={rua}
                        onChange={(e) => setRua(e.target.value)}
                        type="text"
                        name="frmRua"
                        id="frmRua"
                        className="w-100 rounded-3 border-0 bg-secondary-subtle p-2"
                        placeholder="Ex: Rua do Comércio"
                        required
                      />
                    </div>

                    <div className="col-12 col-md-3">
                      <label className="fw-medium" htmlFor="frmNumero">
                        Número *
                      </label>
                      <input
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)}
                        type="text"
                        name="frmNumero"
                        id="frmNumero"
                        className="w-100 rounded-3 border-0 bg-secondary-subtle p-2"
                        placeholder="000"
                        required
                      />
                    </div>

                    <div className="col-12 col-md-4">
                      <label className="fw-medium">Complemento</label>
                      <input
                        type="text"
                        className="w-100 rounded-3 border-0 bg-secondary-subtle p-2"
                        placeholder="Sala 101"
                      />
                    </div>

                    <div className="col-12 col-md-4">
                      <label className="fw-medium" htmlFor="frmBairro">
                        Bairro *
                      </label>
                      <input
                        value={bairro}
                        onChange={(e) => setBairro(e.target.value)}
                        type="text"
                        name="frmBairro"
                        id="frmBairro"
                        className="w-100 rounded-3 border-0 bg-secondary-subtle p-2"
                        placeholder="Vila Nova"
                        required
                      />
                    </div>

                    <div className="col-12 col-md-4">
                      <label className="fw-medium" htmlFor="frmCep">
                        CEP *
                      </label>
                      <input
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
                        type="text"
                        name="frmCep"
                        id="frmCep"
                        className="w-100 rounded-3 border-0 bg-secondary-subtle p-2"
                        placeholder="12345-678"
                        required
                      />
                    </div>

                    <div className="col-12 text-center mt-4">
                      <button
                        type="submit"
                        className="btn w-100 btn-primary px-5 py-2 rounded-3 fw-medium"
                      >
                        Cadastrar ONG
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OngCadastro;
