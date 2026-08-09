import {
	getActiveTodos,
	loadFromLocalStorage,
	saveToLocalStorage,
	todos,
	toggleTodo,
} from "./completed.js";
import { createForm } from "./form.js";

const contentArea = document.getElementById("content");

export function render() {
	contentArea.innerHTML = `
  <div class="header" id="header">
  <h3>All Todos</h3>
  <button id="addBtn" class="btn addBtn fx-10"><span class="btn-label"><i class="fa fa-plus"></i> New Todo</span></button>
  </div>
  `;

	let cardContainer = document.querySelector(".cardContainer");

	if (!cardContainer) {
		cardContainer = document.createElement("div");
		cardContainer.classList.add("cardContainer");
	} else {
		cardContainer.innerHTML = "";
	}
	addTodo();
	//Function form completed.js
	loadFromLocalStorage();
	//Variable from completed.js
	const activeTodos = getActiveTodos();

	activeTodos.forEach((item) => createCard(item));
}

export function addTodo() {
	const addBtn = document.getElementById("addBtn");

	if (addBtn) {
		addBtn.addEventListener("click", createForm);
	}
}

export function createCard(data, _container) {
	const cardContainer = document.createElement("div");
	cardContainer.classList.add("cardContainer");

	if (cardContainer.querySelector(`[data-id="${data.id}"]`)) {
		return;
	}

	const card = document.createElement("div");
	card.classList.add("listCard");
	card.setAttribute("data-id", data.id);
	data.completed = false;

	card.innerHTML = `
  <input type="checkbox" id="checkbox" class="checkbox">
  <h4>${data.title}</h4>
  <p>${data.description}</p>
  <p>${data.date}</p>
  <button class="remove addBtn fx-10" ><span class="btn-label"><i class="fa-solid fa-trash"></i></span></button>
  `;
	card.querySelector(".checkbox").addEventListener("change", () => {
		console.log("after toggling checkbox:", data);
		toggleTodo(data.id);
		render();
	});

	card.querySelector(".remove").addEventListener("click", () => {
		const index = todos.findIndex((item) => item.id === data.id);
		if (index !== -1) {
			todos.splice(index, 1);
			saveToLocalStorage();
		}
		card.remove();
	});
	cardContainer.appendChild(card);
	contentArea.appendChild(cardContainer);
}
