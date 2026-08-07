const contentArea = document.getElementById("content")
let formCounter = 1;
//Array to hold the items in memory
let todos = [];

//Helper Function to Save current State to local Storage 
function saveToLocalStorage(){

  localStorage.setItem("todos", JSON.stringify(todos));
}
//Helper function to load todos from Local Storage
function loadFromLocalStorage(){
  try {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  } 
  catch (e) {
    console.log(e);
    return [];
  }
}

export function render(){
  contentArea.innerHTML=`
  <div class="header" id="header">
  <h3>All Todos</h3>
  <button id="addBtn" class="btn addBtn fx-10"><span class="btn-label"><i class="fa fa-plus"></i> New Todo</span></button>
  </div>
  `
  addTodo();

  //Rendering Previously Saved todos
  todos = loadFromLocalStorage();
  todos.forEach(item => createCard(item));
}

export function addTodo(){
  const addBtn = document.getElementById("addBtn")
  
  if (addBtn) {
  addBtn.addEventListener("click", createForm);
  }

}


function createForm(){
    let dialog = document.getElementById("todoDialog")

    if(!dialog){
      dialog = document.createElement("dialog");
      dialog.id = "todoDialog"
      dialog.classList.add("todo-modal")
    }

    dialog.innerHTML = `
    <form class="dynamic-form">
      
      <h3>New Todo</h3>
      <div class="formName">
      <label for="title-${formCounter}">Title</label>
      <input type="text" id="title-${formCounter}" name="title" required ">
      </div>
      <div class="formDesc">
      <label for="desc">Description</label>
      <textarea id="desc" name="description" rows="5"></textarea>
      </div>
      <div class="formDate">
      <label for="date">Due Date</label>
      <input type="date" id="date" name="date">
      <div class="formBtns">
              <button type="submit" class="submitBtn addBtn fx-10"><span class="btn-label">Submit</span></button>
        <button type="button" class="remove-btn addBtn fx-10"><span class="btn-label">Remove</span></button>
      </div>
    </form>
  `;
      document.body.appendChild(dialog);
    
  //Close Dialog Listener
  dialog.querySelector(".remove-btn").addEventListener("click", ()=>{
    dialog.close();
    });
  //submit dialog Listener
    dialog.querySelector(".dynamic-form").addEventListener("submit", (event)=>{
      event.preventDefault();

      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData.entries());
      
      //Add Unique ID to each item created
      data.id = Date.now().toString();
      todos.push(data);
      saveToLocalStorage();

      createCard(data);

      event.target.reset();
      dialog.close();
    })
    
    dialog.showModal();

}
  
const cardContainer = document.createElement("div")
  cardContainer.classList.add("cardContainer")

function createCard(data){
  const todoList = document.getElementById("content")
  const card = document.createElement("div")
  card.classList.add("listCard");

  card.innerHTML = `
  <h4>${data.title}</h4>
  <p>${data.description}</p>
  <p>${data.date}</p>
  <button class="remove addBtn fx-10" ><span class="btn-label"><i class="fa-solid fa-trash"></i></span></button>
  `
  card.querySelector(".remove").addEventListener("click",()=>{
    todos = todos.filter((item) => item.id !== data.id);
    saveToLocalStorage();
    card.remove();

  })
  cardContainer.appendChild(card)
  todoList.appendChild(cardContainer);
}

