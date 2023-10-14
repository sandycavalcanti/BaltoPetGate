import { useCallback, useReducer, useEffect, useState } from 'react';
import { Alert, Linking, StyleSheet, Text, View, TouchableOpacity, TextInput, Dimensions, Image, ScrollView, ToastAndroid, ActivityIndicator } from 'react-native';
import { Bubble, Composer, GiftedChat, InputToolbar, MessageImage, Send, SystemMessage, Time, MessageText } from 'react-native-gifted-chat';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Navbar } from '../components/chat/Navbar';
import AccessoryBar from '../components/chat/AccessoryBar';
import CustomActions from '../components/chat/CustomActions';
import CustomView from '../components/chat/CustomView';
import { corBordaBoxCad, urlAPI } from "../constants";
import { useRoute } from '@react-navigation/native';
import { Modal, SlideAnimation } from 'react-native-modals';
import { Divider } from "react-native-elements";
import { FontAwesome5 } from '@expo/vector-icons';
import axios from "axios";
import socket from "../utils/Socket";
import parsePatterns from '../components/chat/parsePatterns';

let TB_PESSOA_IDD = msgPessoal = editando = null;
let mensagemSelecionada = {};

const ActionKind = {
    SEND_MESSAGE: 'SEND_MESSAGE',
    LOAD_EARLIER_MESSAGES: 'LOAD_EARLIER_MESSAGES',
    LOAD_EARLIER_START: 'LOAD_EARLIER_START',
    SET_IS_TYPING: 'SET_IS_TYPING',
};

function reducer(state, action) {
    switch (action.type) {
        case ActionKind.SEND_MESSAGE: {
            return {
                ...state,
                step: state.step + 1,
                messages: action.payload,
            };
        }
        case ActionKind.LOAD_EARLIER_MESSAGES: {
            return {
                ...state,
                loadEarlier: true,
                isLoadingEarlier: false,
                messages: action.payload,
            };
        }
        case ActionKind.LOAD_EARLIER_START: {
            return {
                ...state,
                isLoadingEarlier: true,
            };
        }
        case ActionKind.SET_IS_TYPING: {
            return {
                ...state,
                isTyping: action.payload,
            };
        }
    }
}

