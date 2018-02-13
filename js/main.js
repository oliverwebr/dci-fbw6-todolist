class toDoList {
  constructor() {
      this.elements = {
        input: document.getElementById('todo'),
        button: document.querySelector('.btn-primary'),
        template: document.getElementById('template'),
        ulChild: document.querySelector(".list-group"),
      }
      this.resetEventListener()
    }
    resetEventListener() {
      this.elements.button.addEventListener('click', (e) => {
        e.preventDefault()
        var ttemp = this.elements.template
        var element = ttemp.cloneNode(true)
        element.removeAttribute("id")
        element.classList.remove('d-none')
        element.classList.add('d-flex')
        element.querySelector('.title').innerHTML = `${this.elements.input.value}`
        this.elements.ulChild.appendChild(element);
      })
    }
  }  
  var listToDoList = new toDoList()