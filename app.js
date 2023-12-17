document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
    document.getElementById("add-btn").addEventListener("click", addTask);
});

function addTask() {
    const input = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    if (input.value.trim() !== "") {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${input.value}</span>
            <button class="delete-btn" onclick="removeTask(this)"><i class="fas fa-trash-alt"></i> Delete</button>
        `;
        taskList.appendChild(li);
        saveTask(input.value);
        input.value = "";
    }
}

function removeTask(btn) {
    const taskList = document.getElementById("task-list");
    const li = btn.parentNode;
    taskList.removeChild(li);
    removeTaskFromStorage(li.firstChild.textContent.trim());
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const taskList = document.getElementById("task-list");
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(function (task) {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${task}</span>
            <button class="delete-btn" onclick="removeTask(this)"><i class="fas fa-trash-alt"></i> Delete</button>
        `;
        taskList.appendChild(li);
    });
}

function removeTaskFromStorage(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter((t) => t !== task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
