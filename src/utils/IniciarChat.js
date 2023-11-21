import axios from "axios";
import { urlAPI } from "../constants";

const IniciarChat = async (TB_PESSOA_IDD, TB_PESSOA_ID, navigate) => {
    await axios.post(urlAPI + 'selchat/filtrar', {
        TB_PESSOA_IDD,
        TB_PESSOA_ID
    }).then(response => {
        const dados = response.data.Selecionar[0];
        const TB_CHAT_ID = dados.TB_CHAT_ID;
        navigate('Chat', { TB_CHAT_ID, TB_PESSOA_ID });
    }).catch(error => {
        if (error.response) {
            if (error.response.status == 404) {
                axios.post(urlAPI + 'cadchat', {
                    TB_PESSOA_REMETENTE_ID: TB_PESSOA_IDD,
                    TB_PESSOA_DESTINATARIO_ID: TB_PESSOA_ID,
                }).then(response => {
                    const TB_CHAT_ID = response.data.Cadastrar.TB_CHAT_ID;
                    navigate('Chat', { TB_CHAT_ID, TB_PESSOA_ID })
                }).catch(error => {
                    let erro = error.response.data;
                    console.log('Erro ao selecionar:', erro.error);
                });
            } else {
                let erro = error.response.data;
                console.log('Erro ao selecionar:', erro.error);
            }
        } else {
            console.error(error)
        }
    });
}

export default IniciarChat;