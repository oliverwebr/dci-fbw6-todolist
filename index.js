'use strict';

class toDo {
	constructor() {
		this.elements = {
			submit : document.querySelector('.btn-primary'),
			input : document.querySelector('.form-control'),
			target : document.getElementById('target'),
			template : document.getElementById('template')
		},
		this.submitEventListener()
	}
	submitEventListener() {
		this.elements.submit.addEventListener('click', (e)=>{
			e.preventDefault();
			var template = this.elements.template;
			var template_clone = template.cloneNode(true);
			template_clone.removeAttribute('id');
			template_clone.classList.remove('d-none');
			template_clone.innerHTML = this.elements.input.value;
			this.elements.target.appendChild(template_clone);

		})
	}
}


var instaceOfCart = new toDo();
