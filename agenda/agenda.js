class Contato {
    constructor(nome, telefone) {
        this.nome = nome;
        this.telefone = telefone;
    }
}

class Agenda {
    constructor() {
        this.contatos = [];
    }

    adicionar(contato) {
        this.contatos.push(contato);
    }

    listar() {
        return this.contatos;
    }

    buscar(nome) {
        return this.contatos.find(contato => contato.nome === nome) || null;
    }
}

module.exports = { Contato, Agenda };