import axios from "axios";
import { urlAPI } from "../constants";

const VerificarCampoObjeto = (objeto, campo) => {
    return campo in objeto;
}

const IniciarChat = async (TB_PESSOA_IDD, TB_PESSOA_ID, navigate, animalId) => {
    await axios.post(urlAPI + 'selchat/filtrar', { // Selecionar para verificar se há um chat existente
        TB_PESSOA_IDD,
        TB_PESSOA_ID
    }).then(response => {
        const dados = response.data.Selecionar[0];
        const TB_CHAT_ID = dados.TB_CHAT_ID;
        if (animalId) {
            const existeAnimal = VerificarCampoObjeto(dados, "TB_ANIMAL_CADASTRADO");
            if (existeAnimal) {
                navigate('Chat', { TB_CHAT_ID, TB_PESSOA_ID });
            } else {
                axios.post(urlAPI + 'cadchatanimal', {
                    TB_ANIMAL_ID: animalId,
                    TB_CHAT_ID,
                }).then(response => {
                    navigate('Chat', { TB_CHAT_ID, TB_PESSOA_ID })
                }).catch(error => {
                    let erro = error.response.data;
                    console.log('Erro ao selecionar:', erro.error);
                });
            }
        } else {
            navigate('Chat', { TB_CHAT_ID, TB_PESSOA_ID })
        }
    }).catch(error => {
        if (error.response) {
            if (error.response.status == 404) {
                axios.post(urlAPI + 'cadchat', { // Cadastrar um chat
                    TB_PESSOA_REMETENTE_ID: TB_PESSOA_IDD,
                    TB_PESSOA_DESTINATARIO_ID: TB_PESSOA_ID,
                }).then(response => {
                    const TB_CHAT_IDD = response.data.Cadastrar.TB_CHAT_ID;
                    if (animalId) {
                        axios.post(urlAPI + 'cadchatanimal', {
                            TB_ANIMAL_ID: animalId,
                            TB_CHAT_ID: TB_CHAT_IDD,
                        }).then(response => {
                            navigate('Chat', { TB_CHAT_ID: TB_CHAT_IDD, TB_PESSOA_ID })
                        }).catch(error => {
                            let erro = error.response.data;
                            console.log('Erro ao selecionar:', erro.error);
                        });
                    } else {
                        navigate('Chat', { TB_CHAT_ID: TB_CHAT_IDD, TB_PESSOA_ID });
                    }
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