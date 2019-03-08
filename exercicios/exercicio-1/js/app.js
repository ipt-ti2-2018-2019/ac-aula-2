// Referências (para intellisense)
/// <reference path="../typings/react.d.ts" />
/// <reference path="../typings/react-dom.d.ts" />

class TodoApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listaTarefas: ["Regar as plantas", "Dar de comer ao gato", "Estudar TI2"]
    };
  }

  render() {
    let listaLisAux = [];

    for (let tarefa of this.state.listaTarefas) {
      listaLisAux.push(React.createElement("li", null, tarefa));
    }

    return React.createElement(
      "div",
      null,
      React.createElement("input", { type: "text", id: "txtTarefa" }),
      React.createElement(
        "button",
        {
          type: "button",
          onClick: (evt) => this.handleClick(evt)
        },
        "+"
      ),
      React.createElement("ul", null, listaLisAux)
    );
  }

  handleClick(evt) {
    let texto = document.getElementById("txtTarefa").value;

    let aux = this.state.listaTarefas.slice();

    aux.push(texto);

    // this.state.listaTarefas = aux;
    this.setState({
      listaTarefas: aux
    });
  }
}

ReactDOM.render(
  React.createElement(TodoApp, null),
  document.getElementById("app")
);
