import React from "react";
import NeedCard from "./NeedCard";

const OngCard = ({ ong }) => {
  return (
    <div className="bg-white border p-3 rounded-3 mb-3 shadow-sm">
      <h5 className="fw-bold mb-1">{ong.ongNome}</h5>
      <p className="mb-1">
        {ong.ongBairro}, {ong.ongRua}, {ong.ongNumero}
      </p>
      <p className="mb-1">
        <strong>Caixa Postal:</strong> {ong.ongCep}
      </p>
      <p className="mb-1">
        <strong>Contato:</strong> {ong.ongTelefone}
      </p>

      <p className="fw-bold mt-3">Necessidades ({ong.necessidades.length})</p>
      {ong.necessidades.length === 0 ? (
        <p>Nenhuma necessidade cadastrada.</p>
      ) : (
        <div className="row">
          {ong.necessidades.map((need) => (
            <NeedCard key={need.necessidadeId} need={need} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OngCard;
