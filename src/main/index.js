import "./style.css";
import "../styles/allPage.css"
import {addTodo, render, } from "../app/all-todos.js"

const allBtn = document.getElementById("all")

render();

allBtn.addEventListener("click", render)
