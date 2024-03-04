import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Função para decodificar o token e devolver o id da pessoa, id do tipo e nome de perfil
export default async function DecodificarToken() {
    try {
        const TokenUsuario = await AsyncStorage.getItem('token');
        const decodedToken = jwt_decode(TokenUsuario);
        const { TB_PESSOA_IDD, TB_TIPO_IDD, TB_PESSOA_NOME_PERFIL } = decodedToken;
        return { TB_PESSOA_IDD, TB_TIPO_IDD, TB_PESSOA_NOME_PERFIL };
    } catch (erro) {
        console.error("Erro no token:", erro)
    }
}