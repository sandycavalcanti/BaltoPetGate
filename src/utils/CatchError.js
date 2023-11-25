import axios from "axios";
import { ToastAndroid } from "react-native";

const CatchError = (error, mostrar404) => {
    if (axios.isCancel(error)) return;

    if (error.response) {
        const { status, data } = error.response;
        const errorMessage = data.message;

        if (status !== 404 || mostrar404) {
            ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
            console.error('Erro ao selecionar:', data.error, error);
        }
    } else {
        console.error(error);
        ToastAndroid.show('Houve um erro', ToastAndroid.SHORT);
    }
};

export default CatchError;
