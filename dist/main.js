!function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";new class{constructor(){this.db=JSON.parse(localStorage.getItem("todolist"))||[],this.elements={submit:document.querySelector(".btn-primary"),input:document.querySelector(".form-control"),target:document.getElementById("target"),items:document.querySelectorAll("li"),template:document.getElementById("template")},this.render(),this.submitEventListener()}submitEventListener(){this.elements.submit.addEventListener("click",e=>{e.preventDefault(),void 0===this.findItemKey(this.elements.input.value)?(this.db.push({title:this.elements.input.value,state:!1}),localStorage.setItem("todolist",JSON.stringify(this.db)),this.render()):alert("Item already there")})}findItemKey(e){for(let t=0;t<this.db.length;t++)if(this.db[t].title==e)return t}render(){var e=this.elements.template,t=document.createElement("div");for(let r=0;r<this.db.length;r++){var n=e.cloneNode(!0);n.removeAttribute("id"),n.classList.remove("d-none"),n.innerHTML=this.db[r].title,t.appendChild(n),this.elements.input.value=""}this.elements.target.innerHTML=t.innerHTML}}}]);