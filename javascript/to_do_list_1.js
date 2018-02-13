class createTask {
	constructor()	   {
		this.elements =  {
			text: document.getElementById("textarea"),
			button: document.querySelector("button"),
			task: document.querySelector("li"),
			goal: document.getElementById("new_list")
		}
		this.createNewTask();
	}

	createNewTask() {
		this.elements.button.addEventListener("click", (e) => {
		e.preventDefault(); //prevent the browser from reloading the page
		var list = document.createElement("li");
		list.classList += "list-group-item"; //create a new class for list
		list.innerHTML = this.elements.text.value;
		this.elements.goal.appendChild(list);
		this.elements.text.value = "";
		});
	}
	
}

var newTask = new createTask();