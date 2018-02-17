class toDoList {
  constructor() {
    // so you get the element here from the local storage and you change it to an object. but the creation happened when u push the valiue from button in line 35  
    this.db = JSON.parse(localStorage.getItem('todos')) || [] 
    this.elements = {
      input: document.getElementById('todo'),
      button: document.querySelector('.btn-primary'),
      template: document.getElementById('template'),
      ulChild: document.querySelector(".list-group"),
    }
    this.resetEventListener()
    this.removeItem()
    this.render()
  }
  resetEventListener() {
    this.elements.button.addEventListener('click', (e) => {
      e.preventDefault()
      var found = this.findItemKey(this.elements.input.value)
      if (found === undefined){
        this.db.push({title: this.elements.input.value})
        this.render()
        localStorage.setItem('todos', JSON.stringify(this.db))
      } else if (found !== undefined){ 
        alert('Item Is already Found')
      }
    })
  } 

  findItemKey(itemName) {
    for (let i = 0; i < this.db.length; i++) {
      if (this.db[i].title == itemName) {
        return i
      }
    }
  }
  removeItem() {
    document.addEventListener('click', (e) => {
      if (e.target && e.target.classList.contains('btn-outline-danger')) {
        var elementToRemove = this.findItemKey(e.target.parentElement.querySelector('.title').innerHTML)
        // could u give me a hint for how delete and item from local storage, bitte? :) 
        this.db.splice('todos', 2)
        e.target.parentElement.remove()
      }
    })
  }  
  render(){
    var container = document.createElement('div');
    this.db.forEach((item) =>{
      var ttemp = this.elements.template
      var element = ttemp.cloneNode(true)
      element.removeAttribute('id')
      element.classList.remove('d-none')
      element.classList.add('d-flex')
      element.querySelector('.title').innerHTML = `${item.title}`
      container.appendChild(element);
    })
    this.elements.ulChild.innerHTML = container.innerHTML;
  }

}  
var listToDoList = new toDoList()
