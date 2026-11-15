document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-title');
    const dateInput = document.getElementById('task-date');
    const taskList = document.getElementById('task-list');
    const filterSelect = document.getElementById('task-filter');
    const feedback = document.getElementById('planner-feedback');
    const emptyState = document.getElementById('empty-state');

    const totalCount = document.getElementById('total-count');
    const pendingCount = document.getElementById('pending-count');
    const completedCount = document.getElementById('completed-count');

    if (!taskForm || !taskList) return;

    let tasks = [];

    try {
        tasks = JSON.parse(localStorage.getItem('academic-tasks')) || [];
    } catch {
        tasks = [];
    }

    function saveTasks() {
        localStorage.setItem('academic-tasks', JSON.stringify(tasks));
    }

    function updateStatistics() {
        totalCount.textContent = tasks.length;
        pendingCount.textContent =
            tasks.filter(task => !task.completed).length;
        completedCount.textContent =
            tasks.filter(task => task.completed).length;
    }

    function renderTasks() {
        taskList.innerHTML = '';

        const filter = filterSelect.value;

        const visibleTasks = tasks.filter(task => {
            if (filter === 'pending') return !task.completed;
            if (filter === 'completed') return task.completed;
            return true;
        });

        visibleTasks.forEach(task => {
            const item = document.createElement('li');
            item.className = 'task-item';

            if (task.completed) {
                item.classList.add('completed');
            }

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.setAttribute('aria-label', 'Mark task as completed');

            checkbox.addEventListener('change', () => {
                task.completed = checkbox.checked;
                saveTasks();
                renderTasks();
            });

            const description = document.createElement('span');
            description.textContent = task.title;

            if (task.dueDate) {
                const dueDate = document.createElement('small');
                dueDate.textContent = ` — Due: ${task.dueDate}`;
                description.appendChild(dueDate);
            }

            const deleteButton = document.createElement('button');
            deleteButton.type = 'button';
            deleteButton.textContent = 'Delete';
            deleteButton.setAttribute('aria-label', `Delete ${task.title}`);

            deleteButton.addEventListener('click', () => {
                tasks = tasks.filter(item => item.id !== task.id);
                saveTasks();
                renderTasks();
            });

            item.append(checkbox, description, deleteButton);
            taskList.appendChild(item);
        });

        emptyState.hidden = visibleTasks.length > 0;
        updateStatistics();
    }

    taskForm.addEventListener('submit', event => {
        event.preventDefault();

        const title = taskInput.value.trim();

        if (!title) {
            feedback.textContent = 'Please enter a task description.';
            return;
        }

        tasks.push({
            id: Date.now(),
            title,
            dueDate: dateInput.value,
            completed: false
        });

        saveTasks();
        taskForm.reset();
        feedback.textContent = 'Your task has been added.';
        renderTasks();
    });

    filterSelect.addEventListener('change', renderTasks);

    renderTasks();
});