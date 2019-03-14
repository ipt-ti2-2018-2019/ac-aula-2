// Referências (para intellisense)
/// <reference path="../typings/react.d.ts" />
/// <reference path="../typings/react-dom.d.ts" />

// @ts-check

/**
 * Representa a aplicação inteira, ou, o ponto de "arranque"
 * da aplicação de tarefas.
 *
 * É responsável por montar os componentes principais da
 * interface gráfica, gerir a adição de novas tarefas na lista de tarefas.
 */
class TodoApp extends React.Component {
  /**
   * @param {object} props serve para o "valor inicial" das propriedades
   * do objeto quando este é criado. (Uma técnica comum é copiar um valor do 'props'
   * para o 'this.state', mas atenção que pode dar chatices).
   */
  constructor(props) {
    // A invocação do construtor 'super' implica passar as props.
    super(props);

    this.state = {
      /**
       * Representa a lista das tarefas que será mostrada no ecrã
       * e com a qual o utilizador pode interagir.
       */
      listaTarefas: ["Dar de comer ao gato", "Estudar TI2"]
    };
  }

  // Retorna a interface a ser mostrada ao utilizador.
  render() {
    /*
<div>
    <input type="text" id="txtTodo" />
    <button type="button" onClick={(evt) => this.handleAddButtonClick(evt)}>
      +
    </button>
    <ListaTodos items={this.state.listaTarefas} />
</div>
    */
    return React.createElement(
      "div",
      null,
      React.createElement("input", { type: "text", id: "txtTodo" }),
      React.createElement(
        "button",
        {
          type: "button",
          onClick: (evt) => this.handleAddButtonClick(evt)
        },
        "+"
      ),
      React.createElement(ListaTodos, {
        items: this.state.listaTarefas,
        // Esta função é passada, por parâmetro, para dentro da lista
        // de tarefas, e pode ser acedida via `props.onDeleteTodo(5)` (p.e.)
        // para PEDIR que seja apagada uma tarefa da lista, no índice `idx`.
        onDeleteTodo: (idx) => this.handleDeleteTodo(idx),
        onEditTodo: (idx, novoTexto) => this.handleEditTodo(idx, novoTexto)
      })
    );
  }

  /**
   * Adiciona o valor da caixa de texto na lista de tarefas
   * (ao clicar no botão).
   *
   * @param {Event} evt
   */
  handleAddButtonClick(evt) {
    let texto = document.getElementById("txtTodo").value;

    // Criação de um array auxiliar que terá a nova tarefa.
    // Isto é feito porque o valor presente em `this.state.listaTarefas`
    // não pode ser alterado. A utilização de métodos como o `.push()`
    // altera o array, logo tem que se criar um array auxiliar e modificar
    // essa cópia.
    let copia = this.state.listaTarefas.slice();
    copia.push(texto);

    // Define o novo valor do array auxiliar.
    this.setState({
      listaTarefas: copia
    });
  }

  /**
   * Apaga uma tarefa da lista de tarefas.
   * @param {number} index Índice do array para apagar a tarefa.
   */
  handleDeleteTodo(index) {
    let aux = this.state.listaTarefas.slice();

    // Apagar 1 elemento na posição especificada do array (posição `index`).
    aux.splice(index, 1);

    this.setState({ listaTarefas: aux });
  }

  /**
   * Atualiza o texto da tarefa na posição especificada do array de tarefas.
   * @param {number} index
   * @param {string} novoTexto
   */
  handleEditTodo(index, novoTexto) {
    // Criar um array auxiliar para editar.
    let aux = this.state.listaTarefas.slice();

    // Atualizar o texto da tarefa.
    aux[index] = novoTexto;

    this.setState({ listaTarefas: aux });
  }
}

/**
 * Representa a lista das tarefas que o utilizador tem
 * para fazer.
 *
 * @param {{ items: Array, onDeleteTodo(index: number): void, onEditTodo(idx, novoTexto): void }} props
 */
function ListaTodos(props) {
  // Quando o utilizador não tem tarefas, mostrar-lhe uma
  // mensagem amigável a encorajá-lo a usar a aplicação :)
  if (props.items.length === 0) {
    return React.createElement(
      "p",
      null,
      "Não tens nada para fazer. Porque não criar uma tarefa acima?"
    );
  }

  // Construção da interface gráfica com base nas
  // tarefas que foram passadas nas propriedades (em `props.items`),
  // um elemento <li> por tarefa.
  let listaLis = [];

  for (let i = 0; i < props.items.length; i++) {
    let tarefa = props.items[i];
    /*
    <li>
      {tarefa}
      <button onClick={(evt) => props.onDeleteTodo(i)}>x</button>
    </li>
    */
    listaLis.push(
      React.createElement(TodoItem, {
        tarefa: tarefa,
        onDeleteTodo: () => props.onDeleteTodo(i),
        onEditTodo: (novoTexto) => props.onEditTodo(i, novoTexto)
      })
    );
  }

  /*
  <div>
    <span>Tens {n} tarefas para fazer!</span>
    <ul>
      {listaLis}
    </ul>
  </div>
  */

  return React.createElement(
    "div",
    null,
    // Mostrar o número de tarefas que o utilizador tem para fazer.
    React.createElement(
      "span",
      null,
      "Tens " + props.items.length + " tarefas para fazer!"
    ),
    // Lista das tarefas.
    React.createElement("ul", null, listaLis)
  );
}

ReactDOM.render(
  React.createElement(TodoApp, null),
  document.getElementById("app")
);
