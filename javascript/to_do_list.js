class createTask {
    constructor() {
        // this.db = JSON.parse(localStorage.getItem("keep_element")) || [];
        this.elements = {
            text: document.getElementById("textarea"),
            button: document.querySelector(".btn"),
            clear: document.querySelector("#clear"),
            goal: document.getElementById("new_list"),
            template: document.getElementById("new_list_element")
        }
        this.createNewTask();
        // clear button for items which will be created later
        document.addEventListener('click', (e) => {
            e.preventDefault();
            if (e.target.classList.contains("btn-outline-danger")) {
                console.log(e.target);
                e.target.parentElement.remove();
            }
        })
    }

    createNewTask() {
        this.elements.button.addEventListener('click', (e) => {
            e.preventDefault();
            // Save task to localStorage

            if (this.elements.text.value != "") {
                var template_clone = this.elements.template.cloneNode(true);

                // remove the id, 'cos id may not be used twice
                template_clone.removeAttribute("id");

                //remove class d-none to make the clone visible
                template_clone.classList.remove("d-none");
                template_clone.classList.add("d-flex", "justify-content-between");
                template_clone.querySelector(".title").innerHTML = this.elements.text.value;

                this.elements.goal.appendChild(template_clone);
                // this.elements.clear.classList.remove("d-none");
            } else if (this.elements.text.value == "") {
                alert("You forgot your text, homie!");
            }

            this.elements.text.value = "";
        })
    }
}
var newTask = new createTask();