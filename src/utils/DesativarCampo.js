import axios from "axios";
import { urlAPI } from "../constants";

const DesativarCampo = async (tipo, id) => {
    await axios.put(urlAPI + "del" + tipo + "/" + id)
        .then(response => {
            console.log("Desativado");
        }).catch(error => {
            console.error(error);
        });
};
export default DesativarCampo;