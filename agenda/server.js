const http = require("http");
const { Agenda, Contato } = require("./agenda");

const PORTA = 7000;
const agenda = new Agenda();

const servidor = http.createServer((requisicao, resposta) => {
    const metodo = requisicao.method;
    const caminho = requisicao.url;

    // Extrai o possível nome dividindo a URL pelas barras
    // Exemplo: se o caminho for "/contato/Joao", o nomeExtraido será "Joao"
    const nomeExtraido = caminho.split("/")[2];

    // Listar todos os contatos
    if (metodo === "GET" && caminho === "/agenda") {
        res.writerHead(200);
        const listaDeContatos = agenda.listar();
        const listaEmFormatoDeTexto = JSON.stringify(listaDeContatos);

        resposta.end(listaEmFormatoDeTexto);
    }

    // Adicionar um novo contato
    if (metodo === "POST" && caminho === "/contato") {
        let corpoDaRequisicao = "";

        // Recebe os dados da requisição em pequenos pedaços de texto
        requisicao.on("data", pedaco => {
            corpoDaRequisicao += pedaco;
        });

        // Quando terminar de receber todos os dados:
        requisicao.on("end", () => {
            const dadosConvertidos = JSON.parse(corpoDaRequisicao);
            const novoContato = new Contato(dadosConvertidos.nome, dadosConvertidos.telefone);

            agenda.adicionar(novoContato);
            resposta.end("Contato adicionado com sucesso");
        });
    }

    // Atualizar um contato existente
    if (metodo === "PUT" && caminho === `/contato/${nomeExtraido}`) {
        let corpoDaRequisicao = "";

        requisicao.on("data", pedaco => {
            corpoDaRequisicao += pedaco;
        });

        requisicao.on("end", () => {
            const dadosConvertidos = JSON.parse(corpoDaRequisicao);
            const contatoEncontrado = agenda.buscar(nomeExtraido);

            contatoEncontrado.telefone = dadosConvertidos.telefone;
            resposta.end("Contato atualizado com sucesso");
        });
    }
});

servidor.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
});