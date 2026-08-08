export let todos = [];

//Helper Function to Save current State to local Storage 
export function saveToLocalStorage(){
  localStorage.setItem("todos", JSON.stringify(todos));
}

//Helper function to load todos from Local Storage
export function loadFromLocalStorage(){
  try {
    const saved = localStorage.getItem("todos");
    todos = saved? JSON.parse(saved) : [];
    return todos;
  } 
  catch (e) {
    console.log(e);
    todos = [];
    return [];
  }
}

export function getCompletedTodos(){
  return todos.filter((item) => item.completed)
}

export function getActiveTodos(){
  return todos.filter((todo)=> !todo.completed);
}

export function toggleTodo(id){
  todos = todos.map((todo) => {
    if (todo.id === id) {
      return { ...todo, completed: !todo.completed};
    }
    return todo;
  })
  saveToLocalStorage();
}
