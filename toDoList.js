const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

addButton.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const taskItem = document.createElement("li");
  taskItem.innerHTML = `
    <input type="checkbox">
    <span>${taskText}</span>
    <button>Delete</button>
  `;

  const deleteButton = taskItem.querySelector("button");
  deleteButton.addEventListener("click", () => {
    taskItem.remove();
  });

  taskList.appendChild(taskItem);
  taskInput.value = "";
}
