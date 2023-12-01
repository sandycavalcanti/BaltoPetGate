export default function RetornarTipoNome(tipoId, solicitacao) {
    if (!solicitacao) {
        switch (tipoId) {
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
                return ''
        }
    } else {
        switch (tipoId) {
            case 1:
                return 'Adotar'
            case 2:
                return 'Abrigar'
            case 3:
                return 'Cuidar'
            default:
                return ''
        }
    }
} 