// Função que valida se as informações do animal fornecidas pelo usuário nos campos estão válidas
export default function ValidarCamposAnimal(camposObrigatorios, dados) {
    let mensagemErro = "";
    const criteriosNome = /[a-zA-Z]{3,}/;
    const criteriosLetrasMinimas = /[a-zA-Z]{10,}/;

    const { nome, idade, idadeTipo, porte, peso, especie, sexo, descricao, localResgate, cuidadoEspecial, saude, castrado, vermifugado, microchip, temperamentos, situacoes, traumas, uf, cidade, bairro, rua } = dados;

    if (camposObrigatorios.some(campo => campo === undefined || campo === '' || campo === null)) {
        return mensagemErro = "Complete todos os campos obrigatórios.";
    }
    if (nome && !criteriosNome.test(nome)) {
        mensagemErro += "Nome completo inválido.\n";
    }
    if ((idadeTipo == 'ANO' && idade > 20) || (idadeTipo == 'MES' && idade > 240)) {
        mensagemErro += "Idade inválida.\n";
    }
    if ((especie == 'CACHORRO' && peso > 156) || (especie == 'GATO' && peso > 22)) {
        mensagemErro += "Peso inválido.\n";
    }
    if (especie === 'CACHORRO') {
        if ((porte === 'PEQUENO' && peso > 10) || (porte === 'MEDIO' && (peso > 25 || peso < 5)) || (porte === 'GRANDE' && peso < 15)) {
            mensagemErro += "Porte inválido.\n";
        }
    } else if (especie === 'GATO') {
        if ((porte === 'PEQUENO' && peso > 5) || (porte === 'MEDIO' && (peso > 7 || peso < 3)) || (porte === 'GRANDE' && peso < 5)) {
            mensagemErro += "Porte inválido.\n";
        }
    }
    if (descricao && !criteriosLetrasMinimas.test(descricao)) {
        mensagemErro += "Descrição inválida.\n";
    }
    if (localResgate && !criteriosLetrasMinimas.test(localResgate)) {
        mensagemErro += "Local de resgate inválido.\n";
    }
    if (cuidadoEspecial && !criteriosLetrasMinimas.test(cuidadoEspecial)) {
        mensagemErro += "Cuidado especial inválido.\n";
    }
    if ((uf || cidade || bairro || rua) && (!uf || !cidade || !bairro || !rua)) {
        mensagemErro += "Complete o endereço.\n";
    }
    return mensagemErro;
}