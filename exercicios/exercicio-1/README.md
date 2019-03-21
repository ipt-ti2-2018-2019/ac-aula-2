# Exercício - "To Do"

## Objetivos

-   Criar uma aplicação React que permita a gestão de "To Dos". (Um "To Do" é, regra geral uma tarefa).
-   Aplicar os conceitos leccionados nas aulas:
    -   Classes como componentes React
    -   Eventos
    -   State

## Funcionalidade: Marcar tarefas como concluído ou não concluído

Objetivo: O utilizador deve ter a possibilidade de marcar uma tarefa como concluída ou não concluída, ao clicar num botão em cada item.
O botão faz o "toggle" do estado de concluído.

A implementação desta funcionalidade assenta sobre os mesmos conceitos que se usaram nas outras aulas:

- Classes
- Eventos
- State e setState

Uma tarefa concluída deve ter um aspecto diferente de uma por concluir. Por exemplo, uma tarefa concluída pode ter um estilo ~~rasurado~~.

### Guião

1. Adicionar um botão em cada item da lista, para alterar o estado da tarefa.
2. Mudar o formato da tarefa no "this.state" da aplicação para ser um array de objetos:
    1. Texto
    2. Estado
3. Alterar os componentes afetados pelo refactor no passo anterior, são arrays de objetos e não de strings.
4. Fazer uma função que permita editar o estado de uma tarefa, dado o índice da tarefa e o novo estado.
5. Adicionar os event listeners aos botões.

## Extra: Filtrar tarefas por estado

Objetivo: Antes, ou depois, dos ítens na lista, adicionar três botões:

- Um, para mostrar todas as tarefas
- Um, para mostrar apenas as tarefas não concluídas
- Um, para mostrar apenas as tarefas concluídas

Ao clicar no botão, a lista deve apenas mostrar as tarefas associadas ao filtro que o utilizador pretende, sem apagá-las da lista de tarefas que o utilizador tem para fazer.

## Extra 2: Apagar as tarefas concluídas

Objetivo: Antes, ou depois, dos ítens na lista, adicionar mais um botão, para eliminar da lista de tarefas os ítens que estão concluídos.
