// Referências (para intellisense)
/// <reference path="../typings/react.d.ts" />
/// <reference path="../typings/react-dom.d.ts" />

class TodoItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editar: false,
      textoEditado: props.value
    };
  }

  handleToggleEditingItem() {
    this.setState({ editar: !this.state.editar });
  }

  handleTextBoxChange(evt) {
    this.setState({ textoEditado: evt.target.value });
  }

  handleSave() {
    this.props.onEdited(this.state.textoEditado);
    this.handleToggleEditingItem();
  }

  render() {
    if (this.state.editar === true) {
      // modo de edição
      return React.createElement(
        "li",
        null,
        React.createElement("input", {
          type: "text",
          value: this.state.textoEditado,
          onChange: (evt) => this.handleTextBoxChange(evt)
        }),
        React.createElement(
          "button",
          {
            type: "button",
            onClick: (evt) => this.handleSave()
          },
          "Guardar"
        ),
        React.createElement(
          "button",
          {
            type: "button",
            onClick: (evt) => this.handleToggleEditingItem()
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
            onClick: (evt) => this.handleToggleEditingItem()
          },
          "Editar"
        ),
        React.createElement(
          "button",
          {
            type: "button",
            onClick: (evt) => this.props.onDelete()
          },
          "🗑️"
        )
      );
    }
  }
}
