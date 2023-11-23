import { ToastAndroid } from "react-native";

const CatchError = (error) => {
    if (error.response) {
        if (error.response.status !== 404) {
            let erro = error.response.data;
            ToastAndroid.show(erro.message, ToastAndroid.SHORT);
            console.error('Erro ao selecionar:', erro.error, error);
        }
    } else {
        console.error(error);
        ToastAndroid.show('Houve um erro', ToastAndroid.SHORT);
    }
}

export default CatchError