const contentArea = document.getElementById("content")
let formCounter = 1;

export function render(){
  contentArea.innerHTML=`
  <div class="header" id="header">
  <h3>All Todos</h3>
  <button id="addBtn" class="btn addBtn fx-10"><span class="btn-label"><i class="fa fa-plus"></i> New Todo</span></button>
  </div>
  `
  addTodo();
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
  //submti dialog Listener
    dialog.querySelector(".dynamic-form").addEventListener("submit", (event)=>{
      event.preventDefault();

      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData.entries());

      createCard(data);

      event.target.reset();
      dialog.close();
    })
    
    dialog.showModal();
  formCounter++;

}

function createCard(data){
  const todoList = document.getElementById("content")
  const card = document.createElement("div")
  card.classList.add("listCard");

  card.innerHTML = `
  <h4>${data.title}</h4>
  <p>${data.description}</p>
  <button class="remove">Delete <i class="fa fa-trash"></i></button>
  `
  card.querySelector(".remove").addEventListener("click",()=>{
    card.remove();
  })

  todoList.appendChild(card);
}


contentArea.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove-btn')) {
    const formCard = event.target.closest('.form-card');
    formCard.remove();
  }
});

contentArea.addEventListener('submit', (event) => {
  if (event.target.classList.contains('dynamic-form')) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log('Submitted Data:', data);
  }
});
