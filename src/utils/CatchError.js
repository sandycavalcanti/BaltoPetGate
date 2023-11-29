import axios from "axios";
import { ToastAndroid } from "react-native";

const CatchError = (error, mostrar404) => {
    if (axios.isCancel(error)) return; // Caso a requisição for cancelada pelo controller

    if (error.response) { // Caso houver uma resposta do servidor
        const { status, data } = error.response;
        const errorMessage = data.message;

        if (status !== 404 || mostrar404) { // Por padrão mostrar apenas erros diferentes de 404
            ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
            console.error('Erro ao selecionar:', data.error, error);
        }
    } else { // Erros não relacionados ao servidor
        console.error(error);
        ToastAndroid.show('Houve um erro', ToastAndroid.SHORT);
    }
};

export default CatchError;
