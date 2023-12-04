import axios from "axios";
import { urlAPI } from "../constants";
import CatchError from "./CatchError";
// Função para desativar um campo no banco de dados
export default async function DesativarCampo(tipo, id, functionthen) {
    await axios.put(urlAPI + "del" + tipo + "/" + id)
        .then(response => {
            if (functionthen) {
                functionthen();
            }
        }).catch(CatchError);
};