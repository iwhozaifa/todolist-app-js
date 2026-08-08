import { getCompletedTodos, toggleTodo  } from "./completed.js";
import { cardContainer } from "./all-todos.js"

const contentArea = document.getElementById("content");

export function renderCompleted(){
  contentArea.innerHTML=``
  contentArea.innerHTML=`
  <div class="header">
  <h3>Completed Todos</h3>
  </div>
  `
//Holds the Todo List from memeory
  const completedList = getCompletedTodos();

if (completedList.length === 0) {
  contentArea.innerHTML += `
  <div class="cardContainer">
    <p>No Completed Tasks Yet</p>
  </div>`
  return
}
  completedList.forEach((todo) => {
    const card = document.createElement("div")
    card.classList.add("listCard", "completed")

    card.innerHTML = `
    <input type="checkbox" id="checkbox" checked class="checkbox">
    <h4>${data.title}</h4>
    <p>${data.description}</p>
    <p>${data.date}</p>
    `

    card.querySelector(".checkbox").addEventListener("change",()=>{
      toggleTodo(todo.id);
      renderCompleted();
    })
  })
  
  cardContainer.appendChild(card);
  contentArea.appendChild(cardContainer);

}
