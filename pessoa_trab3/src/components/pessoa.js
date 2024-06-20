import React, { Component } from "react";
import PessoaDataService from "../services/pessoaDataService";
import { useParams } from 'react-router-dom';

import { useNavigate } from "react-router-dom";

// Componente funcional que envolve o componente de classe para utilizar useNavigate
const PessoaWrapper = () => {
  const navigate = useNavigate();
  return <Pessoa navigate={navigate} />;
};

// Para obter parâmetros passados via Router v6
function withRouter(Children){
  return(props)=>{
    const match  = {params: useParams()};
    return <Children {...props}  match = {match}/>
  }
}

class Pessoa extends Component {
  constructor(props) {
    super(props);
    this.onChangeNome = this.onChangeNome.bind(this);
    this.onChangeCpf = this.onChangeCpf.bind(this);
    this.onChangeTelefone = this.onChangeTelefone.bind(this);
    this.onChangeEndereco = this.onChangeEndereco.bind(this);
    this.onChangeCidade = this.onChangeCidade.bind(this);
    this.onChangeEstado = this.onChangeEstado.bind(this);
    this.getPessoa = this.getPessoa.bind(this);
    this.updatePessoa = this.updatePessoa.bind(this);
    this.deletePessoa = this.deletePessoa.bind(this);

    this.state = {
      pessoaAtual: {
        id: null,
        nome: "",
        cpf: "",
        telefone: "",
        endereco: "",
        cidade: "",
        estado: ""
      },
      mensagem: ""
    };
  }

  componentDidMount() {
    this.getPessoa(this.props.match.params.id);
  }

  onChangeNome(e) {
    const nome = e.target.value;
    this.setState(prevState => ({
      pessoaAtual: {
        ...prevState.pessoaAtual,
        nome: nome
      }
    }));
  }

  onChangeCpf(e) {
    const cpf = e.target.value;
    this.setState(prevState => ({
      pessoaAtual: {
        ...prevState.pessoaAtual,
        cpf: cpf
      }
    }));
  }

  onChangeTelefone(e) {
    const telefone = e.target.value;
    this.setState(prevState => ({
      pessoaAtual: {
        ...prevState.pessoaAtual,
        telefone: telefone
      }
    }));
  }

  onChangeEndereco(e) {
    const endereco = e.target.value;
    this.setState(prevState => ({
      pessoaAtual: {
        ...prevState.pessoaAtual,
        endereco: endereco
      }
    }));
  }

  onChangeCidade(e) {
    const cidade = e.target.value;
    this.setState(prevState => ({
      pessoaAtual: {
        ...prevState.pessoaAtual,
        cidade: cidade
      }
    }));
  }

  onChangeEstado(e) {
    const estado = e.target.value;
    this.setState(prevState => ({
      pessoaAtual: {
        ...prevState.pessoaAtual,
        estado: estado
      }
    }));
  }

  getPessoa(id) {
    PessoaDataService.get(id)
      .then(response => {
        this.setState({
          pessoaAtual: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log("Erro: "+e);
      });
  }

  updatePessoa() {
    PessoaDataService.update(
      this.state.pessoaAtual.id,
      this.state.pessoaAtual
    )
      .then(response => {
        console.log(response.data);
        this.props.navigate('/');
        this.setState({
          mensagem: "Pessoa atualizada com sucesso!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deletePessoa() {
    PessoaDataService.delete(this.state.pessoaAtual.id)
      .then(response => {
        console.log(response.data);
        this.props.navigate('/');
        this.props.history.push('/list')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { pessoaAtual } = this.state;

    return (
      <div>
        {pessoaAtual ? (
          <div className="edit-form">
            <h4>Pessoa</h4>
            <form>
              <div className="form-group">
                <label htmlFor="nome"><strong>Nome</strong></label>
                <input
                  type="text"
                  className="form-control"
                  id="nome"
                  value={pessoaAtual.nome}
                  onChange={this.onChangeNome}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cpf"><strong>CPF</strong></label>
                <input
                  type="text"
                  className="form-control"
                  id="cpf"
                  value={pessoaAtual.cpf}
                  onChange={this.onChangeCpf}
                />
              </div>
              <div className="form-group">
                <label htmlFor="telefone"><strong>Telefone</strong></label>
                <input
                  type="text"
                  className="form-control"
                  id="telefone"
                  value={pessoaAtual.telefone}
                  onChange={this.onChangeTelefone}
                />
              </div>
              <div className="form-group">
                <label htmlFor="endereco"><strong>Endereço</strong></label>
                <input
                  type="text"
                  className="form-control"
                  id="endereco"
                  value={pessoaAtual.endereco}
                  onChange={this.onChangeEndereco}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cidade"><strong>Cidade</strong></label>
                <input
                  type="text"
                  className="form-control"
                  id="cidade"
                  value={pessoaAtual.cidade}
                  onChange={this.onChangeCidade}
                />
              </div>
              <div className="form-group">
                <label htmlFor="estado"><strong>Estado</strong></label>
                <input
                  type="text"
                  className="form-control"
                  id="estado"
                  value={pessoaAtual.estado}
                  onChange={this.onChangeEstado}
                />
              </div>

              <button
                className="m-2 btn btn-sm btn-danger mr-2"
                onClick={this.deletePessoa}
              >
                Excluir
              </button>

              <button
                type="submit"
                className="m-2 btn btn-sm btn-success"
                onClick={this.updatePessoa}
              >
                Atualizar
              </button>
              <p>{this.state.mensagem}</p>
            </form>
          </div>
        ) : (
          <div>
            <br />
            <p><i>Para detalhes, selecione uma pessoa.</i></p>
          </div>
        )}
      </div>
    );
  }
}
export default withRouter(Pessoa);
