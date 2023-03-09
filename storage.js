export default class Storage {
  static setStorage(array) {
    let storage = localStorage.setItem("todos", JSON.stringify(array));

    return storage;
  }
  static getStorage() {
    let storage =
      localStorage.getItem("todos") === null
        ? []
        : JSON.parse(localStorage.getItem("todos"));
    return storage;
  }
  static setSessionStorage(value) {
    const storage = sessionStorage.setItem("id", value);
    return storage;
  }
  static getSessionStorage() {
    const storage =
      sessionStorage.getItem("id") === null ? "" : sessionStorage.getItem("id");
    return storage;
  }
  static clearSessionStorage() {
    sessionStorage.removeItem("id");
  }
}
