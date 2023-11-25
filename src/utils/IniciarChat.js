import axios from "axios";
import { urlAPI } from "../constants";
import CatchError from "./CatchError";

const IniciarChat = async (TB_PESSOA_IDD, TB_PESSOA_ID, navigate, animalId) => {
    await axios.post(urlAPI + 'selchat/filtrar', { // Selecionar para verificar se há um chat existente
        TB_PESSOA_IDD,
        TB_PESSOA_ID
    }).then(async response => {
        const dados = response.data.Selecionar[0];
        const TB_CHAT_ID = dados.TB_CHAT_ID;
        if (animalId) {
            let existeAnimal = false;
            await axios.post(urlAPI + 'selchatmarcacoes/filtrar', {
                TB_ANIMAL_ID: animalId,
                TB_CHAT_ID,
            }).then(response => {
                const chatMarcacoes = response.data;
                existeAnimal = chatMarcacoes.map(item => {
                    if (item.TB_ANIMAL_ID == animalId) return true
                })
            }).catch(CatchError)
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