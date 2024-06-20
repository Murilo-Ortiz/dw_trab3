import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="text-center homepage">
      <h1>Bem-vindo à Biblioteca</h1>
      <div className="mt-4">
        <Link to="/add" className="btn btn-custom btn-custom-primary btn-lg btn-primary m-2">
          Cadastrar Nova Pessoa
        </Link>
        <Link to="/list" className="btn btn-custom btn-lg btn-custom-secondary btn-primary m-2">
          Listar Todas as Pessoas
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
