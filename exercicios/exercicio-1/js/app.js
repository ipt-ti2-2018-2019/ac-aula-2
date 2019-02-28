// Referências (para intellisense)
/// <reference path="../typings/react.d.ts" />
/// <reference path="../typings/react-dom.d.ts" />

/**
 * Formulário que vai adicionar um TODO.
 */
class NovoTodo extends React.Component {
    constructor(props) {
        super(props);

        // Referência para a caixa de texto que está no render() via ref.
        this.todoInput = React.createRef();
    }

    /**
     * Responde ao evento do "submit" do form que está no render().
     *
     * @param {Event} evt
     */
    handleSubmit(evt) {
        evt.preventDefault();

        // Obter o valor da caixa de texto (via ref)
        let text = this.todoInput.current.value;

        this.props.onAddTodo(text);

        // Repor o texto da caixa de texto.
        this.todoInput.current.value = "";
    }

    render() {
        return React.createElement(
            "form",
            { onSubmit: (evt) => this.handleSubmit(evt) },
            React.createElement("input", {
                // Guardar uma referência para a caixa de texto.
                ref: this.todoInput,
                type: "text",
                placeholder: "O que é que tens para fazer?",
                // Obrigar que a caixa esteja preenchida para que o formulário possa ser submetido.
                required: true
            }),
            React.createElement("button", { type: "submit" }, "Adicionar")
        );
    }
}

/**
 * Contador do número de TODOs.
 *
 * @param {{ numTodos: number }} props
 */
function ContadorTodos(props) {
    if (props.numTodos > 0) {
        return React.createElement(
            "p",
            null,
            "Tens ",
            props.numTodos,
            " coisas para fazer!"
        );
    } else {
        return React.createElement("p", null, "Não tens nada para fazer!?");
    }
}

/**
 * Lista de TODOs.
 *
 * @param {{ todos: string[] }} props
 */
function ListaTodos(props) {
    let lista = [];

    for (let todo of props.todos) {
        lista.push(React.createElement("li", null, todo));
    }

    return React.createElement("ul", null, lista);
}

/**
 * Componente principal da aplicação. Serve como o "main()".
 */
class TodoApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            /**
             * Vai guardar a lista dos TODOs (texto de cada um)
             */
            todos: []
        };
    }

    /**
     * Trata de guardar o TODO na lista.
     *
     * @param {string} text
     */
    handleNovoTodo(text) {
        this.setState({
            // Guardar o novo TODO na lista, criando uma nova a partir da anterior.
            todos: [...this.state.todos, text]
        });
    }

    render() {
        let todos = this.state.todos;

        return React.createElement(
            "div",
            null,
            React.createElement(NovoTodo, {
                onNovoTodo: (text) => this.handleNovoTodo(text)
            }),
            React.createElement(ContadorTodos, { numTodos: todos.length }),
            React.createElement(ListaTodos, { todos: todos })
        );
    }
}

// Iniciar a aplicação
ReactDOM.render(
    React.createElement(TodoApp, null),
    document.getElementById("app")
);
