class Todo {
 constructor () {
   this.elements = {
     input: document.getElementById('todo'),
     target: document.getElementById('target'),
     button: document.getElementById('btn'),
     template: document.getElementById('template')
   }
   this.formEventListener()

 }
  formEventListener() {
   this.elements.button.addEventListener('click', (e)=>{
     e.preventDefault()
     var template = this.elements.template;
     var template_clone = template.cloneNode(true);
     template_clone.removeAttribute("id");
     template_clone.classList.remove("d-none");
     template_clone.innerHTML = this.elements.input.value;
     this.elements.target.appendChild(template_clone);

   })
 }

}
var instaceOfCart = new Todo();