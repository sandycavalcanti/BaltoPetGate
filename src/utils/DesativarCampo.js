import axios from "axios";
import { urlAPI } from "../constants";

const DesativarCampo = async (tipo, id, functionthen) => {
    await axios.put(urlAPI + "del" + tipo + "/" + id)
        .then(response => {
            console.log("Desativado");
            if (functionthen) {
                functionthen();
            }
        }).catch(error => {
            console.error(error);
        });
};
export default DesativarCampo;