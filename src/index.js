'use strict';

class toDo {
	constructor() {
		this.db = JSON.parse( localStorage.getItem('todolist') ) || [];
		this.elements = {
			submit : document.querySelector('.btn-primary'),
			input : document.querySelector('.form-control'),
			target : document.getElementById('target'),
			items: document.querySelectorAll("li"),
			template : document.getElementById('template')
		},
		this.render()
		this.submitEventListener()
		
	}
	submitEventListener() {
		this.elements.submit.addEventListener('click', (e)=>{
			e.preventDefault();
			var found = this.findItemKey(this.elements.input.value)
			
			if(found === undefined) {
				this.db.push({title: this.elements.input.value, state: false})
				localStorage.setItem("todolist", JSON.stringify(this.db))
				this.render()
			} else {
				alert("Item already there")
			}
		})
	}
	findItemKey(itemName){
    for (let i = 0; i < this.db.length; i++){
      if (this.db[i].title == itemName){
        return i
      } 
        
    }
  }
  	render() {
  		var template = this.elements.template;
		var wrapper = document.createElement("div")	 
  		for (let i = 0; i < this.db.length; i++){
			var template_clone = template.cloneNode(true);
			template_clone.removeAttribute('id');
			template_clone.classList.remove('d-none');
			template_clone.innerHTML = this.db[i].title;
			wrapper.appendChild(template_clone);
			this.elements.input.value = "";
	        
	    }
	    this.elements.target.innerHTML = wrapper.innerHTML
  	}

}
var instaceOfCart = new toDo();

