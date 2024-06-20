import React, { Component } from "react";
import { Link } from "react-router-dom";
import PessoaDataService from "../services/pessoaDataService";

export default class ListPessoa extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchNome = this.onChangeSearchNome.bind(this);
    this.retrievePessoas = this.retrievePessoas.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setPessoaSel = this.setPessoaSel.bind(this);
    this.removeAll = this.removeAll.bind(this);
    this.searchNome = this.searchNome.bind(this);

    this.state = {
      pessoas: [],
      pessoaSel: null,
      indice: -1,
      nome: ""
    };
  }

  componentDidMount() {
    this.retrievePessoas();
  }

  onChangeSearchNome(e) {
    const searchNome = e.target.value;
    this.setState({
      nome: searchNome
    });
  }

  retrievePessoas() {
    PessoaDataService.getAll()
      .then(response => {
        this.setState({
          pessoas: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrievePessoas();
    this.setState({
      pessoaSel: null,
      indice: -1
    });
  }

  setPessoaSel(pessoa, index) {
    this.setState({
      pessoaSel: pessoa,
      indice: index
    });
  }

  removeAll() {
    PessoaDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchNome() {
    this.setState({
      pessoaSel: null,
      indice: -1
    });

    PessoaDataService.findByNome(this.state.nome)
      .then(response => {
        this.setState({
          pessoas: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { nome, pessoas, pessoaSel, indice } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por nome"
              value={nome}
              onChange={this.onChangeSearchNome}
            />
            <div className="input-group-append">
              <button
                className="btn btn-lg btn-custom-primary btn-outline-secondary"
                type="button"
                onClick={this.searchNome}
              >
                Buscar
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4 d-flex justify-content-end btn-pad align-items-center">
          <Link to="/" className="btn btn-lg btn-danger">
            Voltar
          </Link>
        </div>
        <div className="col-md-6">
          <h2>Pessoas</h2>

          <ul className="list-group">
            {pessoas &&
              pessoas.map((pessoa, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === indice ? "active" : "")
                  }
                  onClick={() => this.setPessoaSel(pessoa, index)}
                  key={index}
                >
                  {pessoa.nome}
                </li>
              ))}
          </ul>

          <button
            className="m-1 btn btn-lg btn-danger"
            onClick={this.removeAll}
          >
            Excluir todas
          </button>
          
        </div>
        <div className="col-md-6">
          {pessoaSel ? (
            <div>
              <h4>&nbsp;</h4>
              <div>
                <label>
                  <strong>Nome:</strong>
                </label>{" "}
                {pessoaSel.nome}
              </div>
              <div>
                <label>
                  <strong>CPF:</strong>
                </label>{" "}
                {pessoaSel.cpf}
              </div>
              <div>
                <label>
                  <strong>Telefone:</strong>
                </label>{" "}
                {pessoaSel.telefone}
              </div>
              <div>
                <label>
                  <strong>Endereço:</strong>
                </label>{" "}
                {pessoaSel.endereco}
              </div>
              <div>
                <label>
                  <strong>Cidade:</strong>
                </label>{" "}
                {pessoaSel.cidade}
              </div>
              <div>
                <label>
                  <strong>Estado:</strong>
                </label>{" "}
                {pessoaSel.estado}
              </div>

              <Link
                to={"/list/" + pessoaSel.id}
                className="btn btn-sm btn-warning"
                role="button"
              >
                Editar
              </Link>
            </div>
          ) : (
            <div>
              <h4>&nbsp;</h4>
              <p><i>Para detalhes, selecione uma pessoa.</i></p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
