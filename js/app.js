// handles main functionality of ToDo list
class ToDo {
  constructor() {
    // list of todo items
    this.items = JSON.parse(localStorage.getItem('todoList')) || [];
    this.init();
  }

  init() {
    this.updateList();
  }

  // update list on changes
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

  // deletes all items from array
  deleteAllItems() {
    this.items = [];
    this.updateList();
  }

  // save items to localstorage
  saveList() {
    localStorage.setItem('todoList', JSON.stringify(this.items));
  }
}

// handles everything browser display related
class UI {
  constructor() {
    this.elements = {
      listContainer: document.querySelector('.itemList'),
    };
  }

  // displays ToDo Items in browser
  displayListItems(list) {
    const ul = this.elements.listContainer;
    ul.innerHTML = '';
    list.forEach((item, index) => {
      ul.innerHTML += `
      <li data-id="${index}" class="list-group-item">
        <span class="todo_item">${item}</span>
        <i class="fa fa-trash todo_delete" aria-hidden="true"></i>
      </li>
      `;
    });
    if (list.length > 0) {
      ul.innerHTML += `
      <button class="btn btn-danger todo_deleteAll">Delete all
        <i class="fa fa-trash " aria-hidden="true"></i>
      </li>`;
    }
  }
}


// handles all events
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
      } else if (e.target.classList.contains('todo_deleteAll')) {
        toDo.deleteAllItems();
      }
    });
  }
}

const ui = new UI();
const toDo = new ToDo();
const control = new Controller();
