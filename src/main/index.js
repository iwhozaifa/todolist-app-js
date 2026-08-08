import "./style.css";
import "../styles/allPage.css";
import "../styles/card.css";
import { renderCompleted } from "../app/completedTodos.js";
import { addTodo, render } from "../app/all-todos.js";
import { showToday } from "../app/today.js";

const allBtn = document.getElementById("all");
const completedBtn = document.getElementById("completed");
const todayBtn = document.getElementById("today");

render();

allBtn.addEventListener("click", () => {
	allBtn.classList.add("isClicked");
	render();
});
completedBtn.addEventListener("click", () => {
	completedBtn.classList.add("isClicked");
	renderCompleted();
});
todayBtn.addEventListener("click", () => {
	todayBtn.classList.add("isClicked");
	showToday();
});
