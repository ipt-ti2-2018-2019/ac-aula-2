// Referências (para intellisense)
/// <reference path="../typings/react.d.ts" />
/// <reference path="../typings/react-dom.d.ts" />

/**
 * Representa a aplicação de gestão de tarefas.
 *
 * É responsável por gerir a lista das tarefas,
 * disponibilizando a funcionalidade de inserção e listagem das tarefas.
 */
class TodoApp extends React.Component {
  // O `props` representa o valor inicial (ou por defeito)
  // das propriedades quando o componente é criado.
  // Isto pode ser usado para inicializar o `state` do objeto.
  constructor(props) {
    super(props);

    // O this.state tem que ser um objeto.
    // Se não for definido, toma o valor de NULL.
    this.state = {
      listaTarefas: ["Regar as plantas", "Dar de comer ao gato", "Estudar TI2"]
    };
  }

  // Define a interface de utilizador, dado um determinado `state` e `props`.
  // Quando é atualizado o valor do `state` (através do `this.setState()`)
  // ou `props`, o `render()` é invocado automaticamente, permitindo
  // atualizar a interface do utilizador.
  render() {
    /*
    <div>
      <input type="text" id="txtTarefa" />
      <button type="button" onClick={(evt) => this.handleClick(evt)}>
        +
      </button>
      <ul>
        {listaLisAux}
      </ul>
    </div>
    */
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
      React.createElement(ListaTodos, {
        listaTarefas: this.state.listaTarefas,
        onDelete: (idx) => this.handleDelete(idx)
      })
    );
  }

  /**
   * Adiciona uma tarefa à lista de tarefas.
   *
   * @param {*} evt Evento do clique. Pode ser omitido. Através do evento
   *  que é passado por parâmetro, é possível aceder ao elemento que o lançou.
   */
  handleClick(evt) {
    let texto = document.getElementById("txtTarefa").value;

    // Arrays e Objetos são mutáveis. Como são mutáveis (ex: adicionar elementos),
    // o JavaScript (e o React) não "sabem" quando o valor do array/objeto
    // mudou, ou sequer o que mudou.
    // Por isso, para simplificar a lógica de atualização, criamos uma cópia
    // do array, e alteramos a cópia.
    // Como é um objeto diferente (através da lógica do ==), a atualização
    // do React torna-se mais simples.
    // Isto não se aplica a strings/números/booleanos
    let aux = this.state.listaTarefas.slice();

    aux.push(texto);

    // this.state.listaTarefas = aux;
    this.setState({
      listaTarefas: aux
    });
  }

  handleDelete(index) {
    let aux = this.state.listaTarefas.slice();
    // Remover um elemento (tarefa) na posição index
    aux.splice(index, 1);

    this.setState({ listaTarefas: aux });
  }
}

class ListaTodos extends React.Component {
  render() {
    // Esta lista/array vai conter um <li /> por cada tarefa que está
    // em `this.props.listaTarefas`.
    let listaLisAux = [];

    for (let i = 0; i < this.props.listaTarefas.length; i++) {
      let tarefa = this.props.listaTarefas[i];

      listaLisAux.push(
        React.createElement(
          "li",
          null,
          tarefa,
          React.createElement(
            "button",
            {
              type: "button",
              onClick: (evt) => this.props.onDelete(i)
            },
            "🗑️"
          )
        )
      );
    }

    return React.createElement("ul", null, listaLisAux);
  }
}

ReactDOM.render(
  React.createElement(TodoApp, null),
  document.getElementById("app")
);
