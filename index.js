class Todo {
  constructor () {
    this.db = JSON.parse( localStorage.getItem('todos') ) || [];
    this.elements = {
      list: document.querySelector('ul.list-group'),
      template: document.getElementById('template'),
      input: document.getElementById('input'),
      button: document.querySelector('button')
    }
    this.formEventListener()
    this.render()
  }
  formEventListener() {
    this.elements.button.addEventListener('click', (e)=>{
      e.preventDefault(); 
      this.updateCart(this.elements.input.value)
    })
  }
  findItemKey(itemName){
    for (let i = 0; i < this.db.length; i++){
      if (this.db[i].title == itemName){
        return i
      }
    }
  }
  updateCart(item, remove = false){
    let itemKey = this.findItemKey(item)
    console.log(this.db)
    console.log(itemKey)
    if(itemKey === undefined) {
      this.db.push({title: this.elements.input.value, state: false})
    } else {
      console.log("item already there")
    }

    localStorage.setItem("todos", JSON.stringify( this.db ))
    this.render()
  }
  render(){
    var card = this.elements.template
    var container = document.createElement("ul")
    for (var item in this.db ) {
      var element = card.cloneNode(true);
      element.removeAttribute("id");
      element.classList.add("d-flex")
      element.classList.remove("d-none")

      element.querySelector('.title').innerHTML = this.db[item].title
      container.appendChild(element);
    }
    this.elements.list.innerHTML = container.innerHTML;

  }

}
var instaceOfTodo = new Todo();

