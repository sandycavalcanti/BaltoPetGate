import axios from "axios";
import { urlAPI } from "../constants";
import CatchError from "./CatchError";

// Função para desativar um campo no banco de dados
export default async function DesativarCampo(tipo, id, functionthen, reativar) {
    const deletarOuDesativar = reativar ? 'reativar' : 'del';
    const url = urlAPI + deletarOuDesativar + tipo + "/" + id;
    await axios.put(url)
        .then(response => {
            if (functionthen) {
                functionthen();
            }
        }).catch(CatchError);
};