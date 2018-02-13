

let liCounter = 0;

document.getElementById("addBtn").addEventListener('click', function(e){

    // btns in forms need preventDefault 
    e.preventDefault();
    
    let toDoList = document.getElementById("toDoInput");
    if(toDoList.value !== ""){
        
        liCounter++;
        $("#list").append("<li class='li"+liCounter+"' >"+toDoList.value+" "+liCounter+"</li>"+"<button class='btn btn-danger' id='removeBtn'>remove</button>");
        toDoList.value = "";
    }

    

});

document.getElementById("removeBtn").addEventListener('click', function(e){

    // btns in forms need preventDefault 
    e.preventDefault();
  //  let list = document.getElementById("list");
       if (liCounter !== 0) {
           let oldLi = document.getElementsByClassName('li'+liCounter);
           console.log(oldLi);
          // oldLi.remove();
           liCounter--;
       }

});

document.getElementById("removeBtn").addEventListener('click', function(e){

    // btns in forms need preventDefault 
    e.preventDefault();
  let list = document.getElementById("list");
  list.innerHTML = "";
  liCounter = 0;

});

//


