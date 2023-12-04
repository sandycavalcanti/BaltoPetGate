// Função que recebe o texto armazenado no banco de dados e formata o texto para ser exibido no aplicativo
export default function FormatarTextoBanco(textoBanco) {
    const texto = textoBanco ? textoBanco.toString().toLowerCase() : textoBanco;
    switch (texto) {
        case 'grande':
            return 'Grande'
        case 'medio':
            return 'Médio';
        case 'pequeno':
            return 'Pequeno'
        case 'femea':
            return 'Femêa'
        case 'macho':
            return 'Macho'
        case 'casa':
            return 'Casa'
        case 'apartamento':
            return 'Apartamento'
        default:
            return textoBanco;
    }
}