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
		this.submitEventListener()
		console.log(this.db);
	}
	submitEventListener() {
		this.elements.submit.addEventListener('click', (e)=>{
			e.preventDefault();
			var found = this.findItemKey(this.elements.input.value)
			console.log(found)
			console.log(this.db)
			if(found === undefined) {
				var template = this.elements.template;
				var template_clone = template.cloneNode(true);
				template_clone.removeAttribute('id');
				template_clone.classList.remove('d-none');
				template_clone.innerHTML = this.elements.input.value;
				this.elements.target.appendChild(template_clone);
				this.db.push({title: this.elements.input.value, state: false})
				localStorage.setItem("todolist", JSON.stringify(this.db))
				this.elements.input.value = "";
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
// updateList(item, remove = false){
//     let itemKey = this.findItemKey(item)
//     if(remove){
//       if(this.db.items[itemKey].count > 1){
//         this.db.items[itemKey].count--
//       }else{
//         this.db.items.shift(itemKey)
//       }
//     } else {
//       if(itemKey !== undefined){
//         this.db.items[itemKey].count++
//       } else {
//         this.db.items.push({title: this.db.items, state: false, count: 1})
//       }
//     }
// }


}
var instaceOfCart = new toDo();

