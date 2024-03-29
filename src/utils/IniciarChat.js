import axios from "axios";
import { urlAPI } from "../constants";
import CatchError from "./CatchError";
import { CommonActions } from "@react-navigation/native";

// Função para iniciar o chat, navegando para ele caso o chat já existir, criar um novo,ou adicionar um animal
export default async function IniciarChat(TB_PESSOA_IDD, TB_PESSOA_ID, navigate, animalId, replace) {

    const navigateToNewScreen = (TB_CHAT_ID, TB_PESSOA_ID) => {
        if (replace) {
            navigate.dispatch(state => {
                // Cria um novo array de rotas excluindo as tres últimas
                const routes = state.routes.slice(0, state.routes.length - 3);
                // Adiciona a nova rota
                const newRoute = { name: 'Chat', params: { TB_CHAT_ID, TB_PESSOA_ID } };
                routes.push(newRoute);
                // Executa o reset com as novas rotas
                return CommonActions.reset({ ...state, routes, index: routes.length - 1 });
            });
        } else {
            navigate('Chat', { TB_CHAT_ID, TB_PESSOA_ID }); // Navigate normal
        }
    };

    const CadastrarChat = () => {
        axios.post(urlAPI + 'cadchat', { // Cadastrar um chat
            TB_PESSOA_REMETENTE_ID: TB_PESSOA_IDD,
            TB_PESSOA_DESTINATARIO_ID: TB_PESSOA_ID,
        }).then(response => {
            const TB_CHAT_IDD = response.data.Cadastrar.TB_CHAT_ID;
            if (animalId) { // Se for pedido um animal, já cadastre ele antes de navegar
                axios.post(urlAPI + 'cadchatanimal', {
                    TB_ANIMAL_ID: animalId,
                    TB_CHAT_ID: TB_CHAT_IDD,
                }).then(response => {
                    navigateToNewScreen(TB_CHAT_IDD, TB_PESSOA_ID);
                }).catch(CatchError);
            } else { // Caso não for pedido um animal, navegue para a tela
                navigateToNewScreen(TB_CHAT_IDD, TB_PESSOA_ID);
            }
        }).catch(CatchError);
    }

    await axios.post(urlAPI + 'selchat/filtrar', { // Selecionar para verificar se há um chat existente
        TB_PESSOA_IDD,
        TB_PESSOA_ID
    }).then(async response => {
        const dados = response.data.Selecionar[0];
        const TB_CHAT_ID = dados.TB_CHAT_ID;
        if (animalId) { // Se o iniciar chat tiver um animal
            if (!dados.TB_ANIMAL_CADASTRADO) {
                let existeAnimal = false;
                await axios.post(urlAPI + 'selchatmarcacoes/filtrar', { // Selecionar as marcações de animais do chat existente
                    TB_ANIMAL_ID: animalId,
                    TB_CHAT_ID,
                }).then(response => {
                    const chatMarcacoes = response.data;
                    existeAnimal = chatMarcacoes.map(item => { // Retorna se já existe um animal no chat
                        if (item.TB_ANIMAL_ID == animalId) return true
                    })
                }).catch(CatchError)
                if (existeAnimal) { // Caso o animal pedido já existir, então navegue para a tela
                    navigateToNewScreen(TB_CHAT_ID, TB_PESSOA_ID);
                } else {
                    axios.post(urlAPI + 'cadchatanimal', { // Caso ainda não existir, cadastre o animal no chat
                        TB_ANIMAL_ID: animalId,
                        TB_CHAT_ID,
                    }).then(response => { // Navegue para a tela
                        navigateToNewScreen(TB_CHAT_ID, TB_PESSOA_ID);
                    }).catch(CatchError);
                }
            } else {
                CadastrarChat();
            }
        } else { // Se o iniciar chat não tiver um animal, apenas navegue
            navigateToNewScreen(TB_CHAT_ID, TB_PESSOA_ID);
        }
        // Se ainda não existir um chat, cadastre um
    }).catch(error => CatchError(error, false, null, null, () => CadastrarChat()));
}