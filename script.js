let tasks = [];

        // Add a new task
        function addTask() {
            const taskName = document.getElementById('taskName').value;
            const taskDateTime = document.getElementById('taskDateTime').value;
            if (taskName === '') return alert('Please enter a task name.');

            tasks.push({ name: taskName, dateTime: taskDateTime, completed: false, isEditing: false });
            renderTasks();
            document.getElementById('taskName').value = '';
            document.getElementById('taskDateTime').value = '';
        }

        // Toggle task completion status
        function toggleTask(index) {
            tasks[index].completed = !tasks[index].completed;
            renderTasks();
        }

        // Edit the task
        function editTask(index) {
            tasks[index].isEditing = !tasks[index].isEditing;
            renderTasks();
        }

        // Save the edited task
        function saveTask(index) {
            const taskName = document.getElementById(`task-name-input-${index}`).value;
            const taskDateTime = document.getElementById(`task-datetime-input-${index}`).value;

            if (taskName !== '') {
                tasks[index].name = taskName;
            }
            if (taskDateTime !== '') {
                tasks[index].dateTime = taskDateTime;
            }

            tasks[index].isEditing = false; 
            renderTasks();
        }

        // Delete a task
        function deleteTask(index) {
            tasks.splice(index, 1);
            renderTasks();
        }

        // Format date-time for display
        function formatDateTime(dateTime) {
            const date = new Date(dateTime);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            let hours = date.getHours();
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const amPm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12;  // Convert to 12-hour format
            return `${day}/${month}/${year} ${hours}:${minutes} ${amPm}`;
        }

        // Render tasks
        function renderTasks() {
            const taskLists = document.getElementById('taskLists');
            taskLists.innerHTML = ''; // Clear the task list before re-rendering

            tasks.forEach((task, index) => {
                const taskElement = document.createElement('div');
                taskElement.className = 'task' + (task.completed ? ' completed' : '');
                taskElement.id = `task-${index}`;

                if (task.isEditing) {
                    taskElement.innerHTML = `
                        <div>
                            <input type="text" id="task-name-input-${index}" value="${task.name}">
                            <input type="datetime-local" id="task-datetime-input-${index}" value="${task.dateTime}">
                        </div>
                        <div>
                            <button onclick="saveTask(${index})">Save</button>
                            <button onclick="deleteTask(${index})">Delete</button>
                        </div>
                    `;
                } else {
                    taskElement.innerHTML = `
                        <div>
                            <span>${task.name}</span>
                            <br>
                            <span>${task.dateTime ? formatDateTime(task.dateTime) : 'No date set'}</span>
                        </div>
                        <div>
                            <button onclick="toggleTask(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
                            <button onclick="editTask(${index})">${task.isEditing ? 'Cancel' : 'Edit'}</button>
                            <button onclick="deleteTask(${index})">Delete</button>
                        </div>
                    `;
                }

                taskLists.appendChild(taskElement);
            });
        }

        renderTasks();
