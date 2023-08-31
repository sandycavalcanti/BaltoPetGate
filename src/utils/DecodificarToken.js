import { chaveToken } from "../constants";
import JWT from 'expo-jwt';

export default function DecodificarToken(TokenUsuario) {
    const decodedToken = JWT.decode(TokenUsuario, chaveToken);
    const { TB_PESSOA_IDD, TB_TIPO_IDD } = decodedToken;
    return { TB_PESSOA_IDD, TB_TIPO_IDD };
}