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
    // when you click the title of a todo it turns into a input field
    // this can be edited and when you tab out of the field the BLUR event triggers on this input
    document.addEventListener("blur", (e) => {
      if(e.target.classList.contains('title'))
        // I trigger the update cart method. This time I give the unchanged item name to the method and let the method it self handle the update. LINE 50
        this.updateCart(e.target.parentElement.dataset.name, false, false, true)
    }, true);
    document.addEventListener('click', (e)=>{
      if(e.target && e.target.classList.contains( 'btn-outline-danger' )){
        let itemKey = this.findItemKey(e.target.parentElement.dataset.name)
        this.updateCart(e.target.parentElement.dataset.name, true)
      } else if(e.target.classList.contains( 'checkbutton' )){
        let itemKey = this.findItemKey(e.target.parentElement.dataset.name)
        this.updateCart(e.target.parentElement.dataset.name, false, true)
      }
    })
  }
  formEventListener() {
    this.elements.button.addEventListener('click', (e)=>{
      e.preventDefault();
      this.updateCart(this.elements.input.value)
      this.elements.input.value = ""
    })
  }
  // find item in the db that has the same name as passed and returns its index
  findItemKey(itemName){
    for (let i = 0; i < this.db.length; i++){
      // to lowercase because "Milk" would not match with "milk"
      if (this.db[i].title.toLowerCase() == itemName.toLowerCase()){
        return i
      }
    }
  }
  // method can be run with different options. Depending on their state I update/delete/check items
  updateCart(item, remove = false, check = false, change = false){
    let itemKey = this.findItemKey(item)

    if ( change ) {
      // this should actually come in the render method but Im going to holiday tomorrow
      this.db[this.findItemKey(event.target.parentElement.dataset.name)].title = event.target.innerHTML
    }
    else if ( check ) {
      this.db[itemKey].state = !this.db[itemKey].state
    }
    else if(remove) {
      this.db.splice(itemKey, 1)
    } else{
      if(itemKey === undefined) {
        this.db.push({title: this.elements.input.value, state: false})
      } else {
        alert("Item already there")
      }
    }
    // sorts the db by done/todo
    this.db = this.db.sort(function(x, y) {
        return (x.state === y.state)? 0 : x.state? 1 : -1;
    });
    localStorage.setItem("todos", JSON.stringify( this.db ))
    this.render()
  }
  render(){
    var card = this.elements.template
    var container = document.createElement("ul")
    // here jumps in the query parameter depending on that I filter my db
    var local_db = this.db;
    if(window.location.search.substr(1) === "state=false"){
      local_db = this.db.filter((i) => !i.state)
    } else if (window.location.search.substr(1) === "state=true") {
      local_db = this.db.filter((i) => i.state)
    }

    // actuall rendering
    for (var item in local_db ) {
      var element = card.cloneNode(true);
      element.removeAttribute("id");
      element.classList.add("d-flex")
      element.classList.remove("d-none")
      // if my element is marked as done I change the layout of the <li>
      if(local_db[item].state) {
        element.classList.add("list-group-item-light");
        element.querySelector('.checkbutton').innerHTML = "todo"
        element.querySelector('.checkbutton').classList.remove('btn-outline-success')
        element.querySelector('.checkbutton').classList.add('btn-success')
      }
      element.querySelector('.btn-outline-danger').parentElement.dataset.name = local_db[item].title

      element.querySelector('.title').innerHTML = local_db[item].title
      container.appendChild(element);
    }
    this.elements.list.innerHTML = container.innerHTML;

  }

}
var instaceOfTodo = new Todo();

