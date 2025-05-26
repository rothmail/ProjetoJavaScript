let projects = [];

// Função para adicionar um projeto
function addProject(name) {
    const project = { name: name, tasks: [] };
    projects.push(project);
    renderProjects();
    updateProjectSelect();
}

// Função para adicionar uma tarefa
function addTask(projectIndex, task) {
    projects[projectIndex].tasks.push(task);
    renderProjects();
}

// Função para remover um projeto
function removeProject(index) {
    projects.splice(index, 1);
    renderProjects();
    updateProjectSelect();
}

// Função para remover uma tarefa
function removeTask(projectIndex, taskIndex) {
    projects[projectIndex].tasks.splice(taskIndex, 1);
    renderProjects();
}

// Função para editar uma tarefa
function editTask(projectIndex, taskIndex, updatedTask) {
    projects[projectIndex].tasks[taskIndex] = updatedTask;
    renderProjects();
}

// Função para renderizar projetos e suas tarefas
function renderProjects() {
    const container = document.getElementById('projectsContainer');
    container.innerHTML = ''; // Limpa o conteúdo anterior

    projects.forEach((project, pIndex) => {
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project-card');
        projectDiv.innerHTML = `<h3>${project.name}</h3>`;

        // Botão para remover o projeto
        const removeProjectBtn = document.createElement('button');
        removeProjectBtn.classList.add('btn-remove-project');
        removeProjectBtn.textContent = 'Remover Projeto';
        removeProjectBtn.onclick = () => removeProject(pIndex);
        projectDiv.appendChild(removeProjectBtn);

        // Renderiza as tarefas do projeto
        project.tasks.forEach((task, tIndex) => {
            const taskCard = document.createElement('div');
            taskCard.classList.add('task-card');
            taskCard.style.borderLeft = `6px solid ${task.color}`;
            taskCard.innerHTML = `
                <p><strong>Descrição:</strong> ${task.description}</p>
                <p><strong>Responsável:</strong> ${task.responsible}</p>
                <p><strong>Tipo:</strong> ${task.type}</p>
                <p><strong>Status:</strong> ${task.status}</p>
                <p><strong>Cor:</strong> <span style="background-color: ${task.color}; width: 20px; height: 20px; display: inline-block;"></span></p>
            `;

            // Botão para remover a tarefa
            const removeTaskBtn = document.createElement('button');
            removeTaskBtn.classList.add('btn-remove-task');
            removeTaskBtn.textContent = 'Remover Tarefa';
            removeTaskBtn.onclick = () => removeTask(pIndex, tIndex);
            taskCard.appendChild(removeTaskBtn);

            // Botão para editar a tarefa
            const editTaskBtn = document.createElement('button');
            editTaskBtn.classList.add('btn-edit-task');
            editTaskBtn.textContent = 'Editar Tarefa';
            editTaskBtn.onclick = () => {
                const updatedTask = {
                    description: prompt("Nova descrição:", task.description) || task.description,
                    responsible: prompt("Novo responsável:", task.responsible) || task.responsible,
                    type: prompt("Novo tipo:", task.type) || task.type,
                    status: prompt("Novo status:\n(pendente|em progresso|concluído)", task.status) || task.status,
                    color: task.color
                };
                editTask(pIndex, tIndex, updatedTask);
            };
            taskCard.appendChild(editTaskBtn);

            projectDiv.appendChild(taskCard);
        });

        container.appendChild(projectDiv);
    });
}

// Função para atualizar o select de projetos
function updateProjectSelect() {
    const projectSelect = document.getElementById('taskProjectSelect');
    projectSelect.innerHTML = '<option value="">Selecione o projeto</option>'; // Limpa opções anteriores
    projects.forEach((project, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = project.name;
        projectSelect.appendChild(option);
    });
}

// Evento para o formulário de projeto
document.getElementById('projectForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const projectName = document.getElementById('projectName').value;
    addProject(projectName);
    this.reset(); // Limpa o formulário
});

// Evento para o formulário de tarefa
document.getElementById('taskForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const projectIndex = document.getElementById('taskProjectSelect').value;
    const taskDescription = document.getElementById('taskDescription').value;
    const taskResponsible = document.getElementById('taskResponsible').value;
    const taskType = document.getElementById('taskType').value;
    const taskStatus = document.getElementById('taskStatus').value;
    const taskColor = document.getElementById('taskColor').value;

    if (projectIndex === "") {
        alert("Por favor, selecione um projeto.");
        return;
    }

    const task = {
        description: taskDescription,
        responsible: taskResponsible,
        type: taskType,
        status: taskStatus,
        color: taskColor
    };

    addTask(projectIndex, task);
    this.reset(); // Limpa o formulário
});

// Inicializa o sistema
updateProjectSelect();