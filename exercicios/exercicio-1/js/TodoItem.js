// Referências (para intellisense)
/// <reference path="../typings/react.d.ts" />
/// <reference path="../typings/react-dom.d.ts" />

// @ts-check

class TodoItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      editingText: props.tarefa
    };
  }

  render() {
    if (this.state.isEditing) {
      // Mostrar a caixa de texto.
      return React.createElement(
        "li",
        null,
        React.createElement("input", {
          type: "text",
          value: this.state.editingText,
          onChange: (evt) => this.handleInputChange(evt)
        }),
        React.createElement(
          "button",
          { type: "button", onClick: (evt) => this.handleSave() },
          "✔️"
        ),
        React.createElement(
          "button",
          { type: "button", onClick: (evt) => this.stopEditing() },
          "❌"
        )
      );
    } else {
      // Mostrar a label.
      return React.createElement(
        "li",
        null,
        this.props.tarefa,
        // Botão para editar a tarefa.
        React.createElement(
          "button",
          { type: "button", onClick: (evt) => this.handleStartEditing(evt) },
          "✏️"
        ),
        // Botão para apagar uma tarefa.
        React.createElement(
          "button",
          {
            type: "button",
            // Quando se clica no botão,
            // usa-se a props `onDeleteTodo`, que é uma função.
            // O parâmetro do `evt`, que representa o clique,
            // é ignorado, porque não temos uso para ele.
            onClick: (evt) => this.props.onDeleteTodo()
          },
          "x"
        )
      );
    }
  }

  handleStartEditing(evt) {
    this.setState({ isEditing: true });
  }

  handleSave() {
    this.props.onEditTodo(this.state.editingText);
    this.stopEditing();
  }

  stopEditing() {
    this.setState({ isEditing: false });
  }

  /**
   *
   * @param {React.ChangeEvent<HTMLInputElement>} evt
   */
  handleInputChange(evt) {
    let texto = evt.target.value;

    this.setState({ editingText: texto });
  }
}
