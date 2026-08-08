import {todos ,saveToLocalStorage, loadFromLocalStorage, getTodos, getCompletedTodos, getActiveTodo, toggleTodo} from "./completed.js"
import { createForm } from "./form.js"

const contentArea = document.getElementById("content")

export function render(){
  contentArea.innerHTML=`
  <div class="header" id="header">
  <h3>All Todos</h3>
  <button id="addBtn" class="btn addBtn fx-10"><span class="btn-label"><i class="fa fa-plus"></i> New Todo</span></button>
  </div>
  `
  addTodo();
  //Function form completed.js
  loadFromLocalStorage();
  //Variable from completed.js
  todos.forEach(item => createCard(item));
}

export function addTodo(){
  const addBtn = document.getElementById("addBtn")

  if (addBtn) {
  addBtn.addEventListener("click", createForm);
  }

}

export const cardContainer = document.createElement("div")
  cardContainer.classList.add("cardContainer")

export function createCard(data){
  const todoList = document.getElementById("content")
  const card = document.createElement("div")
  card.classList.add("listCard");
  card.setAttribute("data-id",data.id);

  card.innerHTML = `
  <input type="checkbox" id="checkbox" class="checkbox">
  <h4>${data.title}</h4>
  <p>${data.description}</p>
  <p>${data.date}</p>
  <button class="remove addBtn fx-10" ><span class="btn-label"><i class="fa-solid fa-trash"></i></span></button>
  `
  card.querySelector(".checkbox").addEventListener("change", () =>{
    toggleTodo(data.id);
    card.remove();
    render();
  })
  card.querySelector(".remove").addEventListener("click",()=>{
    const index = todos.findIndex((item) => item.id !== data.id);
    if (index !== -1) {
      todos.splice(index,1);
      saveToLocalStorage()      
    }
    card.remove();

  })
  cardContainer.appendChild(card)
  todoList.appendChild(cardContainer);
}
