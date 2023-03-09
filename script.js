import Storage from "./storage.js";
import Todo from "./todoList.js";
import TodoListUI from "./uiRender.js";

const todoName = document.querySelector("[data-name-input]");
const todoTime = document.querySelector("[data-time-input]");
const saveBtn = document.querySelector("[data-save-btn]");

let arrayTodos;
let currentSelectedIndex;

// todoTime.addEventListener("change", () => {
//   if (todoName.value.length > 0) {
//     saveBtn.disabled = false;
//   } else {
//     saveBtn.disabled = true;
//   }
// });

function handleSave() {
  currentSelectedIndex = Storage.getSessionStorage();
  if (
    todoName.value.trim().length > 0 &&
    Todo.saveUpdateTodo(currentSelectedIndex) === false
  ) {
    Todo.addTodo(todoName.value, todoTime.value, false);
    const todoArray = Todo.getTodos();
    TodoListUI.render(todoArray);
    TodoListUI.clearInput();
    Storage.setStorage(todoArray);
    // saveBtn.disabled = true;
  } else if (Todo.saveUpdateTodo(currentSelectedIndex) === true) {
    Todo.updateTodo(
      currentSelectedIndex,
      todoName.value,
      todoTime.value,
      false
    );
    const todoArray = Todo.getTodos();
    TodoListUI.render(todoArray);
    TodoListUI.clearInput();
  }
  Storage.clearSessionStorage();
}
function keyboardEvent(e) {
  if (e.key === "Escape") {
    TodoListUI.clearInput();
    Storage.clearSessionStorage();
  }
  if (e.key === "Enter") {
    handleSave();
    Storage.clearSessionStorage();
  }
}

saveBtn.addEventListener("click", handleSave);

window.addEventListener("DOMContentLoaded", () => {
  Storage.clearSessionStorage();
  arrayTodos = Todo.getTodos();
  TodoListUI.render(arrayTodos);
  TodoListUI.deleteTodo();
  TodoListUI.checkTodo();
  TodoListUI.updateTodo();
});
document.addEventListener("keydown", keyboardEvent);
