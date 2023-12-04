// Função que recebe um texto e remove os acentos e coloca tudo em caixa baixa
export default function RemoverAcentos(texto) {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}