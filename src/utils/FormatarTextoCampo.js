const FormatarTextoCampo = (texto, tipoTexto) => {
    const tipo = tipoTexto.toLowerCase();
    switch (tipo) {
        case 'cpf':
            return texto.replace(/\D/g, '') // remove caracteres não numéricos
                .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d{1,2})/, '$1-$2')
                .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
        case 'cnpj':
            return texto.replace(/\D/g, '') // remove caracteres não numéricos
                .replace(/(\d{2})(\d)/, '$1.$2') // coloca ponto entre os dois primeiros dígitos
                .replace(/(\d{3})(\d)/, '$1.$2') // coloca ponto entre o terceiro e o quarto dígitos
                .replace(/(\d{3})(\d)/, '$1/$2') // coloca barra entre o sexto e o sétimo dígitos
                .replace(/(\d{4})(\d)/, '$1-$2'); // coloca hífen entre o décimo segundo e o décimo terceiro dígitos
        case 'crmv':
            return texto.replace(/\D/g, '');// remove caracteres não numéricos
        case 'data':
            return texto.replace(/\D/g, '') // remove caracteres não numéricos
                .replace(/(\d{2})(\d)/, '$1/$2') // coloca barra entre os dois primeiros dígitos
                .replace(/(\d{2})(\d)/, '$1/$2'); // coloca barra entre o quarto e o quinto dígitos
        case 'cep':
            return texto.replace(/\D/g, '') // remove caracteres não numéricos
                .replace(/(\d{5})(\d)/, '$1-$2'); // coloca hífen entre o quinto e o sexto dígitos
        default:
            return texto.replace(/\D/g, '');
    }
}

export default FormatarTextoCampo;