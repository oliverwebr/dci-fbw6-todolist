
class toDoList {
	constructor () {
    this.db = JSON.parse(localStorage.getItem('item')) || [];
    this.db.state = this.db.state || false;
    		this.elements = {
			item: document.querySelectorAll(".list-group li"),
			submit: document.getElementById("itemSubmit"),
			close: document.querySelectorAll("btn btn-sm btn-danger"),
			input: document.getElementById("todo"),
			clear: document.getElementById("clearBtn"),
			print: document.querySelector(".printThisBtn")
		}
		this.init ()
	}

	init () {

		this.elements.submit.addEventListener("click", addListItem);
		function addListItem(e) {
			e.preventDefault();
		    let listItem = document.createElement("li");
		    listItem.classList += "list-group-item d-flex justify-content-between align-items-center list-sash";
		    listItem.innerHTML += document.getElementById("todo").value;
		    document.getElementById("toDoList").appendChild(listItem);

		    let btnClose = document.createElement("button");
			btnClose.classList.add("btn", "btn-sm", "btn-close");
			btnClose.innerHTML = `X`;
			listItem.appendChild(btnClose);

			btnClose.addEventListener("click", closeIt);
			function closeIt() {
				listItem.classList = "d-none";
			}


			//this.db.push({title : document.getElementById("todo").value, state: false});
			//localStorage.setItem("item", JSON.stringify(items));

			// Clear Input Field After Submission
			clearInput();
			} 
		
		

		// EventListener for clearing input field on click
		this.elements.input.addEventListener("click", clearInput);
		function clearInput(){
			document.getElementById("todo").value = "";
		}

		// EventListener for clearing list and localStorage
		this.elements.clear.addEventListener("click", clearAll);
		function clearAll() {
			localStorage.clear();
			window.location.reload();
		}

		// eventListener for calling Pring window
		this.elements.print.addEventListener("click", printList);
		function printList(){
			window.print();
		}
    	this.db = JSON.parse(localStorage.getItem('item')) || [];

		//localStorage.setItem("item", JSON.stringify( {item: this.db.item, state: this.db.state, total: this.db.total } ));
		//this.render();

		let displayedList = document.querySelector('ul');
		displayedList.addEventListener('click', function(ev) {
  			if (ev.target.tagName === 'LI') {
    		ev.target.classList.toggle('checked');
  			}
		});

	}

	}


var instanceOfClass = new toDoList();

