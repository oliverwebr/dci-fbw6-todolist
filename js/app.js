class ToDo {
  constructor() {
    // list of todo items
    this.items = JSON.parse(localStorage.getItem('todoList')) || [];
    this.init();
  }

  init() {
    this.updateList();
  }

  updateList() {
    ui.displayListItems(this.items);
    this.saveList();
  }

  // adds ToDo item to array
  addItem(itemToAdd) {
    this.items.push(itemToAdd);
    this.updateList();
  }

  // delete item from array
  deleteItem(itemIndex) {
    this.items.splice(itemIndex, 1);
    this.updateList();
  }

  // save items to localstorage
  saveList() {
    localStorage.setItem('todoList', JSON.stringify(this.items));
  }
}

class UI {
  constructor() {
    this.elements = {
      listContainer: document.querySelector('.itemList'),
    };
  }

  // displays ToDo Items in browser
  displayListItems(list) {
    this.elements.listContainer.innerHTML = '';
    list.forEach((item, index) => {
      this.elements.listContainer.innerHTML += `
      <li data-id="${index}" class="list-group-item faded">
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
    Controller.delToDoListener();
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

  // listens to clicks on delete todo button
  static delToDoListener() {
    ui.elements.listContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('todo_delete')) {
        toDo.deleteItem(e.target.parentElement.dataset.id);
      }
    });
  }
}

const ui = new UI();
const toDo = new ToDo();
const control = new Controller();
