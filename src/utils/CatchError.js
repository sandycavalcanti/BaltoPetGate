import axios from "axios";
import { ToastAndroid } from "react-native";
// Função para lidar com o catch do axios
export default function CatchError(error, mostrar404, functionNonServerError, functionServerError) {
    if (axios.isCancel(error)) return; // Caso a requisição for cancelada pelo controller

    if (error.response) { // Caso houver uma resposta do servidor
        const { status, data } = error.response;
        const errorMessage = data.message;

        if (status !== 404 || mostrar404) { // Por padrão, apenas erros que não são de status 404
            ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
            if (!functionServerError) console.error('Erro ao executar a ação:', data.error, error);
        }
        if (functionServerError) { // Função passada pelos parâmetros
            functionServerError();
        }
    } else { // Erros não relacionados ao servidor
        console.error(error);
        ToastAndroid.show('Houve um erro', ToastAndroid.SHORT);
        if (functionNonServerError) { // Função passada pelos parâmetros
            functionNonServerError();
        }
    }
}