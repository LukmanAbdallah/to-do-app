/* script.js */
document.addEventListener("DOMContentLoaded", loadTasks);
function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();
    if (taskText === "") return;
    let taskList = document.getElementById("taskList");
    let li = document.createElement("li");
    li.innerHTML = `${taskText} <button class="delete-btn" onclick="deleteTask(this)">❌</button>`;
    li.onclick = () => li.classList.toggle("completed");
    taskList.appendChild(li);
    saveTasks();
    taskInput.value = "";
}
function deleteTask(button) {
    button.parentElement.remove();
    saveTasks();
}
function resetTasks() {
    document.getElementById("taskList").innerHTML = "";
    localStorage.removeItem("tasks");
}
function saveTasks() {
    let tasks = Array.from(document.querySelectorAll("#taskList li"))
        .map(li => ({ text: li.innerText.replace("❌", ""), completed: li.classList.contains("completed") }));
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");
    tasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = `${task.text} <button class="delete-btn" onclick="deleteTask(this)">❌</button>`;
        if (task.completed) li.classList.add("completed");
        li.onclick = () => { li.classList.toggle("completed"); saveTasks(); };
        taskList.appendChild(li);
    });
}
