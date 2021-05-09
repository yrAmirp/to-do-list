const addTaskBtn = document.querySelector(".to-do-list__add-button");
const taskInput = document.querySelector(".to-do-list__task-input");
const listTask = document.querySelector(".to-do-list__tasks");
let tasks = [];
let todoItemElems = [];

if (!localStorage.getItem("tasks")) {
  tasks = [];
} else {
  tasks = JSON.parse(localStorage.getItem("tasks"));
}
fillHTMLTasksList();

function updateLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function Task(description) {
  this.description = description;
  this.completed = false;
}

function createTemplate(item, index) {
  return ` <div class="to-do-item ${item.completed ? "checked" : ""}">
    <div class="description">${item.description}</div>
    <div class="buttons">
     
      <input onclick="completeTask(${index})" type="checkbox" class="btn-complete" ${
    item.completed ? "checked" : ""
  }/>
      <button onclick="deleteTask(${index})"class="btn-delete">Удалить</button>
    </div>
  </div>`;
}

function fillHTMLTasksList() {
  listTask.innerHTML = "";
  if (tasks.length) {
    filterTasks();
    tasks.forEach((elem, index) => {
      listTask.innerHTML += createTemplate(elem, index);
    });
    todoItemElems = document.querySelectorAll(".to-do-item");
  }
}

function filterTasks() {
  const activeTasks =
    tasks.length && tasks.filter((item) => item.completed == false);
  const completedTasks =
    tasks.length && tasks.filter((item) => item.completed == true);
  tasks = [...activeTasks, ...completedTasks];
}

function completeTask(index) {
  tasks[index].completed = !tasks[index].completed;
  if (tasks[index].completed) {
    todoItemElems[index].classList.add("checked");
  } else {
    todoItemElems[index].classList.remove("checked");
  }
  updateLocalStorage();
  fillHTMLTasksList();
}

function deleteTask(index) {
  todoItemElems[index].classList.add("delition");
  setTimeout(() => {
    tasks.splice(index, 1);
    updateLocalStorage();
    fillHTMLTasksList();
  }, 500);
}

addTaskBtn.addEventListener("click", () => {
  tasks.push(new Task(taskInput.value));
  updateLocalStorage();
  fillHTMLTasksList();
  taskInput.value = "";
});