const Chat = () => {
    const route = useRoute();
    const { TB_CHAT_ID, TB_PESSOA_ID } = route.params;

    const [dadosChat, setDadosChat] = useState({});
    const [mensagens, setMensagens] = useState([]);
    const [textoDigitado, setTextoDigitado] = useState('');

    const [carregando, setCarregando] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    const SelecionarMensagens = async () => {
        axios.get(urlAPI + 'selmensagem/' + TB_CHAT_ID)
            .then(response => {
                const mensagensBanco = response.data;
                const mensagensGiftedChat = mensagensBanco.map((item) => {
                    let mensagemTexto = '';
                    let mensagemAlterada = false;
                    if (item.TB_MENSAGEM_TEXTO_ALTERADO) {
                        mensagemTexto = item.TB_MENSAGEM_TEXTO_ALTERADO;
                        mensagemAlterada = true;
                    }
                    else { mensagemTexto = item.TB_MENSAGEM_TEXTO }
                    return {
                        _id: item.TB_MENSAGEM_ID,
                        text: mensagemTexto,
                        createdAt: new Date(item.createdAt),
                        user: {
                            _id: item.TB_PESSOA_ID
                        },
                        mensagemAlterada: mensagemAlterada,
                    }
                });
                setMensagens(mensagensGiftedChat);
                setCarregando(false);
                dispatch({ type: ActionKind.SEND_MESSAGE, payload: mensagensGiftedChat });
            }).catch(error => {
                let erro = error.response.data;
                ToastAndroid.show(erro.message, ToastAndroid.SHORT);
                console.error('Erro ao selecionar:', erro.error);
            });
    };

    const SelecionarInfoChat = async () => {
        axios.post(urlAPI + 'selchat/filtrar', {
            TB_CHAT_ID,
            TB_PESSOA_ID,
        }).then((response) => {
            const dados = response.data[0];
            setDadosChat(dados);
            if (dados.TB_CHAT_INICIADO == true) {
                TB_PESSOA_IDD = dados.TB_PESSOA_REMETENTE_ID;
            } else {
                TB_PESSOA_IDD = dados.TB_PESSOA_DESTINATARIO_ID;
            }
        }).catch((error) => {
            let erro = error.response.data;
            ToastAndroid.show(erro.message, ToastAndroid.SHORT);
            console.error('Erro ao selecionar:', erro.error);
        });
    };

    useEffect(() => {
        const Carregar = async () => {
            await SelecionarInfoChat();
            await SelecionarMensagens();
        }
        editando = false;
        Carregar();
    }, []);

    const DenunciarMensagem = () => {
        console.log('Denuncia')
    }
    const AlterarMensagem = () => {
        editando = true;
        setTextoDigitado(mensagemSelecionada.text);
    }
    let user = { _id: TB_PESSOA_IDD }
    const [state, dispatch] = useReducer(reducer, {
        messages: mensagens,
        step: 0,
        loadEarlier: true,
        isLoadingEarlier: false,
        isTyping: false,
    });
    const onSend = useCallback(async (messages) => {
        const sentMessages = [{ ...messages[0] }];
        const texto = sentMessages[0].text
        if (texto) {
            console.log(editando)
            if (editando) {
                if (texto != mensagemSelecionada.text) {
                    const modifiedMessages = state.messages.map(message => {
                        if (message._id === mensagemSelecionada._id) {
                            return { ...message, text: texto };
                        }
                        return message;
                    });
                    const mensagemNula = { "_id": Math.round(Math.random() * 1000000), "createdAt": new Date(), "mensagemAlterada": false, "text": "", "user": user }
                    const newMessages = GiftedChat.append(modifiedMessages, mensagemNula, true);
                    await axios.put(urlAPI + 'altmensagem/' + mensagemSelecionada._id, {
                        TB_MENSAGEM_TEXTO_ALTERADO: texto,
                    }).then(response => {
                        // socket.emit("newMessage", {
                        // 	message,
                        // 	room_id: id,
                        // 	user,
                        // 	timestamp: { hour, mins },
                        // });
                        console.log('Alterado com sucesso')
                        editando = false;
                        dispatch({ type: ActionKind.SEND_MESSAGE, payload: newMessages });
                    }).catch((error) => {
                        let erro = error.response.data;
                        ToastAndroid.show("Não foi possível enviar a mensagem", ToastAndroid.SHORT);
                        console.error(erro.error, error);
                    });
                } else {
                    editando = false;
                }
            } else {
                const newMessages = GiftedChat.append(state.messages, sentMessages, true);
                await axios.post(urlAPI + 'cadmensagem', {
                    TB_CHAT_ID,
                    TB_MENSAGEM_TEXTO: texto,
                    TB_PESSOA_ID: TB_PESSOA_IDD,
                }).then(response => {
                    // socket.emit("newMessage", {
                    // 	message,
                    // 	room_id: id,
                    // 	user,
                    // 	timestamp: { hour, mins },
                    // });
                    dispatch({ type: ActionKind.SEND_MESSAGE, payload: newMessages });
                }).catch((error) => {
                    let erro = error.response.data;
                    ToastAndroid.show("Não foi possível enviar a mensagem", ToastAndroid.SHORT);
                    console.error(erro.error);
                });
            }
        }
    }, [dispatch, state.messages]);
    const onQuickReply = (replies) => {
        const createdAt = new Date();
        if (replies.length === 1) {
            onSend([{
                createdAt,
                _id: Math.round(Math.random() * 1000000),
                text: replies[0].title,
                user,
            }]);
        } else if (replies.length > 1) {
            onSend([{
                createdAt,
                _id: Math.round(Math.random() * 1000000),
                text: replies.map((reply) => reply.title).join(', '),
                user,
            }]);
        } else {
            console.warn('replies param is not set correctly');
        }
    };

    const renderQuickReplySend = () => {
        return <Text>{' custom send =>'}</Text>;
    };

    const setIsTyping = (isTyping) => {
        dispatch({ type: ActionKind.SET_IS_TYPING, payload: isTyping });
    };
    const onSendFromUser = (messages = []) => {
        const sentMessages = [{ ...messages[0] }];
        const newMessages = GiftedChat.append(state.messages, sentMessages, true);

        const messagesToUpload = messages.map((message) => ({
            ...message,
            user,
            createdAt: new Date(),
            _id: Math.round(Math.random() * 1000000),
        }));
        onSend(messagesToUpload);
        console.log('m', messagesToUpload)
    };
    const renderAccessory = () => <AccessoryBar onSend={onSendFromUser} isTyping={() => setIsTyping(true)} />
    const renderCustomActions = props => <CustomActions {...props} onSend={onSendFromUser} />
    const renderSystemMessage = props => <SystemMessage {...props} containerStyle={{ marginBottom: 15 }} textStyle={{ fontSize: 16, textAlign: 'center', color: '#222' }} />
    const renderCustomView = props => <CustomView {...props} />
    const renderBubble = props => <Bubble {...props} wrapperStyle={{ left: { backgroundColor: '#fafafa' }, right: { backgroundColor: '#E6C3C3' } }} />
    const renderSend = props => {
        return (
            <Send {...props} containerStyle={{ justifyContent: 'center' }}>
                <View style={styles.enviarContainer}>
                    <Text style={styles.enviarTexto}>{editando ? 'Editar' : 'Enviar'}</Text>
                </View>
            </Send>
        );
    };
    const renderInputToolbar = props => <><InputToolbar {...props} containerStyle={styles.barraInput} /></>
    const renderComposer = props => <Composer {...props} textInputStyle={styles.inputMensagem} placeholder={'Escreva uma mensagem'} />
    const renderMessageImage = props => {
        <Image />
    }
    const onLongPress = (context, message) => {
        mensagemSelecionada = message;
        if (message.user._id === user._id) {
            if (mensagemSelecionada.mensagemAlterada) {
                msgPessoal = null;
            } else {
                msgPessoal = true
            }
        } else {
            msgPessoal = false
        }
        setModalVisible(true);
    }
    const renderTime = (props) => {
        const dados = { ...props };
        dados.currentMessage = { ...props.currentMessage, text: "(Editada)" };
        let pessoal = dados.currentMessage.user._id == user._id;
        return (
            <View style={{ flexDirection: pessoal ? 'row' : 'row-reverse' }}>
                {props.currentMessage.mensagemAlterada &&
                    <MessageText {...dados} containerStyle={{ left: { marginTop: -8, marginLeft: -10 }, right: { marginTop: -8, marginRight: -10 } }}
                        textStyle={{ left: { color: '#3a3a3a', fontSize: 14 }, right: { color: '#fafafa', fontSize: 14 } }} />}
                <Time {...props} timeTextStyle={{ left: { color: '#3a3a3a', fontSize: 12 }, right: { color: '#fafafa', fontSize: 12 } }} />
            </View>
        )
    }
    const scrollToBottomComponent = (props) => <FontAwesome5 name="arrow-down" size={25} color="#3e3e3e" />
    return (
        <SafeAreaView style={styles.container}>
            <Navbar id={TB_PESSOA_ID} dados={dadosChat} />
            <View style={styles.content}>
                {carregando ?
                    <View style={styles.carregando}>
                        <ActivityIndicator size="large" color={corBordaBoxCad} />
                    </View> :
                    <>
                        <GiftedChat
                            messages={state.messages}
                            onSend={onSend}
                            parsePatterns={parsePatterns}
                            user={user}
                            onLongPress={onLongPress}
                            scrollToBottom
                            // renderAccessory={renderAccessory}
                            onQuickReply={onQuickReply}
                            quickReplyStyle={{ borderRadius: 2 }}
                            quickReplyTextStyle={{ fontWeight: '200' }}
                            renderQuickReplySend={renderQuickReplySend}
                            renderActions={renderCustomActions}
                            renderSystemMessage={renderSystemMessage}
                            renderCustomView={renderCustomView}
                            renderInputToolbar={renderInputToolbar}
                            renderComposer={renderComposer}
                            renderSend={renderSend}
                            renderAvatar={null}
                            renderBubble={renderBubble}
                            keyboardShouldPersistTaps='never'
                            isTyping={state.isTyping}
                            inverted={true}
                            infiniteScroll
                            dateFormat='DD/MM/YYYY'
                            timeFormat='HH:mm'
                            renderTime={renderTime}
                            text={textoDigitado}
                            onInputTextChanged={text => { setTextoDigitado(text); }}
                            scrollToBottomComponent={scrollToBottomComponent}
                        // bottomOffset={150}
                        />
                        {editando &&
                            <View style={styles.containerEditando}>
                                <Text style={styles.textoEditando}>Você só pode editar a mensagem uma vez</Text>
                            </View>
                        }
                        <Modal visible={modalVisible} swipeDirection={['up', 'down']} swipeThreshold={200} onSwipeOut={() => setModalVisible(false)} onTouchOutside={() => setModalVisible(false)} >
                            <View style={styles.dropdown}>
                                <TouchableOpacity style={styles.dropdownButton} >
                                    <Text style={styles.textDropdownButton}>Responder</Text>
                                </TouchableOpacity>
                                <Divider orientation="vertical" width={1} color="grey" />
                                {msgPessoal ?
                                    <TouchableOpacity style={styles.dropdownButton} onPress={() => { AlterarMensagem(); setModalVisible(false) }}>
                                        <Text style={styles.textDropdownButton}>Editar mensagem</Text>
                                    </TouchableOpacity>
                                    : msgPessoal == false &&
                                    <TouchableOpacity style={styles.dropdownButton} onPress={() => { DenunciarMensagem(); setModalVisible(false) }}>
                                        <Text style={styles.textDropdownButton}>Denunciar mensagem</Text>
                                    </TouchableOpacity>
                                }
                                <Divider orientation="vertical" width={1} color="grey" />
                                <TouchableOpacity style={styles.dropdownButton} onPress={() => setModalVisible(false)}>
                                    <Text style={styles.textDropdownButton}>Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>
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
        backgroundColor: '#B9E5D0',
        borderWidth: 1,
        borderColor: '#fff',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        borderRadius: 10
    },
    enviarTexto: {
        fontSize: 18
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
    dropdown: {
        backgroundColor: 'white',
        borderColor: '#B18888',
        borderRadius: 10,
        zIndex: 12,
        borderWidth: 1,
    },
    dropdownButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 220,
        height: 45,
    },
    textDropdownButton: {
        fontSize: 18,
        fontWeight: '400',
    },
    containerEditando: {
        position: 'absolute',
        width: '100%',
        bottom: 50,
    },
    textoEditando: {
        textAlign: 'center',
        color: '#606060'
    }
})

export default Chat
