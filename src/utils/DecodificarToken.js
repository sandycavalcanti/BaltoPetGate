import { chaveToken } from "../constants";
import JWT from 'expo-jwt';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function DecodificarToken() {
    const TokenUsuario = await AsyncStorage.getItem('token');
    const decodedToken = JWT.decode(TokenUsuario, chaveToken);
    const { TB_PESSOA_IDD, TB_TIPO_IDD } = decodedToken;
    return { TB_PESSOA_IDD, TB_TIPO_IDD };
}