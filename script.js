const taskList = document.getElementById('task-list');
const addTaskBtn = document.getElementById('add-task-btn');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const totalTasksText = document.getElementById('total-tasks');
const completedTasksText = document.getElementById('completed-tasks');
const pendingTasksText = document.getElementById('pending-tasks');
const filterStatus = document.getElementById('filter-status');
const themeToggle = document.getElementById('theme-toggle');

let tasks = [];

// Default image URL
const defaultImageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_d4-VMIcDd2FUN3oPBYFSfkgNAhf3Drx37g&s';

// Add a new task
addTaskBtn.addEventListener('click', () => {
    const taskName = prompt("Enter task name:");
    if (taskName) {
        tasks.push({ name: taskName, image: defaultImageUrl, status: 'Pending' });
        updateTasks();
    }
});

// Update task list in the UI
function updateTasks() {
    const filteredTasks = filterTasks();
    taskList.innerHTML = '';
    filteredTasks.forEach((task, index) => {
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        taskItem.innerHTML = `
            <img src="${task.image}" alt="Task Image" class="task-image" style="width: 50px; height: 50px;">
            <span class="task-name">${task.name}</span>
            <select onchange="changeStatus(${index}, this.value)" class="task-status">
                <option value="Pending" ${task.status === 'Pending' ? 'selected' : ''}>Pending</option>
                <option value="In Progress" ${task.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                <option value="Completed" ${task.status === 'Completed' ? 'selected' : ''}>Completed</option>
            </select>
        `;
        taskList.appendChild(taskItem);
    });
    updateProgressBar();
    updateTaskStats();
}

// Filter tasks based on selected status
function filterTasks() {
    const status = filterStatus.value;
    return status === 'All' ? tasks : tasks.filter(task => task.status === status);
}

// Change task status
function changeStatus(index, status) {
    tasks[index].status = status;
    updateTasks();
}

// Update progress bar
function updateProgressBar() {
    const completedTasks = tasks.filter(task => task.status === 'Completed').length;
    const progressPercentage = tasks.length ? (completedTasks / tasks.length) * 100 : 0;
    progressBar.style.width = `${progressPercentage}%`;
    progressText.textContent = `${Math.round(progressPercentage)}% Completed`;
}

// Update task statistics
function updateTaskStats() {
    totalTasksText.textContent = tasks.length;
    completedTasksText.textContent = tasks.filter(task => task.status === 'Completed').length;
    pendingTasksText.textContent = tasks.filter(task => task.status === 'Pending').length;
}

// Theme toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    document.querySelector('.header').classList.toggle('dark-theme');
    document.querySelectorAll('.tasks-section, .milestones-section, .stats-section').forEach(section => {
        section.classList.toggle('dark-theme');
    });
});

// Initial setup
updateTasks();
