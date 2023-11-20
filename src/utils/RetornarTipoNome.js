export default function RetornarTipoNome(TB_TIPO_ID) {
    switch (TB_TIPO_ID) {
        case 1:
            return 'Usuário Comum'
        case 2:
            return 'Veterinário'
        case 3:
            return 'Instituição'
        case 4:
            return 'Protetor'
        case 5:
            return 'Abrigo'
        case 6:
            return 'Estabelecimento'
        default:
            break;
    }
} 