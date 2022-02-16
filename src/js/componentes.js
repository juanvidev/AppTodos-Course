import { Todo } from "../classes";
import { todoList } from "../index.js";


//Referencias HTML
const divTodoList = document.querySelector('.todo-list');
const inputTxt = document.querySelector(".new-todo");
const buttonClear = document.querySelector(".clear-completed");
const filtersHTML = document.querySelector(".filters");
const anchorFilters = document.querySelectorAll(".filtro");

export const crearTodoHtml = (todo) => {
    const htmlTodo = `
    <li class="${(todo.completado) ? "completed" : ''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" id=${todo.id} type="checkbox" ${(todo.completado) ? "checked" : ""}>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;
}


inputTxt.addEventListener("keyup", (event) => {
    if (event.keyCode === 13 && inputTxt.value.length > 0) {
        const nuevoTodo = new Todo(inputTxt.value);
        todoList.crearTodo(nuevoTodo);
        crearTodoHtml(nuevoTodo);
        inputTxt.value = "";
    }

});

divTodoList.addEventListener("click", (event) => {

    const nombreElemento = event.target.localName;
    const todoElemento = event.target.parentElement.parentElement
    const todoId = todoElemento.getAttribute("data-id");
    const inputCheckbox = document.getElementById(`${todoId}`);
    if (nombreElemento.includes("input")) {
        todoList.marcarTodoCompletado(todoId);
        todoElemento.classList.toggle('completed');
    } else if (nombreElemento.includes("label")) {
        inputCheckbox.checked = !inputCheckbox.checked;
        todoElemento.classList.toggle('completed');
    } else {
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
    }


});

buttonClear.addEventListener("click", (event) => {

    const todosCompletadosHTML = document.querySelectorAll(".completed");
    todosCompletadosHTML.forEach((element) => {

        todoList.eliminarTodo(element.getAttribute('data-id'))
        divTodoList.removeChild(element);
    })
});

filtersHTML.addEventListener("click", (event) => {
    const filtros = event.target.text;
    if (!filtros) { return; }

    anchorFilters.forEach(element => element.classList.remove('selected'));

    event.target.classList.add('selected');


    for (const elemt of divTodoList.children) {
        const completado = elemt.classList.contains("completed");

        if (filtros == "Completados" && !completado) {
            elemt.classList.add("hidden");

        } else if (filtros == "Pendientes" && completado) {
            elemt.classList.add("hidden");
        } else {
            elemt.classList.remove("hidden");
        }
    }


});