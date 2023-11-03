// import JWT from 'expo-jwt';
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function DecodificarToken() {
    try {
        const TokenUsuario = await AsyncStorage.getItem('token');
        const decodedToken = jwt_decode(TokenUsuario);
        const { TB_PESSOA_IDD, TB_TIPO_IDD } = decodedToken;
        return { TB_PESSOA_IDD, TB_TIPO_IDD };
    } catch (erro) {
        console.error("Erro no token:", erro)
    }
}