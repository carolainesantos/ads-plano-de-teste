const RepositorioExercicio = require("../repositories/pessoa.js");

const repositorio = new RepositorioExercicio();
class ServicoExercicio {
  async PegarUm(id) {
    if (!id || isNaN(id)) {
      throw new Error("Favor preencher corretamente o id.");
    } else if (id === "0" || Number(id) < 0) {
      // verifica se o id é igual a zero ou negativo
      throw new Error("Por favor digite apenas números não negativos");
    } else if (parseFloat(id) < 0) {
      // verifica se o id é com casa decimal
      throw new Error("Por favor digite apenas números não negativos");
    }
    return repositorio.PegarUm(id);
  }

  async PegarTodos() {
    return repositorio.PegarTodos();
  }

  async Adicionar(pessoa) {
    const limiteCaracteres = 255;

    if (!pessoa) {
      throw new Error("Favor preencher o pessoa.");
    } else if (!pessoa.nome) {
      throw new Error("Favor preencher o nome.");
    } else if (!pessoa.email) {
      throw new Error("Favor preencher o email.");
    } else if (!pessoa.senha) {
      throw new Error("Favor preencher o senha.");
    } else if (/\d/.test(pessoa.nome)) {
      // verifica se o nome tem apenas números
      throw new Error("O nome não pode conter apenas números!");
    } else if (/\d/.test(pessoa.email)) {
      // verifica se o e-mail tem apenas números
      throw new Error("O e-mail não pode conter apenas números!");
    } else if (/\d/.test(pessoa.senha)) {
      // verifica se a senha tem apenas números
      throw new Error("A senha não pode conter apenas números!");
    } else if (!/^[a-zA-Z]+$/.test(pessoa.nome)) {
      // verifica se o nome tem caractere especial
      throw new Error(
        "Não é possível inserir caracteres especiais, como: !#@&*-$. No campo 'nome', apenas letras são permitidas"
      );
    } else if (pessoa.nome.length > limiteCaracteres) {
      // verifica se o nome passa do limite
      throw new Error(
        "Desculpe, o limite de caracteres foi excedido no campo 'nome'. Por favor, inserir um nome com até 255 carateres!"
      );
    } else if (pessoa.email.length > limiteCaracteres) {
      // verifica se o e-mail passa do limite
      throw new Error(
        "Desculpe, o limite de caracteres foi excedido no campo 'e-mail'. Por favor, inserir um nome com até 255 carateres!"
      );
    } else if (pessoa.senha.length > limiteCaracteres) {
      // verifica se a senha passa do limite
      throw new Error(
        "Desculpe, o limite de caracteres foi excedido no campo 'senha'. Por favor, inserir um nome com até 255 carateres!"
      );
    }

    return repositorio.Adicionar(pessoa);
  }

  async Alterar(id, pessoa) {
    if (!id || isNaN(id)) {
      throw new Error("Favor preeencher corretamente o id.");
    } else if (!pessoa) {
      throw new Error("Favor preencher pessoa");
    } else if (pessoa.id !== id) {
      throw new Error(
        "Não é possível alterar o ID. Apenas nome, e-mail ou senha!"
      );
    } else if (id < 0) {
      throw new Error("O ID não pode ser um valor negativo.");
    }

    return repositorio.Alterar(id, pessoa);
  }

  async Deletar(id) {
    if (!id || isNaN(id)) {
      throw new Error("Favor corretamente o id.");
    }
    const id_usuario = await repositorio.PegarUm(id);
    if (!id_usuario) {
      // verifica se o usuário existe no banco de dados (valida: user já deletados | e id superior aos do banco)
      throw new Error(
        "O usuário informado não existe em nosso banco de dados. Por favor, verificar se o número foi digitado corretamente e tentar novamente essa operação!"
      );
    } else if (!/^\d+$/.test(id)) {
      // verifica se é string
      throw new Error(
        "O ID informado não corresponde à um valor númerico. Por favor, insira o valor correto e repita essa operação!"
      );
    } else if (parseFloat(id) < 0) {
      // verifica se o id é decimal
      throw new Error(
        "O usuário informado não existe em nosso banco de dados, ou o valor informado é incompátivel como valores de ID's, neste caso, decimal. Por favor, verificar se o número foi digitado corretamente e tente novamente essa operação!"
      );
    } else if (id < 0) {
      // verifica se id é nagativo
      throw new Error(
        "O usuário informado não existe em nosso banco de dados, ou o valor informado é incompátivel como valores de ID's, neste caso, negativo. Por favor, verificar se o número foi digitado corretamente e tentar novamente essa operação!"
      );
    }

    return repositorio.Deletar(id);
  }
}
module.exports = ServicoExercicio;
