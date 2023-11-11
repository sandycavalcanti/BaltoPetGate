import { useCallback, useReducer, useEffect, useState, useRef } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity, ToastAndroid, ActivityIndicator, StatusBar } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavbarChat from '../components/chat/NavbarChat';
import { corBordaBoxCad, urlAPI } from "../constants";
import { useRoute } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from "axios";
import parsePatterns from '../components/chat/parsePatterns';
import FormData from 'form-data';
import ModalMensagem from '../components/chat/ModalMensagem';
import { renderActions, renderBubble, renderChatEmpty, renderComposer, renderCustomView, renderInputToolbar, renderSend, renderSystemMessage, renderTime } from '../components/chat/ChatRenders';

const ActionKind = {
    SEND_MESSAGE: 'SEND_MESSAGE',
    SET_IS_TYPING: 'SET_IS_TYPING',
};

function reducer(state, action) {
    switch (action.type) {
        case ActionKind.SEND_MESSAGE: {
            return { ...state, step: state.step + 1, messages: action.payload };
        }
        case ActionKind.SET_IS_TYPING: {
            return { ...state, isTyping: action.payload };
        }
    }
};

const Chat = () => {
    const route = useRoute();
    const { TB_CHAT_ID, TB_PESSOA_ID } = route.params;

    const TB_PESSOA_IDD = useRef(null)
    const mensagens = useRef([]);
    const dadosChat = useRef({});
    const animais = useRef([]);
    const mensagemSelecionada = useRef({});
    const msgPessoal = useRef(false);
    const msgEmptyChat = useRef('Nenhuma mensagem ainda');
    const editando = useRef(false);
    const respondendo = useRef(false);
    const desativado = useRef(false);
    const podeEditar = useRef(false);
    const podeExcluir = useRef(false)

    const [textoDigitado, setTextoDigitado] = useState('');
    const [alturaViewRespondendo, setAlturaViewRespondendo] = useState(50);
    const [carregando, setCarregando] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    let user = { _id: TB_PESSOA_IDD.current }
    const [state, dispatch] = useReducer(reducer, {
        messages: mensagens.current,
        step: 0,
        isTyping: false,
    });
    const controller = new AbortController();

    const SelecionarMensagens = async () => {
        await axios.post(urlAPI + 'selmensagem/filtrar', {
            TB_CHAT_ID
        }, { signal: controller.signal }).then(response => {
            if (response.data) {
                const mensagensBanco = response.data;
                const mensagensGiftedChat = mensagensBanco.map((item) => {
                    let mensagemTexto = item.TB_MENSAGEM_TEXTO;
                    let mensagemAlterada = false;
                    let mensagemImg = null;
                    let mensagemExcluida = !item.TB_MENSAGEM_STATUS;
                    if (item.TB_MENSAGEM_TEXTO_ALTERADO) {
                        mensagemTexto = item.TB_MENSAGEM_TEXTO_ALTERADO;
                        mensagemAlterada = true;
                    }
                    if (item.TB_MENSAGEM_POSSUI_IMG) {
                        mensagemImg = urlAPI + 'selmensagemimg/' + item.TB_MENSAGEM_ID;
                    }
                    return {
                        _id: item.TB_MENSAGEM_ID,
                        text: mensagemTexto,
                        createdAt: new Date(item.createdAt),
                        user: { _id: item.TB_PESSOA_ID },
                        mensagemAlterada: mensagemAlterada,
                        mensagemExcluida: mensagemExcluida,
                        image: mensagemImg,
                        reply_id: item.TB_MENSAGEM_RESPOSTA_ID
                    }
                });
                mensagens.current = mensagensGiftedChat
                dispatch({ type: ActionKind.SEND_MESSAGE, payload: mensagensGiftedChat });
            }
        }).catch(error => {
            if (error.response.status !== 404 && error.response) {
                let erro = error.response.data;
                ToastAndroid.show(erro.message, ToastAndroid.SHORT);
                console.error('Erro ao selecionar:', erro.error);
            }
        });
    };
    const SelecionarInfoChat = async () => {
        await axios.post(urlAPI + 'selchat/filtrar', {
            TB_CHAT_ID,
            TB_PESSOA_ID,
        }, { signal: controller.signal }).then(async response => {
            if (response.data) {
                const dados = response.data.Selecionar[0];
                animais.current = response.data.Animais
                dadosChat.current = dados;
                TB_PESSOA_IDD.current = dados.TB_CHAT_INICIADO ? dados.TB_PESSOA_REMETENTE_ID : dados.TB_PESSOA_DESTINATARIO_ID;
                if (dados.TB_CHAT_STATUS) {
                    msgEmptyChat.current = 'Nenhuma mensagem ainda';
                    desativado.current = false;
                    await SelecionarMensagens();
                } else {
                    msgEmptyChat.current = "Esse chat foi desativado";
                    desativado.current = true;
                }
            }
        }).catch(error => {
            if (error.response) {
                let erro = error.response.data;
                ToastAndroid.show(erro.message, ToastAndroid.SHORT);
                console.error('Erro ao selecionar:', erro.error);
            }
        });
        setCarregando(false);
    };

    useEffect(() => {
        SelecionarInfoChat();
        return (() => {
            controller.abort();
        })
    }, []);

    const DesativarChat = async () => {
        await axios.put(urlAPI + 'delchat/' + TB_CHAT_ID).then(response => {
            setCarregando(true)
            SelecionarInfoChat();
            dispatch({ type: ActionKind.SEND_MESSAGE, payload: [] });
        }).catch((error) => {
            ToastAndroid.show("Não foi possível desativar o chat", ToastAndroid.SHORT);
            console.error(error.response.data.error, error);
        });
    }
    const DenunciarMensagem = () => {
        console.log('Denuncia');
    }
    const AlterarMensagem = () => {
        editando.current = true;
        respondendo.current = false;
        setTextoDigitado(mensagemSelecionada.current.text);
    }
    const ResponderMensagem = () => {
        editando.current = false
        respondendo.current = true;
    }
    const ExcluirMensagem = async () => {
        const modifiedMessagesDelete = state.messages.map(message => {
            if (message._id === mensagemSelecionada.current._id) {
                return { ...message, mensagemExcluida: true, text: '(Mensagem excluída)' };
            }
            return message;
        });
        const mensagemNula = { "_id": Math.round(Math.random() * 1000000), "createdAt": new Date(), "mensagemAlterada": false, "mensagemExcluida": false, "text": null, "user": user }
        const newMessages = GiftedChat.append(modifiedMessagesDelete, mensagemNula, true);
        await axios.put(urlAPI + 'delmensagem/' + mensagemSelecionada.current._id)
            .then(response => {
                dispatch({ type: ActionKind.SEND_MESSAGE, payload: newMessages });
            }).catch((error) => {
                ToastAndroid.show("Não foi possível excluir a mensagem", ToastAndroid.SHORT);
                console.error(error.response.data.error, error);
            });
    }

    const onSend = useCallback(async (messages) => {
        const sentMessages = [{ ...messages[0] }];
        const texto = sentMessages[0].text
        const imagem = sentMessages[0].image
        if (!texto && !imagem) {
            return;
        }
        if (!editando.current) {
            if (!imagem) { // Enviar ou responder mensagem de texto
                let objetoForm = {
                    TB_CHAT_ID,
                    TB_MENSAGEM_TEXTO: texto,
                    TB_PESSOA_ID: TB_PESSOA_IDD.current,
                }
                if (respondendo.current) {
                    objetoForm.TB_MENSAGEM_RESPOSTA_ID = mensagemSelecionada.current._id;
                }
                await axios.post(urlAPI + 'cadmensagem', objetoForm)
                    .then(response => {
                        const sentMessagesFix = sentMessages[0];
                        sentMessagesFix._id = response.data.Cadastrar.TB_MENSAGEM_ID;
                        sentMessagesFix.image = null;
                        if (respondendo.current) {
                            sentMessagesFix.reply_id = mensagemSelecionada.current._id;
                            setAlturaViewRespondendo(50);
                        }
                        const newMessages = GiftedChat.append(state.messages, sentMessagesFix, true);
                        respondendo.current = false;
                        dispatch({ type: ActionKind.SEND_MESSAGE, payload: newMessages });
                    }).catch(error => {
                        let erro = error.response.data;
                        ToastAndroid.show("Não foi possível enviar a mensagem", ToastAndroid.SHORT);
                        console.error(erro.error);
                    });
            } else { // Enviar ou responder mensagem de imagem
                const formData = new FormData();
                let img = { uri: imagem, type: 'image/jpeg', name: 'image.jpg', };
                formData.append('TB_PESSOA_ID', TB_PESSOA_IDD.current);
                formData.append('TB_CHAT_ID', TB_CHAT_ID);
                formData.append('TB_MENSAGEM_POSSUI_IMG', true);
                formData.append('img', img);
                if (respondendo.current) {
                    formData.append('TB_MENSAGEM_RESPOSTA_ID', mensagemSelecionada.current._id);
                }
                await axios.post(urlAPI + 'cadmensagem', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                }).then(response => {
                    const sentMessagesFix = sentMessages[0];
                    sentMessagesFix._id = response.data.Cadastrar.TB_MENSAGEM_ID;
                    if (respondendo.current) {
                        sentMessagesFix.reply_id = mensagemSelecionada.current._id;
                        setAlturaViewRespondendo(50);
                    }
                    const newMessages = GiftedChat.append(state.messages, sentMessagesFix, true);
                    respondendo.current = false;
                    dispatch({ type: ActionKind.SEND_MESSAGE, payload: newMessages });
                }).catch(error => {
                    let erro = error.response.data;
                    ToastAndroid.show("Não foi possível enviar a imagem", ToastAndroid.SHORT);
                    console.error(erro.error);
                })
            }
        } else {// Editar mensagem de texto
            if (texto != mensagemSelecionada.current.text) { // Se o texto tiver sido modificado
                const modifiedMessages = state.messages.map(message => {
                    if (message._id === mensagemSelecionada.current._id) return { ...message, mensagemAlterada: true, text: texto };
                    return message;
                });
                const mensagemNula = { "_id": Math.round(Math.random() * 1000000), "createdAt": new Date(), "mensagemAlterada": false, "text": null, "user": user }
                const newMessages = GiftedChat.append(modifiedMessages, mensagemNula, true);
                await axios.put(urlAPI + 'altmensagem/' + mensagemSelecionada.current._id, {
                    TB_MENSAGEM_TEXTO_ALTERADO: texto,
                }).then(response => {
                    editando.current = false;
                    dispatch({ type: ActionKind.SEND_MESSAGE, payload: newMessages });
                }).catch(error => {
                    let erro = error.response.data;
                    ToastAndroid.show("Não foi possível enviar a mensagem", ToastAndroid.SHORT);
                    console.error(erro.error, error);
                });
            } else { // Se o texto não tiver sido modificado
                editando.current = false;
            }
        }
    }, [dispatch, state.messages]);
    const onSendCustomActions = (messages = []) => {
        const sentMessages = [{ ...messages[0] }];
        const newMessages = GiftedChat.append(state.messages, sentMessages, true);

        const messagesToUpload = messages.map((message) => ({
            ...message,
            user,
            createdAt: new Date(),
            _id: Math.round(Math.random() * 1000000),
        }));
        onSend(messagesToUpload);
    };
    // const setIsTyping = (isTyping) => { // Escrevendo mensagem (true) ou (false)
    //     dispatch({ type: ActionKind.SET_IS_TYPING, payload: isTyping });
    // };
    const onLongPress = (context, message) => {
        podeExcluir.current = true;
        podeEditar.current = !message.image;
        mensagemSelecionada.current = message;
        msgPessoal.current = message.user._id === user._id;
        if (msgPessoal.current) {
            podeEditar.current = !mensagemSelecionada.current.mensagemAlterada;
            podeExcluir.current = !mensagemSelecionada.current.mensagemExcluida;
        }
        if (podeExcluir.current) {
            setModalVisible(true);
        }
    }
    const [forceUpdate, setForceUpdate] = useState(0);
    const reRender = () => {
        setForceUpdate(prevValue => prevValue + 1);
    };
    return (
        <SafeAreaView style={styles.container}>
            <NavbarChat id={TB_PESSOA_ID} dados={dadosChat.current} animais={animais.current} DesativarChat={DesativarChat} desativado={desativado.current} />
            <View style={styles.content}>
                {carregando ?
                    <View style={styles.carregando}>
                        <ActivityIndicator size="large" color={corBordaBoxCad} />
                    </View> :
                    <>
                        <GiftedChat
                            messages={state.messages}
                            user={user}
                            onSend={onSend}
                            onLongPress={onLongPress}
                            renderSystemMessage={renderSystemMessage}
                            renderCustomView={renderCustomView}
                            renderComposer={renderComposer}
                            renderInputToolbar={props => renderInputToolbar(props, editando, respondendo, desativado, textoDigitado, mensagemSelecionada, setAlturaViewRespondendo)}
                            renderSend={props => renderSend(props, editando, respondendo)}
                            renderBubble={props => renderBubble(props, mensagens, user, mensagemSelecionada, ResponderMensagem, reRender)}
                            renderActions={props => renderActions(props, editando, setTextoDigitado, onSendCustomActions)}
                            renderChatEmpty={() => renderChatEmpty(msgEmptyChat)}
                            keyboardShouldPersistTaps='always'
                            isTyping={state.isTyping}
                            text={textoDigitado}
                            onInputTextChanged={text => setTextoDigitado(text)}
                            infiniteScroll
                            scrollToBottom
                            scrollToBottomComponent={() => <FontAwesome5 name="arrow-down" size={25} color="#9e9e9e" />}
                            maxInputLength={256}
                            parsePatterns={parsePatterns}
                            dateFormat='DD/MM/YYYY'
                            timeFormat='HH:mm'
                            renderTime={props => renderTime(props, user)}
                            renderAvatar={null}
                            minInputToolbarHeight={alturaViewRespondendo}
                            imageStyle={{ width: 200, height: 125 }}
                        />
                        <ModalMensagem val={modalVisible} set={setModalVisible} msgPessoal={msgPessoal.current} podeExcluir={podeExcluir.current} podeEditar={podeEditar.current} alterar={AlterarMensagem} excluir={ExcluirMensagem} responder={ResponderMensagem} denunciar={DenunciarMensagem} />
                        <StatusBar />
                    </>}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    content: {
        backgroundColor: '#bfdde4',
        flex: 1
    },
    carregando: {
        width: '100%',
        height: '100%',
        backgroundColor: '#A9DDE8',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        marginTop: 10,
    },
})

export default Chat