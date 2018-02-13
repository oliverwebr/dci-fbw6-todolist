class createTask {
	constructor()	 {
		this.elements = {
			text: document.getElementById("textarea"),
			button: document.querySelector("button"),
			// task: document.querySelector("li"),
      goal: document.getElementById("new_list"),
			template: document.getElementById("new_list_element")
		}
		this.resetEventListener();
	}

   resetEventListener() {
    this.elements.button.addEventListener('click', (e)=>{
      e.preventDefault()

      var template = this.elements.template;
      var template_clone = template.cloneNode(true);
      // remove the id, 'cos id may not be used twice
      template_clone.removeAttribute("id");
      //remove class d-none to make the clone visible
      template_clone.classList.remove("d-none");
      template_clone.innerHTML = this.elements.text.value;
      this.elements.goal.appendChild(template_clone);
      this.elements.text.value = "";
    })
  }
}

var newTask = new createTask();