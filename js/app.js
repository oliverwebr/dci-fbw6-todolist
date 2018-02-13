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
    if (!this.checkDuplicates(itemToAdd)) {
      const item = {
        toDoText: itemToAdd,
        important: false
      };
      this.items.push(item);
      this.updateList();
      ui.displaySuccess('add', itemToAdd);
    } else {
      // throws error if item is a duplicate
      ui.displayError('duplicate', itemToAdd);
    }
  }

  // checks for duplicate entries
  checkDuplicates(itemText) {
    return this.items.some(item => itemText.toLowerCase() === item.toDoText.toLowerCase());
  }

  // delete item from array
  deleteItem(itemIndex) {
    ui.displaySuccess('delete', this.items[itemIndex].toDoText);
    this.items.splice(itemIndex, 1);
    this.updateList();
  }

  // deletes all items from array
  deleteAllItems() {
    this.items = [];
    this.updateList();
    ui.displaySuccess('deleteAll');
  }

  // marks item as important
  flagImportant(id) {
    this.items[id].important = !this.items[id].important;
    this.updateList();
  }

  // save items to localstorage
  saveList() {
    localStorage.setItem('todoList', JSON.stringify(this.items));
  }

  // updates the array & storage with the edited ToDo text
  saveEditedText(index, text) {
    this.items[index].toDoText = text;
    this.updateList();
  }
}

// handles everything browser display related
class UI {
  constructor() {
    this.elements = {
      listContainer: document.querySelector('.itemList'),
      errorDiv: document.querySelector('#errordiv')
    };
  }

  // displays ToDo Items in browser
  displayListItems(list) {
    const ul = this.elements.listContainer;
    ul.innerHTML = '';
    list.forEach((item, index) => {
      // checks if list item should be displayed as important
      const important = item.important ? 'list-group-item-primary' : '';
      // creates list item
      ul.innerHTML += `
      <li data-id='${index}' class="list-group-item ${important}">
        <span class="todo_item">${item.toDoText}</span>
        <span>
          <i class="fa fa-pencil todo_edit" aria-hidden="true"></i>
          <i class="fa fa-trash todo_delete" aria-hidden="true"></i>
        </span>
      </li>
      `;
    });
    // displays delete-all Button only if there are list items present
    if (list.length > 0) {
      ul.innerHTML += `
      <button class="btn btn-danger todo_deleteAll">Delete all
        <i class="fa fa-trash " aria-hidden="true"></i>
      </li>`;
    }
  }

  // makes item ToDo text editable
  editText(id) {
    const li = this.elements.listContainer.querySelector(`[data-id='${id}']`);
    const todoText = li.querySelector('.todo_item');
    if (todoText.contentEditable !== 'true') {
      todoText.contentEditable = 'true';
      todoText.style.backgroundColor = 'green';
      todoText.style.color = 'white';
      li.querySelector('.fa-pencil').classList = 'fa fa-check-circle todo_edit';
    } else {
      todoText.contentEditable = 'false';
      todoText.style.backgroundColor = 'inherit';
      todoText.style.color = 'inherit';
      li.querySelector('.fa-check-circle').classList = 'fa fa-pencil todo_edit';
      toDo.saveEditedText(id, li.innerText);
    }
  }

  // displays item as important
  toggleImportant(id) {
    const li = this.elements.listContainer.querySelector(`[data-id='${id}']`);
    li.classList.toggle('list-group-item-primary');
  }

  // displays various error msg. Expects type of error as first parameter
  displayError(errorMsg, item = '') {
    const errorDiv = document.createElement('div');
    errorDiv.classList = 'alert alert-danger col-4';
    if (errorMsg === 'duplicate') errorDiv.innerHTML = `${item} is already in your list!`;
    if (errorMsg === 'empty') errorDiv.innerHTML = 'Doing nothing doesn\'t count!';
    this.elements.errorDiv.appendChild(errorDiv);
    setTimeout(() => {
      errorDiv.remove();
    }, 2500);
  }

  // TODO: combine displayError() and displaySuccess() into one method
  displaySuccess(successMsg, item = '') {
    const errorDiv = document.createElement('div');
    errorDiv.classList = 'alert alert-success col-4';
    if (successMsg === 'add') errorDiv.innerHTML = `${item} successfully added to list!`;
    if (successMsg === 'delete') errorDiv.innerHTML = `${item} successfully deleted from list!`;
    if (successMsg === 'deleteAll') errorDiv.innerHTML = 'Whole list successfully deleted!';
    this.elements.errorDiv.appendChild(errorDiv);
    setTimeout(() => {
      errorDiv.remove();
    }, 2500);
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
    Controller.itemListener();
  }

  // listens to clicks on Add ToDo Button
  static addToDoListener() {
    const addBtn = document.querySelector('#addToDoBtn');
    const input = document.querySelector('#toDoInput');
    addBtn.addEventListener('click', () => {
      if (input.value) {
        toDo.addItem(input.value);
        input.value = '';
      } else ui.displayError('empty');
    });
  }

  // listens to clicks on delete todo button
  static delToDoListener() {
    ui.elements.listContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('todo_delete')) {
        toDo.deleteItem(e.target.parentElement.parentElement.dataset.id);
      } else if (e.target.classList.contains('todo_deleteAll')) {
        toDo.deleteAllItems();
      } else if (e.target.classList.contains('todo_edit')) {
        ui.editText(e.target.parentElement.parentElement.dataset.id);
      }
    });
  }

  // listens to clicks in li items
  static itemListener() {
    ui.elements.listContainer.addEventListener('click', (e) => {
      if (e.target.nodeName === 'LI') {
        ui.toggleImportant(e.target.dataset.id);
        toDo.flagImportant(e.target.dataset.id);
      }
    });
  }
}

const ui = new UI();
const toDo = new ToDo();
const control = new Controller();
