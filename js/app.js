class ToDo {
  constructor() {
    this.items = [];
  }

  addItem(itemToAdd) {
    this.items.push(itemToAdd);
  }
}

class Controller {
  constructor() {
    this.init();
  }

  // initialize all event listeners
  init() {
    this.addToDoListener();
  }

  // listens to clicks on Add ToDo Button
  addToDoListener() {
    const addBtn = document.querySelector('#addToDoBtn');
    const input = document.querySelector('#toDoInput');
    addBtn.addEventListener('click', () => toDo.addItem(input.value));
  }
}

const toDo = new ToDo();
const control = new Controller();
