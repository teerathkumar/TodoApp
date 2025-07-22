// Task Manager JS
let tasks = [];
const taskList = document.getElementById('taskList');
const taskModal = new bootstrap.Modal(document.getElementById('taskModal'));
const taskForm = document.getElementById('taskForm');
const addTaskBtn = document.getElementById('addTaskBtn');
const saveTaskBtn = document.getElementById('saveTaskBtn');
const taskModalLabel = document.getElementById('taskModalLabel');
const taskIdInput = document.getElementById('taskId');
const titleInput = document.getElementById('taskTitle');
const descInput = document.getElementById('taskDescription');
const statusInput = document.getElementById('taskStatus');

function statusClass(status) {
    if (status === 'To Do') return 'status-todo';
    if (status === 'In Progress') return 'status-inprogress';
    if (status === 'Done') return 'status-done';
    return '';
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const item = document.createElement('div');
        item.className = 'col-12';
        item.innerHTML = `
            <div class="card shadow-sm task-item mb-2 ${statusBorderClass(task.status)}">
                <div class="card-body d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                    <div class="flex-grow-1 w-100">
                        <div class="d-flex justify-content-between align-items-center mb-1">
                            <h5 class="card-title mb-0 text-break">${task.title}</h5>
                            <span class="badge ${statusBadgeClass(task.status)}">${task.status}</span>
                        </div>
                        <p class="card-text text-muted mb-2 text-break" style="word-break:break-word;max-width:100%;">${task.description || ''}</p>
                    </div>
                    <div class="d-flex flex-row flex-md-column gap-2 ms-md-3 mt-2 mt-md-0">
                        <button class="btn btn-sm btn-secondary edit-btn" tabindex="0">Edit</button>
                        <button class="btn btn-sm btn-danger delete-btn" tabindex="0">Delete</button>
                    </div>
                </div>
            </div>
        `;
        // Drag events
        item.querySelector('.card').setAttribute('draggable', 'true');
        item.querySelector('.card').addEventListener('dragstart', handleDragStart);
        item.querySelector('.card').addEventListener('dragover', handleDragOver);
        item.querySelector('.card').addEventListener('drop', handleDrop);
        item.querySelector('.card').addEventListener('dragend', handleDragEnd);
        // Edit
        item.querySelector('.edit-btn').onclick = () => openEditModal(task);
        // Delete
        item.querySelector('.delete-btn').onclick = () => deleteTask(task.id);
        taskList.appendChild(item);
    });
}

function fetchTasks() {
    fetch('/api/tasks')
        .then(res => res.json())
        .then(data => {
            tasks = data;
            renderTasks();
        });
}

function openEditModal(task) {
    taskModalLabel.textContent = 'Edit Task';
    taskIdInput.value = task.id;
    titleInput.value = task.title;
    descInput.value = task.description;
    statusInput.value = task.status;
    clearErrors();
    taskModal.show();
}

function openAddModal() {
    taskModalLabel.textContent = 'Add Task';
    taskIdInput.value = '';
    titleInput.value = '';
    descInput.value = '';
    statusInput.value = 'To Do';
    clearErrors();
    taskModal.show();
}

function clearErrors() {
    ['title', 'description', 'status'].forEach(f => {
        document.getElementById(f + 'Error').textContent = '';
        document.getElementById('task' + f.charAt(0).toUpperCase() + f.slice(1)).classList.remove('is-invalid');
    });
}

taskForm.onsubmit = function(e) {
    e.preventDefault();
    clearErrors();
    const id = taskIdInput.value;
    const method = id ? 'PUT' : 'POST';
    const url = id ? `/api/tasks/${id}` : '/api/tasks';
    const body = {
        title: titleInput.value.trim(),
        description: descInput.value.trim(),
        status: statusInput.value
    };
    fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(body)
    })
    .then(async res => {
        if (!res.ok) {
            const data = await res.json();
            if (data.errors) {
                Object.entries(data.errors).forEach(([field, msgs]) => {
                    document.getElementById(field + 'Error').textContent = msgs[0];
                    document.getElementById('task' + field.charAt(0).toUpperCase() + field.slice(1)).classList.add('is-invalid');
                });
            }
            throw new Error('Validation failed');
        }
        return res.json();
    })
    .then(task => {
        fetchTasks();
        taskModal.hide();
    })
    .catch(() => {});
};

addTaskBtn.onclick = openAddModal;

taskModal._element.addEventListener('hidden.bs.modal', () => {
    clearErrors();
});

function deleteTask(id) {
    if (!confirm('Delete this task?')) return;
    fetch(`/api/tasks/${id}`, { method: 'DELETE', headers: { 'Accept': 'application/json' } })
        .then(res => res.json())
        .then(() => fetchTasks());
}

// Drag and drop
let dragSrcEl = null;
function handleDragStart(e) {
    dragSrcEl = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
}
function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const dragging = document.querySelector('.dragging');
    if (dragging && dragging !== this) {
        const rect = this.getBoundingClientRect();
        const next = (e.clientY - rect.top) > (rect.height / 2);
        taskList.insertBefore(dragging, next ? this.nextSibling : this);
    }
}
function handleDrop(e) {
    e.stopPropagation();
    this.classList.remove('dragging');
    updateOrder();
}
function handleDragEnd(e) {
    this.classList.remove('dragging');
}
function updateOrder() {
    const ids = Array.from(taskList.children).map(item => item.dataset.id);
    fetch('/api/tasks/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ ids })
    }).then(() => fetchTasks());
}

function statusBadgeClass(status) {
    if (status === 'To Do') return 'bg-primary text-white';
    if (status === 'In Progress') return 'bg-warning text-dark';
    if (status === 'Done') return 'bg-success text-white';
    return 'bg-secondary';
}

function statusBorderClass(status) {
    if (status === 'To Do') return 'status-todo';
    if (status === 'In Progress') return 'status-inprogress';
    if (status === 'Done') return 'status-done';
    return '';
}

document.addEventListener('DOMContentLoaded', fetchTasks); 