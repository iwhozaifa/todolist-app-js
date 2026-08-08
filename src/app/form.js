import { todos, saveToLocalStorage } from "./completed.js";
import { createCard } from "./all-todos.js";

export function createForm() {
	let dialog = document.getElementById("todoDialog");

	if (!dialog) {
		dialog = document.createElement("dialog");
		dialog.id = "todoDialog";
		dialog.classList.add("todo-modal");
	}

	dialog.innerHTML = `
    <form class="dynamic-form">
      
      <h3>New Todo</h3>
      <div class="formName">
        <label for="title">Title</label>
        <input type="text" id="title" name="title" required ">
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
	dialog.querySelector(".remove-btn").addEventListener("click", () => {
		dialog.close();
	});
	//submit dialog Listener
	dialog.querySelector(".dynamic-form").addEventListener("submit", (event) => {
		event.preventDefault();

		const formData = new FormData(event.target);
		const data = Object.fromEntries(formData.entries());

		//Add Unique ID to each item created
		data.id = Date.now().toString();
		//Variable from completed
		todos.push(data);
		//Function from completed
		saveToLocalStorage();
		//Function from all-todos
		createCard(data);

		event.target.reset();

		dialog.close();
	});

	dialog.showModal();
}
