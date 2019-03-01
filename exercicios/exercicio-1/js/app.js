// Referências (para intellisense)
/// <reference path="../typings/react.d.ts" />
/// <reference path="../typings/react-dom.d.ts" />

// TODO...

class TodoApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listaTarefas: ["Dar de comer ao gato", "Estudar TI2"]
    };
  }

  render() {
    console.log("Render TodoApp");
    return React.createElement(
      "div",
      null,
      React.createElement("input", { type: "text", id: "txtDescricaoTarefa" }),
      React.createElement(
        "button",
        {
          type: "button",
          onClick: (evt) => this.handleAddClick(evt)
        },
        "+"
      ),
      React.createElement(ListaTodos, { tarefas: this.state.listaTarefas })
    );
  }

  handleAddClick(evt) {
    console.log("Click");
    let textoTarefa = document.getElementById("txtDescricaoTarefa").value;

    let copia = this.state.listaTarefas.slice();

    copia.push(textoTarefa);

    // this.state.listaTarefas = copia;

    this.setState({
      listaTarefas: copia
    });
  }
}

class ListaTodos extends React.Component {
  render() {
    console.log("Render ListaTodos");
    let listaLis = [];

    for (let tarefa of this.props.tarefas) {
      listaLis.push(React.createElement("li", null, tarefa));
    }

    return React.createElement("ul", { className: "lista-todos" }, listaLis);
  }
}

ReactDOM.render(
  React.createElement(TodoApp, null),
  document.getElementById("app")
);
