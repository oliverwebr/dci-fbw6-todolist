class ToDo {
  constructor() {
    // list of todo items
    this.items = ['Test1', 'TEst2', 'Test3'];
    this.init();
  }

  init() {
    this.updateList();
  }

  updateList() {
    ui.displayListItems(this.items);
  }

  // adds ToDo item to array
  addItem(itemToAdd) {
    this.items.push(itemToAdd);
    this.updateList();
  }
}

class UI {
  constructor() {
    this.elements = {
      listContainer: document.querySelector('.itemList'),
    };
  }

  displayListItems(list) {
    this.elements.listContainer.innerHTML = '';
    list.forEach((item) => {
      this.elements.listContainer.innerHTML += `
      <li class="list-group-item">
        <span class="todo_item">${item}</span>
        <i class="fa fa-trash todo_delete" aria-hidden="true"></i>
      </li>
      `;
    });
  }
}

class Controller {
  constructor() {
    Controller.init();
  }

  // initialize all event listeners
  static init() {
    Controller.addToDoListener();
  }

  // listens to clicks on Add ToDo Button
  static addToDoListener() {
    const addBtn = document.querySelector('#addToDoBtn');
    const input = document.querySelector('#toDoInput');
    addBtn.addEventListener('click', () => {
      toDo.addItem(input.value);
      input.value = '';
    });
  }
}

const ui = new UI();
const toDo = new ToDo();
const control = new Controller();
