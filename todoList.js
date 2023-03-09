import Storage from "./storage.js";

let todoArray = Storage.getStorage();

class Todo {
  constructor(id, todo_name, time, isDone) {
    this.id = id;
    this.todo_name = todo_name;
    this.time = time;
    this.isDone = isDone;
  }
  static addTodo(todo_name, time, isDone) {
    const id = Math.random() * 18062002;
    const todo = new Todo(id, todo_name, time, isDone);
    todoArray = [...todoArray, todo];
  }
  static getTodos() {
    return todoArray;
  }
  static deleteTodo(id) {
    todoArray = todoArray.filter((todo) => todo.id !== +id);
    Storage.setStorage(todoArray);
  }
  static checkTodo(id, state) {
    if (state != null) {
      todoArray = Storage.getStorage();
      todoArray = todoArray.map((item) => {
        if (item.id === +id) {
          item.isDone = state;
        }
        return item;
      });
      Storage.setStorage(todoArray);
    }
    return todoArray;
  }
  static saveUpdateTodo(id) {
    let isFound = todoArray.findIndex((todo) => {
      return todo.id === +id;
    });
    return isFound >= 0 ? true : false;
  }
  static updateTodo(id, name, time, isDone = false) {
    todoArray.forEach((element, index) => {
      if (element.id === +id) {
        todoArray[index].todo_name = name;
        todoArray[index].time = time;
        todoArray[index].isDone = isDone;
      }
    });
    Storage.setStorage(todoArray);
  }
}

export default Todo;
