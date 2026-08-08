import "./style.css";
import "../styles/allPage.css"
import "../styles/card.css"
import {renderCompleted} from "../app/completedTodos.js"
import {addTodo, render, } from "../app/all-todos.js"

const allBtn = document.getElementById("all")
const completedBtn = document.getElementById("completed")

render();

allBtn.addEventListener("click", render);
completedBtn.addEventListener("click",renderCompleted);
