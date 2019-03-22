// Referências (para intellisense)
/// <reference path="../typings/react.d.ts" />
/// <reference path="../typings/react-dom.d.ts" />

class TodoItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editar: false
    };
  }

  render() {
    if (this.state.editar === true) {
      // modo de edição
      return React.createElement(
        "li",
        null,
        React.createElement("input", {
          type: "text",
          value: this.props.value
        }),
        React.createElement(
          "button",
          {
            type: "button"
          },
          "Guardar"
        ),
        React.createElement(
          "button",
          {
            type: "button"
          },
          "Cancelar"
        )
      );
    } else {
      return React.createElement(
        "li",
        null,
        this.props.value,
        React.createElement(
          "button",
          {
            type: "button",
            onClick: (evt) => this.handleToggleEditingItem(i)
          },
          "Editar"
        ),
        React.createElement(
          "button",
          {
            type: "button",
            onClick: (evt) => this.props.onDelete(i)
          },
          "🗑️"
        )
      );
    }
  }
}
