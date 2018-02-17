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
    }
    resetEventListener() {
      this.elements.button.addEventListener('click', (e) => {
        e.preventDefault()
        var ttemp = this.elements.template
        var element = ttemp.cloneNode(true)
        element.removeAttribute('id')
        element.classList.remove('d-none')
        element.classList.add('d-flex')

        /* here we grab the cloned element in this case the li and this we grab the span in side this li by the id then we use the property innerHTML to the value of the input above          
        */
        element.querySelector('.title').innerHTML = `${this.elements.input.value}`

        /* here we have a loop function for the input arry by passing the value of the input to the function and we set this function to a var   
        */
        var found = this.findItemKey(this.elements.input.value)
        // so here we ask if this value not there? other question is undifund a js keyword it tried to change it to false i thought it gives the same meaning but it didn't work
        if (found === undefined){
          // and here you grab the embty array from above and u push inside it.
        this.db.push({title: this.elements.input.value})
        // but here I didnt get it. You say 'hey befor you push creat a new local storage and name it todos and for sure to save date insde a local storage it should be a string. but why did u pass this.db from line 4 and not found? actully i tried to pass found var but it gave me undifund in the local storage  
        localStorage.setItem('todos', JSON.stringify(this.db))
        this.elements.ulChild.appendChild(element);
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
  }  
  var listToDoList = new toDoList()