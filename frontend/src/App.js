import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from "axios";


// Declara o componente principal, extendendo do componente padrão
class App extends Component {
  // Construção dos elementos e definição do state atual da aplicação
  // O state no react é um dos conceitos mais importantes...
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      activeItem: {
        title: "",
        description: "",
        completed: false
      },
      ideiasList: []
    };
  }

  // Ação que será executada no momento em que o componente terminar
  // de ser montado
  componentDidMount() {
    this.refreshList();
  }

  // Função que manda uma requisição GET para a nossa API
  // e recebe os objetos para popular. Assim que os objetos forem
  // recebidos, o state será atualizado.
  refreshList = () => {
    fetch("http://localhost:8000/ideias/")
    .then(response => response.json())
    .then(data => 
      this.setState({ ideiasList: data })
    )
  }	

  // função criada para modularizar a criação da lista.
  renderItems = () => {
    return this.state.ideiasList.map(ideia => (
      <li key={ideia.id} className="ml-4 mb-2 mt-2">

        {ideia.titulo}
        <span>
          <button
            onClick={() => this.handleDelete(ideia)}
            className="btn btn-danger float-right"
          >
            Delete{" "}
          </button>
          <button
            onClick={() => this.editItem(ideia)}
            className="btn btn-secondary mr-2 ml-2 float-right"
          >
            {" "}
            Edit{" "}
          </button>
        </span>
      </li>
    ))
  };

  // Função responsável por habilitar o nosso modal
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  // Quando mandarmos submit no modal, precisamos tomar ações.
  // Então se a requisição já possui um item com ID, significa
  // que estamos alterando um registro e precisaremos enviar uma
  // requisição GET ao invés de post.
  handleSubmit = item => {
    this.toggle();
    if (item.id) {
      axios
        .put(`http://localhost:8000/ideias/${item.id}/`, item)
        .then(res => this.refreshList());
      return;
    }
    axios
      .post("http://localhost:8000/ideias/", item)
      .then(res => this.refreshList());
  };

  // Envia request de deleção de um item
  handleDelete = item => {
    axios
      .delete(`http://localhost:8000/ideias/${item.id}`)
      .then(res => this.refreshList());
  };

  // Toggle no modal
  createItem = () => {
    const item = { titulo: "", descricao: "" };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  // Toggle no modal
  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  // Uma das funções mais importantes no react.
  // Ela é a função que vai renderizar o elemento o qual vai ser exibido na tela.
  // Então aqui devemos definir quais elementos serão exibidos.
  render() {
    return (
      <main className="content">
        <h1 className="text-black text-uppercase text-center my-4">Ideias app</h1>
        <div className="row ">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="">
                <button onClick={this.createItem} className="btn btn-primary mb-3">
                  Nova ideia
                </button>
              </div>
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}

export default App;