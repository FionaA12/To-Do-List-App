const addBtn = document.querySelector("#add-btn");
const newTaskInput = document.querySelector("#wrapper input");
const tasksContainer = document.querySelector("#tasks");
const error = document.getElementById("error");
const countValue = document.querySelector(".count-value");
let taskCount = 0;

const displayCount = () => {
    const incompleteTasks = document.querySelectorAll('.task:not(.completed)');
    taskCount = incompleteTasks.length;
    countValue.innerText = taskCount;
};
const updateLocalStorage = () => {
    const tasks = [];
    tasksContainer.querySelectorAll('.task').forEach((task, index) => {
        const taskName = task.querySelector('.taskname').innerText;
        const completed = task.classList.contains('completed');
        tasks.push({ id: index, taskName, completed });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
};
const loadTasksFromLocalStorage = () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    storedTasks.forEach((task) => {
        const taskHTML = `<div class="task ${task.completed ? 'completed' : ''}">
            <input type="checkbox" class="task-check" ${task.completed ? 'checked' : ''}>
            <span class="taskname">${task.taskName}</span>
            <button class="edit">
                <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="delete">
                <i class="fa-solid fa-trash"></i> 
            </button>
        </div>`;
        tasksContainer.insertAdjacentHTML('beforeend', taskHTML);
    });

    displayCount();
    addEventListeners();
};

const addEventListeners = () => {
    const deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach((button) => {
        button.onclick = () => {
            const task = button.parentNode;
            task.parentNode.removeChild(task);
            displayCount();
            updateLocalStorage();
        };
    });

    const editButtons = document.querySelectorAll(".edit");
    editButtons.forEach((editBtn) => {
        editBtn.onclick = (e) => {
            let targetElement = e.target;
            if (!(e.target.className == "edit")) {
                targetElement = e.target.parentElement;
            }
            newTaskInput.value = targetElement.previousElementSibling?.innerText;
            const task = targetElement.parentNode;
            task.parentNode.removeChild(task);
            displayCount();
            updateLocalStorage();
        };
    });

    const tasksCheck = document.querySelectorAll(".task-check");
    tasksCheck.forEach((checkBox) => {
        checkBox.onchange = () => {
            const task = checkBox.parentNode;
            task.classList.toggle("completed", checkBox.checked);
            displayCount();
            updateLocalStorage();
        };
    });
};

const addTask = () => {
    const taskName = newTaskInput.value.trim();
    error.style.display = "none";

    if (!taskName) {
        setTimeout(() => {
            error.style.display = "block";
        }, 200);
        return;
    }

    const taskHTML = `<div class="task">
        <input type="checkbox" class="task-check">
        <span class="taskname">${taskName}</span>
        <button class="edit">
            <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button class="delete">
            <i class="fa-solid fa-trash"></i> 
        </button>
    </div>`;

    tasksContainer.insertAdjacentHTML("beforeend", taskHTML);
    displayCount();
    updateLocalStorage();
    addEventListeners();
    newTaskInput.value = "";
};

addBtn.addEventListener("click", addTask);

window.onload = () => {
    loadTasksFromLocalStorage();
};

