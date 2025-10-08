import React from "react";

const NeedCard = ({ need }) => {
  return (
    <div className="col-12 col-md-6 col-lg-4 mb-2">
      <div className="border p-3 rounded h-100">
        <h6 className="fw-bold mb-1">{need.necessidadeTitulo}</h6>
        <p className="mb-1">{need.necessidadeDescricao}</p>
        <p className="mb-1">
          <strong>Urgência:</strong> {need.urgencia}
        </p>
        <p className="mb-1">
          <strong>Categoria:</strong> {need.categoria}
        </p>
        <p className="mb-1">
          <strong>Local:</strong> {need.local}
        </p>
      </div>
    </div>
  );
};

export default NeedCard;
