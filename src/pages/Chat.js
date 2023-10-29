import { useCallback, useReducer, useEffect, useState, useRef } from 'react';
import { Alert, Linking, StyleSheet, Text, View, TouchableOpacity, TextInput, Dimensions, Image, ScrollView, ToastAndroid, ActivityIndicator } from 'react-native';
import { Bubble, Composer, GiftedChat, InputToolbar, MessageImage, Send, SystemMessage, Time, MessageText } from 'react-native-gifted-chat';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavbarChat from '../components/chat/NavbarChat';
import AccessoryBar from '../components/chat/AccessoryBar';
import CustomActions from '../components/chat/CustomActions';
import CustomView from '../components/chat/CustomView';
import { corBordaBoxCad, urlAPI } from "../constants";
import { useRoute } from '@react-navigation/native';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import axios from "axios";
import socket from "../utils/Socket";
import parsePatterns from '../components/chat/parsePatterns';
import FormData from 'form-data';
import ModalMensagem from '../components/chat/ModalMensagem';

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
}

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

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
    const [carregando, setCarregando] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    let user = { _id: TB_PESSOA_IDD.current }
    const [state, dispatch] = useReducer(reducer, {
        messages: mensagens.current,
        step: 0,
        isTyping: false,
    });

    const SelecionarMensagens = async () => {
        await axios.post(urlAPI + 'selmensagem/filtrar', {
            TB_CHAT_ID
        }).then(response => {
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
        }).catch(error => {
            if (error.response.status !== 404) {
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
        }).then(async response => {
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
        }).catch(error => {
            let erro = error.response.data;
            ToastAndroid.show(erro.message, ToastAndroid.SHORT);
            console.error('Erro ao selecionar:', erro.error);
        });
        setCarregando(false);
    };

    useEffect(() => {
        SelecionarInfoChat();
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
        setTextoDigitado(prev => { return prev });
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
            if (!respondendo) {
                if (!imagem) { // Cadastrar mensagem de texto
                    console.log('2a')
                    await axios.post(urlAPI + 'cadmensagem', {
                        TB_CHAT_ID,
                        TB_MENSAGEM_TEXTO: texto,
                        TB_PESSOA_ID: TB_PESSOA_IDD.current,
                    }).then(response => {
                        // socket.emit("newMessage", {
                        // 	message,
                        // 	room_id: id,
                        // 	user,
                        // 	timestamp: { hour, mins },
                        // });
                        const messageSentId = response.data.Cadastrar.TB_MENSAGEM_ID;
                        const sentMessagesFixId = sentMessages.map(message => {
                            return { ...message, _id: messageSentId, image: null };
                        });
                        const newMessages = GiftedChat.append(state.messages, sentMessagesFixId, true);
                        dispatch({ type: ActionKind.SEND_MESSAGE, payload: newMessages });
                    }).catch(error => {
                        let erro = error.response.data;
                        ToastAndroid.show("Não foi possível enviar a mensagem", ToastAndroid.SHORT);
                        console.error(erro.error);
                    });
                } else { // Cadastrar mensagem de imagem
                    const formData = new FormData();
                    let img = { uri: imagem, type: 'image/jpeg', name: 'image.jpg', };
                    formData.append('TB_PESSOA_ID', TB_PESSOA_IDD.current);
                    formData.append('TB_CHAT_ID', TB_CHAT_ID);
                    formData.append('TB_MENSAGEM_POSSUI_IMG', true);
                    formData.append('img', img);

                    await axios.post(urlAPI + 'cadmensagem', formData, {
                        headers: { 'Content-Type': 'multipart/form-data' },
                    }).then(response => {
                        const messageSentId = response.data.Cadastrar.TB_MENSAGEM_ID;
                        const sentMessagesFixId = sentMessages.map(message => {
                            return { ...message, _id: messageSentId };
                        });
                        const newMessages = GiftedChat.append(state.messages, sentMessagesFixId, true);
                        dispatch({ type: ActionKind.SEND_MESSAGE, payload: newMessages });
                    }).catch(error => {
                        let erro = error.response.data;
                        ToastAndroid.show("Não foi possível enviar a imagem", ToastAndroid.SHORT);
                        console.error(erro.error);
                    })
                }
            } else { // Respondendo uma mensagem
                await axios.post(urlAPI + 'cadmensagem', {
                    TB_CHAT_ID,
                    TB_MENSAGEM_TEXTO: texto,
                    TB_MENSAGEM_RESPOSTA_ID: mensagemSelecionada.current._id,
                    TB_PESSOA_ID: TB_PESSOA_IDD.current,
                }).then(response => {
                    const messageSentId = response.data.Cadastrar.TB_MENSAGEM_ID;
                    const sentMessagesFixId = sentMessages.map(message => {
                        return { ...message, _id: messageSentId, image: null, reply_id: mensagemSelecionada.current._id };
                    });
                    const newMessages = GiftedChat.append(state.messages, sentMessagesFixId, true);
                    respondendo.current = false;
                    dispatch({ type: ActionKind.SEND_MESSAGE, payload: newMessages });
                }).catch(error => {
                    let erro = error.response.data;
                    ToastAndroid.show("Não foi possível enviar a mensagem", ToastAndroid.SHORT);
                    console.error(erro.error, error);
                });
            }
        } else { // Editar mensagem de texto
            if (texto != mensagemSelecionada.current.text) {
                const modifiedMessages = state.messages.map(message => {
                    if (message._id === mensagemSelecionada.current._id) return { ...message, mensagemAlterada: true, text: texto };
                    return message;
                });
                const mensagemNula = { "_id": Math.round(Math.random() * 1000000), "createdAt": new Date(), "mensagemAlterada": false, "text": "", "user": user }
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
            } else {
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
        console.log(sentMessages)
        onSend(messagesToUpload);
    };
    const setIsTyping = (isTyping) => {
        dispatch({ type: ActionKind.SET_IS_TYPING, payload: isTyping });
    };
    const renderAccessory = () => <AccessoryBar onSend={onSendCustomActions} isTyping={() => setIsTyping(true)} />
    const renderCustomActions = props => {
        return (<>
            {editando.current ?
                <AntDesign name="close" size={35} color="#9e9e9e" style={{ marginLeft: 10, marginBottom: 7 }} onPress={() => { editando.current = false; setTextoDigitado('') }} />
                :
                <CustomActions {...props} onSend={onSendCustomActions} />}
        </>)
    }
    const renderBubble = props => {
        const dados = { ...props };
        const resposta = { ...props };
        let foiExcluida = props.currentMessage.mensagemExcluida;
        let textoResposta = null;
        if (foiExcluida) {
            dados.currentMessage = { ...props.currentMessage, text: "(Mensagem excluída)" };
        }
        resposta.renderTime = () => <></>;
        mensagens.current.map(item => {
            if (item._id == props.currentMessage.reply_id) {
                textoResposta = item.text;
            }
        })
        let larguraView;
        const MedirLargura = (event) => {
            larguraView = event.nativeEvent.layout.height;
        }
        return (<>
            {(props.currentMessage.text || props.currentMessage.image) &&
                <View style={{ flexDirection: 'column'}}>
                    {textoResposta &&
                        <View style={{ width: '100%', flexDirection: props.position == 'left' ? 'row-reverse' : 'row' }} onLayout={MedirLargura}>
                            {larguraView > 100 && <View style={{ width: 60 }}></View>}
                            <View style={{ backgroundColor: 'white', flex: 1, borderRadius: 10, padding: 5, alignSelf: props.position == 'left' ? 'flex-start' : 'flex-end' }}>
                                <Text>Respondendo a:</Text>
                                <Text>{textoResposta}</Text>
                            </View>
                        </View>}
                    <Bubble {...dados} wrapperStyle={{ left: { backgroundColor: '#fafafa' }, right: { backgroundColor: '#E6C3C3' } }} textStyle={{ left: foiExcluida && { fontStyle: 'italic', color: '#505050' }, right: foiExcluida && { fontStyle: 'italic', color: '#ededed' } }} />
                </View>}
        </>)
    }
    const renderSend = props => {
        return (
            <Send {...props} containerStyle={{ justifyContent: 'center' }}>
                <View style={styles.enviarContainer}>
                    <Text style={{ fontSize: 16 }}>{editando.current ? 'Editar' : respondendo ? 'Responder' : 'Enviar'}</Text>
                </View>
            </Send>
        );
    };
    const onLongPress = (context, message) => {
        podeEditar.current = podeExcluir.current = true;
        mensagemSelecionada.current = message;
        msgPessoal.current = message.user._id === user._id;
        if (msgPessoal.current) {
            podeEditar.current = !mensagemSelecionada.current.mensagemAlterada;
            podeExcluir.current = !mensagemSelecionada.current.mensagemExcluida;
        }
        if (message.image) {
            podeEditar.current = false;
        }
        if (podeExcluir.current) {
            setModalVisible(true);
        }
    }
    const renderTime = (props) => {
        const dados = { ...props };
        dados.currentMessage = { ...props.currentMessage, text: "(Editada)" };
        let pessoal = dados.currentMessage.user._id == user._id;
        let excluida = dados.currentMessage.mensagemExcluida;
        let alterada = dados.currentMessage.mensagemAlterada;
        return (
            <View style={{ flexDirection: pessoal ? 'row' : 'row-reverse' }}>
                {alterada && !excluida && <MessageText {...dados} containerStyle={{ left: { marginTop: -8, marginLeft: -10 }, right: { marginTop: -8, marginRight: -10 } }} textStyle={{ left: { color: '#3a3a3a', fontSize: 14 }, right: { color: '#fafafa', fontSize: 14 } }} />}
                <Time {...props} timeTextStyle={{ left: { color: '#3a3a3a', fontSize: 12 }, right: { color: '#fafafa', fontSize: 12 } }} />
            </View>
        )
    }
    const renderChatEmpty = () => {
        return (
            <View style={styles.emptyChat}>
                <Text style={styles.emptyChatText}>{msgEmptyChat.current}</Text>
            </View>
        )
    }
    const renderInputToolbar = (props) => {
        return (<>
            {!desativado.current && <>
                {editando.current &&
                    <View style={styles.containerEditando}>
                        <Text style={styles.textoEditando}>Você só pode editar a mensagem uma vez</Text>
                    </View>}
                {respondendo.current &&
                    <View style={[styles.containerRespondendo, { minWidth: textoDigitado ? windowWidth - 150 : windowWidth - 70, }]}>
                        <Text>Respondendo a:</Text>
                        <AntDesign name="close" size={25} color="#9e9e9e" style={{ position: 'absolute', top: 5, right: 5 }} onPress={() => { respondendo.current = false; setTextoDigitado(''); }} />
                        <Text style={styles.textoRespondendo}>{mensagemSelecionada.current.text}</Text>
                    </View>}
                <InputToolbar {...props} containerStyle={styles.barraInput} />
            </>}
        </>
        )
    }
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
                            onSend={onSend}
                            user={user}
                            onLongPress={onLongPress}
                            // renderAccessory={renderAccessory}
                            renderActions={renderCustomActions}
                            renderSystemMessage={props => <SystemMessage {...props} containerStyle={{ marginBottom: 15 }} textStyle={{ fontSize: 16, textAlign: 'center', color: '#222' }} />}
                            renderCustomView={props => <CustomView {...props} />}
                            renderInputToolbar={renderInputToolbar}
                            renderComposer={props => <Composer {...props} textInputStyle={styles.inputMensagem} placeholder={'Escreva uma mensagem'} />}
                            renderSend={renderSend}
                            renderAvatar={null}
                            renderBubble={renderBubble}
                            keyboardShouldPersistTaps='never'
                            isTyping={state.isTyping}
                            text={textoDigitado}
                            onInputTextChanged={text => setTextoDigitado(text)}
                            infiniteScroll
                            scrollToBottom
                            scrollToBottomComponent={() => <FontAwesome5 name="arrow-down" size={25} color="#9e9e9e" />}
                            maxInputLength={256}
                            renderChatEmpty={renderChatEmpty}
                            parsePatterns={parsePatterns}
                            dateFormat='DD/MM/YYYY'
                            timeFormat='HH:mm'
                            renderTime={renderTime}
                            inverted={true}
                            minInputToolbarHeight={50}
                        />
                        <ModalMensagem val={modalVisible} set={setModalVisible} msgPessoal={msgPessoal.current} podeExcluir={podeExcluir.current} podeEditar={podeEditar.current} alterar={AlterarMensagem} excluir={ExcluirMensagem} responder={ResponderMensagem} denunciar={DenunciarMensagem} />
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
    enviarContainer: {
        width: 80,
        backgroundColor: '#B9E5D0',
        borderWidth: 1,
        borderColor: '#fff',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    barraInput: {
        backgroundColor: 'transparent',
        margin: 5,
        borderRadius: 10,
        borderColor: 'transparent',
    },
    inputMensagem: {
        backgroundColor: '#fff',
        marginRight: 5,
        borderRadius: 10,
        fontSize: 16,
        paddingLeft: 10,
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
    containerEditando: {
        width: '100%',
        bottom: 25,
    },
    textoEditando: {
        textAlign: 'center',
        color: '#606060',
        marginRight: 25,
    },
    containerRespondendo: {
        position: 'absolute',
        borderRadius: 10,
        bottom: 55,
        backgroundColor: '#c1e6cd',
        left: 60,
        padding: 5,
    },
    textoRespondendo: {
        color: '#606060',
        margin: 'auto',
        paddingVertical: 5,
        fontSize: 16,
    },
    emptyChat: {
        flex: 1,
        transform: [{ scaleX: -1 }],
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyChatText: {
        transform: [{ scaleY: -1 }],
        color: '#444444',
        fontSize: 16,
    }
})

export default Chat
