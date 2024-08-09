// A. Add Todos
// 1. select necessary elements
const form = document.querySelector("#new-todo-form");
const formInput = document.querySelector("#todo-input");
const list = document.querySelector("#list");
const template = document.querySelector("#list-item-template");
const todos = [];
const TODO_STORAGE_KEY = "ADVANCED-TODO-LIST-";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const todoName = formInput.value;
  if (todoName === "") return;
  todos.push(todoName);
  renderTodo(todoName);
  saveTodos();
  formInput.value = "";
});

// render Todo
function renderTodo(todoName) {
  const templateClone = template.content.cloneNode(true);
  const textElement = templateClone.querySelector("[data-list-item-text]");
  textElement.innerText = todoName;
  list.appendChild(templateClone);
}

// Save Todo
function saveTodos() {
  localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
}
