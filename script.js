document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
  loadTheme();
  loadFont();

  document.getElementById("themeToggle").addEventListener("change", toggleDarkMode);
  document.getElementById("bgSelector").addEventListener("change", setTheme);
  document.getElementById("fontSelector").addEventListener("change", setFont);
});

function addTask() {
  const input = document.getElementById("taskInput");
  const task = input.value.trim();

  if (task === "") {
    alert("Enter a task!");
    return;
  }

  createTaskElement(task);
  saveTask(task);
  input.value = "";
}

function createTaskElement(task) {
  const li = document.createElement("li");
  li.innerHTML = `
    <span>${task}</span>
    <button onclick="deleteTask(this)">❌</button>
  `;
  document.getElementById("todoList").appendChild(li);
}

function deleteTask(btn) {
  const task = btn.parentElement.querySelector("span").textContent;
  btn.parentElement.remove();
  removeTask(task);
}

function saveTask(task) {
  const tasks = getTasks();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(task) {
  let tasks = getTasks();
  tasks = tasks.filter(t => t !== task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function loadTasks() {
  const tasks = getTasks();
  tasks.forEach(createTaskElement);
}

// Theme controls
function toggleDarkMode() {
  const isDark = document.getElementById("themeToggle").checked;
  const theme = isDark ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

function setTheme() {
  const theme = document.getElementById("bgSelector").value;
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

function loadTheme() {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  document.getElementById("themeToggle").checked = (savedTheme === "dark");
  document.getElementById("bgSelector").value = savedTheme;
}

// Font controls
function setFont() {
  const font = document.getElementById("fontSelector").value;
  document.documentElement.setAttribute("data-font", font);
  localStorage.setItem("font", font);
}

function loadFont() {
  const savedFont = localStorage.getItem("font") || "sans";
  document.documentElement.setAttribute("data-font", savedFont);
  document.getElementById("fontSelector").value = savedFont;
}
