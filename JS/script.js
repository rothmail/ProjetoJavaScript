const formProjeto = document.getElementById('form-projeto');
const formTarefa = document.getElementById('form-tarefa');
const listaProjetos = document.getElementById('lista-projetos');

let projetos = [];

formProjeto.addEventListener('submit', e => {
    e.preventDefault();
    const nome = document.getElementById('nome-projeto').value.trim();
    if (!nome) return;
    projetos.push({ nome, tarefas: [] });
    formProjeto.reset();
    renderizarProjetos();
});

formTarefa.addEventListener('submit', e => {
    e.preventDefault();
    const descricao = document.getElementById('descricao').value.trim();
    const responsavel = document.getElementById('responsavel').value.trim();
    const tipo = document.getElementById('tipo').value.trim();
    const status = document.getElementById('status').value;
    const cor = document.getElementById('cor').value;

    if (!descricao || !responsavel || !tipo || !cor || projetos.length === 0) return;

    const tarefa = { descricao, responsavel, tipo, status, cor };
    projetos[projetos.length - 1].tarefas.push(tarefa);
    formTarefa.reset();
    renderizarProjetos();
});

function renderizarProjetos() {
    listaProjetos.innerHTML = '';
    projetos.forEach((proj, i) => {
        const divProjeto = document.createElement('div');
        divProjeto.classList.add('projeto');
        const titulo = document.createElement('h3');
        titulo.textContent = proj.nome;
        divProjeto.appendChild(titulo);

        proj.tarefas.forEach((tarefa, j) => {
            const divTarefa = document.createElement('div');
            divTarefa.classList.add('tarefa');
            divTarefa.style.borderLeftColor = tarefa.cor;
            divTarefa.innerHTML = `
        <strong>${tarefa.descricao}</strong><br>
        Responsável: ${tarefa.responsavel} | Tipo: ${tarefa.tipo} | Status: 
        <select onchange="atualizarStatus(${i}, ${j}, this.value)">
          <option ${tarefa.status === 'pendente' ? 'selected' : ''}>pendente</option>
          <option ${tarefa.status === 'em-andamento' ? 'selected' : ''}>em-andamento</option>
          <option ${tarefa.status === 'concluida' ? 'selected' : ''}>concluida</option>
        </select>
        <button onclick="editarTarefa(${i}, ${j})">Editar</button>
        <button onclick="removerTarefa(${i}, ${j})">Remover</button>
      `;
            divProjeto.appendChild(divTarefa);
        });

        listaProjetos.appendChild(divProjeto);
    });
}

function atualizarStatus(i, j, novoStatus) {
    projetos[i].tarefas[j].status = novoStatus;
}

function removerTarefa(i, j) {
    projetos[i].tarefas.splice(j, 1);
    renderizarProjetos();
}

function editarTarefa(i, j) {
    const tarefa = projetos[i].tarefas[j];
    document.getElementById('descricao').value = tarefa.descricao;
    document.getElementById('responsavel').value = tarefa.responsavel;
    document.getElementById('tipo').value = tarefa.tipo;
    document.getElementById('status').value = tarefa.status;
    document.getElementById('cor').value = tarefa.cor;
    projetos[i].tarefas.splice(j, 1);
    renderizarProjetos();
}