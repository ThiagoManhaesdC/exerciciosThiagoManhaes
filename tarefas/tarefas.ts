interface Tarefa {
    id: number;
    titulo: string;
    descricao: string;
    concluida: boolean;
}

const listaDeTarefas: Tarefa[] = [
    {
        id: 1,
        titulo: "Limpar o quarto",
        descricao: "Tirar o lixo e guardar as roupas",
        concluida: false
    }
]

function listarTarefas() {
    return listaDeTarefas;
}

function buscarTarefa(id: number) {
    return listaDeTarefas.find(tarefa => tarefa.id === id);
}

function adicionarTarefa(tarefa: Tarefa) {
    listaDeTarefas.push(tarefa);
}

function atualizarTarefa(id: number, tarefa: Tarefa) {
    const index = listaDeTarefas.findIndex(tarefa => tarefa.id === id);
    if (index !== -1) {
        listaDeTarefas[index] = tarefa;
    }
}

function removerTarefa(id: number) {
    const index = listaDeTarefas.findIndex(tarefa => tarefa.id === id);
    if (index !== -1) {
        listaDeTarefas.splice(index, 1);
    }
}

export { listarTarefas, buscarTarefa, adicionarTarefa, atualizarTarefa, removerTarefa };