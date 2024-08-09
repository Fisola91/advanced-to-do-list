// A. Add Todos
// 1. select necessary elements
const form = document.querySelector("#new-todo-form");
const formInput = document.querySelector("#todo-input");
const list = document.querySelector("#list");
const template = document.querySelector("#list-item-template");

const TODO_STORAGE_KEY = "ADVANCED-TODO-LIST-todos";
let todos = loadTodos();

list.addEventListener("click", (e) => {
  const button = e.target.matches("[data-button-delete]");
  if (!button) return;

  const parent = e.target.closest(".list-item");
  const todoId = parent.dataset.todoId;
  parent.remove();
  todos = todos.filter((todo) => todo.id !== todoId);
  saveTodos();
  //
});

todos.forEach((todo) => renderTodo(todo));
// todos.forEach(renderTodo); // This works too

// complete Todos
list.addEventListener("change", (e) => {
  if (!e.target.matches("[data-list-item-checkbox]")) return;
  const parent = e.target.closest(".list-item");
  const todoId = parent.dataset.todoId;
  const todo = todos.find((todo) => todo.id === todoId);
  todo.complete = e.target.checked;
  saveTodos();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const todoName = formInput.value;
  if (todoName === "") return;
  const newTodo = {
    name: todoName,
    complete: false,
    id: new Date().valueOf().toString(),
  };
  todos.push(newTodo);
  renderTodo(newTodo);
  saveTodos();
  formInput.value = "";
});

// render Todo
function renderTodo(todo) {
  const templateClone = template.content.cloneNode(true);
  const listItem = templateClone.querySelector(".list-item");
  listItem.dataset.todoId = todo.id;
  const textElement = templateClone.querySelector("[data-list-item-text]");
  textElement.innerText = todo.name;
  const checkBox = templateClone.querySelector("[data-list-item-checkbox]");
  checkBox.checked = todo.complete;
  list.appendChild(templateClone);
}

// Save Todo
function saveTodos() {
  localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
}

// Load Todos
function loadTodos() {
  const todosString = localStorage.getItem(TODO_STORAGE_KEY);
  return JSON.parse(todosString) || [];
}
