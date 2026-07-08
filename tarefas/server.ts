import express, { type Request, type Response } from "express";
import { listarTarefas, buscarTarefa, adicionarTarefa, atualizarTarefa, removerTarefa } from "./tarefas";

const PORTA = 7000;

const app = express();

app.use(express.json());

app.get('/api/tarefas', (req: Request, res: Response) => {
    res.status(200).json(listarTarefas());
});

app.get('/api/tarefas/:id', (req: Request, res: Response) => {
    const tarefa = buscarTarefa(Number(req.params.id));
    if (tarefa) {
        res.status(200).json(tarefa);
    } else {
        res.status(404).json({ error: 'Tarefa não encontrada!' });
    }
});

app.post('/api/tarefas', (req: Request, res: Response) => {
    const tarefa = req.body;
    adicionarTarefa(tarefa);
    res.status(201).json(tarefa);
});

app.put('/api/tarefas/:id', (req: Request, res: Response) => {
    const tarefa = req.body;
    atualizarTarefa(Number(req.params.id), tarefa);
    res.status(200).json(tarefa);
});

app.delete('/api/tarefas/:id', (req: Request, res: Response) => {
    removerTarefa(Number(req.params.id));
    if (removido) {
        res.status(204).send();
    } else {
        res.status(404).json({ error: 'Tarefa não encontrada!' });
    }
});

// Iniciando o servidor na porta definida
app.listen(PORTA, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORTA}`);
})