import React, { Component } from "react";
import PessoaDataService from "../services/pessoaDataService";

import { Link, useNavigate } from "react-router-dom";
const AddPessoaWrapper = () => {
  const navigate = useNavigate();
  return <AddPessoa navigate={navigate} />;
};


 class AddPessoa extends Component {
  constructor(props) {
    super(props);

    this.onChangeNome = this.onChangeNome.bind(this);
    this.onChangeCpf = this.onChangeCpf.bind(this);
    this.onChangeTelefone = this.onChangeTelefone.bind(this);
    this.onChangeEndereco = this.onChangeEndereco.bind(this);
    this.onChangeCidade = this.onChangeCidade.bind(this);
    this.onChangeEstado = this.onChangeEstado.bind(this);
    this.savePessoa = this.savePessoa.bind(this);
    this.newPessoa = this.newPessoa.bind(this);    

    this.state = {
      id: null,
      nome: "",
      cpf: "",
      telefone: "",
      endereco: "",
      cidade: "",
      estado: "",
      enviado: false
    };
  }

  onChangeNome(e) {
    this.setState({
      nome: e.target.value
    });
  }

  onChangeCpf(e) {
    this.setState({
      cpf: e.target.value
    });
  }

  onChangeTelefone(e) {
    this.setState({
      telefone: e.target.value
    });
  }

  onChangeEndereco(e) {
    this.setState({
      endereco: e.target.value
    });
  }

  onChangeCidade(e) {
    this.setState({
      cidade: e.target.value
    });
  }

  onChangeEstado(e) {
    this.setState({
      estado: e.target.value
    });
  }

  savePessoa() {
    var data = {
      nome: this.state.nome,
      cpf: this.state.cpf,
      telefone: this.state.telefone,
      endereco: this.state.endereco,
      cidade: this.state.cidade,
      estado: this.state.estado
    };

    PessoaDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          nome: response.data.nome,
          cpf: response.data.cpf,
          telefone: response.data.telefone,
          endereco: response.data.endereco,
          cidade: response.data.cidade,
          estado: response.data.estado,
          enviado: true
        });
        console.log(response.data);
        this.props.navigate('/'); // Redireciona para a tela inicial após o cadastro
      })
      .catch(e => {
        console.log(e);
      });
  }

  newPessoa() {
    this.setState({
      id: null,
      nome: "",
      cpf: "",
      telefone: "",
      endereco: "",
      cidade: "",
      estado: "",
      enviado: false
    });
  }

  render() {
    return (
      <div className="add-pessoa-container">
       <div className="submit-form">
        <div>
        <div className="pad-title"><h4>Cadastrar Nova Pessoa</h4></div>
          <form>
            <div className="row mb-3">
              <label htmlFor="nome" className="col-sm-2 col-form-label fs-5">Nome:</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="nome"
                  required
                  value={this.state.nome}
                  onChange={this.onChangeNome}
                  name="nome"
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="cpf" className="col-sm-2 col-form-label fs-5">CPF:</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="cpf"
                  required
                  value={this.state.cpf}
                  onChange={this.onChangeCpf}
                  name="cpf"
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="telefone" className="col-sm-2 col-form-label fs-5">Telefone:</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="telefone"
                  required
                  value={this.state.telefone}
                  onChange={this.onChangeTelefone}
                  name="telefone"
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="endereco" className="col-sm-2 col-form-label fs-5">Endereço:</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="endereco"
                  required
                  value={this.state.endereco}
                  onChange={this.onChangeEndereco}
                  name="endereco"
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="cidade" className="col-sm-2 col-form-label fs-5">Cidade:</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="cidade"
                  required
                  value={this.state.cidade}
                  onChange={this.onChangeCidade}
                  name="cidade"
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="estado" className="col-sm-2 col-form-label fs-5">Estado:</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="estado"
                  required
                  value={this.state.estado}
                  onChange={this.onChangeEstado}
                  name="estado"
                />
              </div>
            </div>

            <button onClick={this.savePessoa} className="btn btn-lg btn-success">
              Cadastrar
            </button>
            <Link to="/" className="btn btn-lg btn-danger">
              Voltar
            </Link>
          </form>
        </div>
      </div>
      </div>
    );
  }
}
export default AddPessoaWrapper;