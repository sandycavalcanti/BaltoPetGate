import axios from "axios";
import { urlAPI } from "../constants";
import CatchError from "./CatchError";
import { CommonActions } from "@react-navigation/native";

// Função para iniciar o chat, navegando para ele caso o chat já existir, criar um novo,ou adicionar um animal
export default async function IniciarChat(TB_PESSOA_IDD, TB_PESSOA_ID, navigate, animalId, excluirDuasRotas, navegarParaOutroLugar) {

    // Função principal
    await axios.post(urlAPI + 'selchat/filtrar', { // Selecionar para verificar se há um chat existente
        TB_PESSOA_IDD,
        TB_PESSOA_ID
    }).then(async response => {
        // Se for encontrado um chat com essas duas pessoas
        const dados = response.data.Selecionar[0];
        const TB_CHAT_ID = dados.TB_CHAT_ID;
        // Se tiver sido passado um animal pelos parametros
        if (animalId) {
            if (!dados.TB_ANIMAL_CADASTRADO) {
                let existeAnimal = false;
                // Selecionar as marcações de animais do chat existente
                await axios.post(urlAPI + 'selchatmarcacoes/filtrar', {
                    TB_ANIMAL_ID: animalId,
                    TB_CHAT_ID,
                }).then(response => {
                    const chatMarcacoes = response.data;
                    existeAnimal = chatMarcacoes.map(item => { // Retorna se já existe um animal no chat
                        if (item.TB_ANIMAL_ID == animalId) return true
                    })
                }).catch(CatchError)
                // Caso o animal pedido já existir, então navegue para a tela
                if (existeAnimal) {
                    navigateToNewScreen(TB_CHAT_ID, TB_PESSOA_ID);
                } else {
                    // Caso ainda não existir, cadastre o animal no chat
                    axios.post(urlAPI + 'cadchatanimal', {
                        TB_ANIMAL_ID: animalId,
                        TB_CHAT_ID,
                    }).then(response => { // Navegue para a tela
                        navigateToNewScreen(TB_CHAT_ID, TB_PESSOA_ID);
                    }).catch(CatchError);
                }
            } else {
                // Se for encontrado um chat, mas de um animal de outra pessoa, cadastre um novo chat
                CadastrarChat();
            }
        } else {
            // Se for encontrado um chat e não tiver sido passado um animal pelos parametros, navegue para a tela do chat
            navigateToNewScreen(TB_CHAT_ID, TB_PESSOA_ID);
        }
        // Se ainda não existir um chat, cadastre um chat
    }).catch(error => CatchError(error, false, null, null, () => CadastrarChat()));

    // Função cadastrar chat
    function CadastrarChat() {
        // Caso não for pedido para navegar para outro lugar pelos parametros
        if (!navegarParaOutroLugar) {
            // Cadastrar um chat
            axios.post(urlAPI + 'cadchat', {
                TB_PESSOA_REMETENTE_ID: TB_PESSOA_IDD,
                TB_PESSOA_DESTINATARIO_ID: TB_PESSOA_ID,
            }).then(response => {
                const TB_CHAT_IDD = response.data.Cadastrar.TB_CHAT_ID;
                // Se for pedido um animal, já cadastre ele nesse chat novo antes de navegar
                if (animalId) {
                    axios.post(urlAPI + 'cadchatanimal', {
                        TB_ANIMAL_ID: animalId,
                        TB_CHAT_ID: TB_CHAT_IDD,
                    }).then(response => {
                        navigateToNewScreen(TB_CHAT_IDD, TB_PESSOA_ID);
                    }).catch(CatchError);
                } else {
                    // Caso não for pedido um animal, apenas navegue para a tela
                    navigateToNewScreen(TB_CHAT_IDD, TB_PESSOA_ID);
                }
            }).catch(CatchError);
        } else {
            navegarParaOutroLugar();
        }
    }

    // Função para navegar para o chat excluindo as duas ultimas rotas
    function navigateToNewScreen(TB_CHAT_ID, TB_PESSOA_ID) {
        // Se for pedido pelos parametros para excluir as duas ultimas telas
        if (excluirDuasRotas) {
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
}