import { ToastAndroid } from "react-native";

const CatchError = (error, mostrar404) => {
    if (error.response) {
        let erro = error.response.data;
        if (error.response.status !== 404) {
            ToastAndroid.show(erro.message, ToastAndroid.SHORT);
            console.error('Erro ao selecionar:', erro.error, error);
        }
        else if (mostrar404) {
            ToastAndroid.show(erro.message, ToastAndroid.SHORT);
        }
    } else {
        console.error(error);
        ToastAndroid.show('Houve um erro', ToastAndroid.SHORT);
    }
}

export default CatchError