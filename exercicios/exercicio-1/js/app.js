// Referências (para intellisense)
/// <reference path="../typings/react.d.ts" />
/// <reference path="../typings/react-dom.d.ts" />

// TODO...

/**
 * Representa o ponto de arranque da aplicação de tarefas.
 *
 * É responsável por definir a estrutura da aplicação, e a gestão
 * das tarefas que são manipuladas pelo utilizador.
 */
class TodoApp extends React.Component {
  /**
   *
   * @param {object} props Valor inicial (ou por defeito) das propriedades
   * que vão inicializar o objeto. Podem, por exemplo, ser usadas para definir
   * variáveis no `this.state`.
   */
  constructor(props) {
    super(props);

    // `this.state` é obrigatóriamente um objeto.
    // Se não for definido, toma o valor de `null`.
    this.state = {
      /**
       * Representa as tarefas que o utilizador tem para fazer.
       */
      listaTarefas: ["Dar de comer ao gato", "Estudar TI2"]
    };
  }

  // Define o que tem que ser colocado no ecrã.
  render() {
    console.log("Render TodoApp");

    /*
    <div>
      <input type="text" id="txtDescricaoTarefa" />
      <button type="button" onClick={(evt) => this.handleAddClick(evt)}>
        +
      </button>
      <ListaTodos tarefas={this.state.listaTarefas} />
    </div>
    */

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
      React.createElement(ListaTodos, {
        tarefas: this.state.listaTarefas,
        // A prop `onDeleteTodo` serve como "intermediário",
        // ou "canal de comunicação" entre a `ListaTodos` e o `TodoApp`.
        // Quando o utilizador clica no botão para apagar uma tarefa,
        // a função que está nesta `prop` é chamada com o índice `idx`.
        // (ver o `onClick` do botão de eliminar no `ListaTodos`).
        onDeleteTodo: (idx) => this.handleDeleteTodo(idx),
        onEditTodo: (idx, novoTexto) => this.handleEditTodo(idx, novoTexto)
      })
    );
  }

  /**
   * Adiciona o texto da caixa de texto à lista de tarefas.
   *
   * @param {Event} evt
   */
  handleAddClick(evt) {
    console.log("Click");
    let textoTarefa = document.getElementById("txtDescricaoTarefa").value;

    // A criação de um array auxiliar é porque não se deve alterar
    // os valores presentes em `this.props` ou `this.state`.
    // A alteração destes valores, por limitações do JS, não seria
    // detectada pelo React, e o componente não se iria atualizar.
    // A modificação (adição da nova tarefa) é feita no array auxiliar.
    let copia = this.state.listaTarefas.slice();

    copia.push(textoTarefa);

    // Guardar o novo valor (isto é, a nova lista de tarefas)
    // e atualizar o componente.
    this.setState({
      listaTarefas: copia
    });
  }

  /**
   * Apaga uma tarefa da lista.
   *
   * @param {number} index Índice do array para apagar na
   * lista de tarefas.
   */
  handleDeleteTodo(index) {
    let aux = this.state.listaTarefas.slice();

    // Remover 1 elemento de `aux`, a partir do índice `index`
    // ou seja, estou a remover uma tarefa na posição determinada pelo
    // utilizador.
    aux.splice(index, 1);

    this.setState({
      listaTarefas: aux
    });
  }

  handleEditTodo(index, novoTexto) {
    let aux = this.state.listaTarefas.slice();

    aux[index] = novoTexto;

    this.setState({ listaTarefas: aux });
  }
}

/**
 * Representa a lista de tarefas que o utilizador tem
 * para fazer.
 */
class ListaTodos extends React.Component {
  render() {
    console.log("Render ListaTodos");

    // Criar um array com <li />, um por cada tarefa
    // que foi passada em `this.props.tarefas`.
    let listaLis = [];

    for (let i = 0; i < this.props.tarefas.length; i++) {
      let tarefa = this.props.tarefas[i];
      /*
      <li>
        {tarefa}
        <button type="button">x</button>
      </li>
      */
      listaLis.push(
        React.createElement(TodoItem, {
          tarefa: tarefa,
          onDeleteTodo: () => this.props.onDeleteTodo(i),
          onEditTodo: (novoTexto) => this.props.onEditTodo(i, novoTexto)
        })
      );
    }

    /*
    <div>
      <span>Tens {this.props.tarefas.length} tarefas por fazer!</span>
      <ul className="lista-todos">
        {listaLis}
      </ul>
    </div>
    */

    return React.createElement(
      "div",
      null,
      React.createElement(ContadorTarefas, { tarefas: this.props.tarefas }),
      React.createElement("ul", { className: "lista-todos" }, listaLis)
    );
  }
}

function ContadorTarefas(props) {
  return React.createElement(
    "p",
    null,
    props.tarefas.length === 0
      ? "Não tens nada para fazer!"
      : "Tens " + props.tarefas.length + " tarefas por fazer!"
  );
}

ReactDOM.render(
  React.createElement(TodoApp, null),
  document.getElementById("app")
);
