import { Todo } from ".";

export class TodoList {
    constructor() {
        this.cargarTodos();
    }

    crearTodo(todo) {
        this.todos.push(todo);
        this.guardarTodosLocalStorage();

    }

    eliminarTodo(idTodo) {
        this.todos = this.todos.filter(todo => todo.id != idTodo);
        this.guardarTodosLocalStorage();
    }

    marcarTodoCompletado(idTodo) {
        for (const todo of this.todos) {
            if (todo.id == idTodo) {
                todo.completado = !todo.completado;
                this.guardarTodosLocalStorage();
                break;
            }
        }
    }


    // eliminarTodosCompletados(idTodo) {
    //     this.todos = this.todos.filter(todo => todo.id != idTodo)

    // }

    guardarTodosLocalStorage() {
        localStorage.setItem('todosKey', JSON.stringify(this.todos));
    }

    cargarTodos() {

        this.todos = localStorage.getItem('todosKey') ? JSON.parse(localStorage.getItem('todosKey')) : [];

        this.todos = this.todos.map(Todo.fromJson);

    }

}