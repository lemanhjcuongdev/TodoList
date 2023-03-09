import Storage from "./storage.js";
import Todo from "./todoList.js";

const todoName = document.querySelector("[data-name-input]");
const todoTime = document.querySelector("[data-time-input]");
const todoList = document.querySelector("[data-list]");

export default class TodoListUI {
  static render(todoArray) {
    if (todoArray != null) {
      const html = todoArray.map((todoItem, index) => {
        const todoYear = todoItem.time.slice(0, 4);
        const todoMonth = todoItem.time.slice(5, 7);
        const todoDay = todoItem.time.slice(8, 10);
        const todoHour = todoItem.time.slice(11, 13);
        const todoMinute = todoItem.time.slice(14, 16);
        return `<div class="item" data-todo-id="${todoItem.id}" data-time="${
          todoItem.time
        }" data-name="${todoItem.todo_name}" data-completed=${todoItem.isDone}>
          <i data-value="${
            todoItem.isDone ? "doneBtn" : "notDoneBtn"
          }" class="${
          todoItem.isDone ? "fa-solid fa-check active" : "fa-regular fa-circle"
        }"></i>
        <div class="${
          todoItem.isDone ? "information inactive" : "information"
        }" title="Click to edit to-do">
          <div class="label" data-name="${todoItem.todo_name}">
            ${todoItem.todo_name}
          </div>
          ${
            todoItem.time !== ""
              ? `<div class="time" data-time="${todoItem.time}">` +
                todoHour +
                ":" +
                todoMinute +
                " &nbsp; " +
                todoDay +
                "-" +
                todoMonth +
                "-" +
                todoYear +
                `</div>`
              : ""
          }
        </div>
        <i data-value="delete" class="fa-solid fa-trash"></i>
        <div class="update" data-value="update">Update</div>
        </div>
        `;
      });
      todoList.innerHTML = html.join(" ");
    }
  }
  static clearInput() {
    todoName.value = "";
    todoTime.value = "";
    todoName.focus();
  }
  static deleteTodo() {
    const delEvent = todoList.addEventListener("click", (e) => {
      if (
        e.target.dataset.value === "delete" &&
        confirm("Are you sure you want to delete?")
      ) {
        e.target.parentElement.remove();
        let targetId = e.target.closest("[data-todo-id]").dataset.todoId;
        if (e.target.dataset.value === "delete") Todo.deleteTodo(targetId);
      }
    });
    return () => {
      todoList.removeEventListener("click", delEvent);
    };
  }
  static updateTodo = () => {
    todoList.addEventListener("click", (e) => {
      const todoElement = e.target.closest("[data-todo-id]");
      if (
        e.target.dataset.value !== "doneBtn" &&
        e.target.dataset.value !== "notDoneBtn" &&
        e.target.dataset.value !== "delete"
      ) {
        todoName.value = todoElement.dataset.name;
        todoTime.value = todoElement.dataset.time;
        Storage.setSessionStorage(todoElement.dataset.todoId);
      }
    });
  };
  static checkTodo() {
    const checkEvent = todoList.addEventListener("click", (e) => {
      const todoElement = e.target.closest("[data-todo-id]");
      let targetId = e.target.closest("[data-todo-id]").dataset.todoId;
      let currentState;
      if (
        e.target.closest("[data-todo-id]") &&
        e.target.dataset.value === "notDoneBtn" &&
        todoElement.dataset.completed === "false"
      ) {
        currentState = true;
      } else if (
        e.target.closest("[data-todo-id]") &&
        e.target.dataset.value === "doneBtn" &&
        todoElement.dataset.completed === "true"
      ) {
        currentState = false;
      }
      const newArray = Todo.checkTodo(targetId, currentState);
      TodoListUI.render(newArray);
    });
    return () => {
      todoList.removeEventListener("click", checkEvent);
    };
  }
}
