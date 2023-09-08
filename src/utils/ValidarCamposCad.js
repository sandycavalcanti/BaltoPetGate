export default function ValidarCamposCad(camposObrigatorios, dados) {
    let mensagemErro = "";
    const criteriosEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const criteriosNome = /^(?=.*\s)(.{8,})$/;
    const criteriosNomePerfil = /^.{3,}$/;
    const criteriosSenha = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    const criteriosTelefone = /^\d{10,13}$/;
    const criteriosUrl = /^.{15,}$/;

    const { nome, dtNasc, cpf, crmv, cnpj, uf, cidade, bairro, rua, numero, nomePerfil, telefone1, telefone2, whatsapp, facebook, instagram, email, senha, senhaConfirmacao } = dados;

    if (camposObrigatorios.some(campo => !campo)) {
        mensagemErro = "Complete todos os campos obrigatórios.";
    }
    else {
        if (nome && !criteriosNome.test(nome)) {
            mensagemErro += "Nome completo inválido.\n";
        }
        if (dtNasc && dtNasc == 1) {
            mensagemErro += "Data de nascimento inválida.\n";
        }
        if (cpf && cpf == 1) {
            mensagemErro += "CPF inválido.\n";
        }
        if (crmv && crmv == 1) {
            mensagemErro += "CRMV inválido.\n";
        }
        if ((uf || cidade || bairro || rua) && (!uf || !cidade || !bairro || !rua || !numero)) {
            mensagemErro += "Complete o endereço.\n";
        }
        if (nomePerfil && !criteriosNomePerfil.test(nomePerfil)) {
            mensagemErro += "Nome de perfil inválido.\n";
        }
        if (cnpj && cnpj == 1) {
            mensagemErro += "CNPJ inválido.\n";
        }
        if (telefone1 && !criteriosTelefone.test(telefone1)) {
            mensagemErro += "Primeiro número de telefone inválido.\n";
        }
        if (telefone2 && !criteriosTelefone.test(telefone2)) {
            mensagemErro += "Segundo número de telefone inválido.\n";
        }
        if (whatsapp && !criteriosTelefone.test(whatsapp)) {
            mensagemErro += "Número de WhatsApp inválido.\n";
        }
        if (facebook && (!criteriosUrl.test(facebook) || !facebook.includes('facebook.com/'))) {
            mensagemErro += "Link do facebook inválido.\n";
        }
        if (email && !criteriosEmail.test(email)) {
            mensagemErro += "E-mail inválido.\n";
        }
        if (senha && !criteriosSenha.test(senha)) {
            mensagemErro += "Senha inválida. A senha deve possuir no mínimo 8 caracteres, um número e uma letra maiúscula. \n";
        }
        else if (senha !== senhaConfirmacao) {
            mensagemErro += "As senhas não correspondem.";
        }
    }
    return mensagemErro;
}