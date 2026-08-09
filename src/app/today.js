import { createCard } from "./all-todos.js";
import { getActiveTodos, loadFromLocalStorage } from "./completed.js";

const contentArea = document.getElementById("content");

export function showToday() {
	loadFromLocalStorage();

	contentArea.innerHTML = `
  <div class="header">
    <h3>Today's Todos</h3>
  </div>
  `;
	let cardContainer = document.querySelector(".cardContainer");
	if (!cardContainer) {
		cardContainer = document.createElement("div");
		cardContainer.classList.add("cardContainer");
		contentArea.appendChild(cardContainer);
	}

	const todayTasks = returnFilteredTodos();

	todayTasks.forEach((element) => {
		createCard(element, cardContainer);
	});
}

function returnFilteredTodos() {
	let activeTodos = getActiveTodos();
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, "0");
	const day = String(today.getDate()).padStart(2, "0");

	const formattedDate = `${year}-${month}-${day}`;
	activeTodos = activeTodos.filter((item) => item.date === formattedDate);

	console.log("active todays tasks:", activeTodos);

	return activeTodos;
}
