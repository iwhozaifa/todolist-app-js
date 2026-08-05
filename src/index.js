import "./style.css";
import "./allPage.css"
import {addTodo, render, } from "./all-todos.js"

const allBtn = document.getElementById("all")

render();

allBtn.addEventListener("click", render)
