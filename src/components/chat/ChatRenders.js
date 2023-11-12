import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { Bubble, Composer, InputToolbar, MessageText, Send, SystemMessage, Time, MessageImage } from "react-native-gifted-chat";
import CustomActions from "./CustomActions";
import { AntDesign } from '@expo/vector-icons';
import CustomView from "./CustomView";
import SwipeableMessage from "./SwipeableMessage";

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

function contarLetrasHorizontais(texto) {
    if (texto) {
        const linhas = texto.split('\n');
        let maiorQuantidade = 0;
        for (const linha of linhas) {
            const quantidadeDeLetras = linha.length;
            if (quantidadeDeLetras > maiorQuantidade) {
                maiorQuantidade = quantidadeDeLetras;
            }
        }
        return maiorQuantidade;
    }
}

export const renderBubble = (props, mensagens, user, mensagemSelecionada, ResponderMensagem, reRender) => {
    const dados = { ...props };
    let foiExcluida = props.currentMessage.mensagemExcluida;
    let foiAlterada = props.currentMessage.mensagemAlterada;
    let textoResposta = resposta = imagemResposta = quantidadeLetras = null;
    if (foiExcluida) {
        dados.currentMessage = { ...props.currentMessage, text: "(Mensagem excluída)" };
    }
    mensagens.current.map(item => {
        if (item._id == props.currentMessage.reply_id) {
            if (item.text) {
                textoResposta = item.text;
            } else {
                imagemResposta = item.image;
            }
        }
    })
    const texto = props.currentMessage.text;
    let possuiResposta = textoResposta || imagemResposta;
    if (possuiResposta) {
        resposta = { ...props };
        resposta.renderTime = () => <></>;
        resposta.image = imagemResposta;
        quantidadeLetras = contarLetrasHorizontais(texto);
    }

    const estaNoLadoEsquerdo = props.position == 'left';

    let pessoal = dados.currentMessage.user._id == user._id;
    const AoDeslizarMensagem = () => {
        mensagemSelecionada.current = props.currentMessage;
        ResponderMensagem();
        reRender();
    }

    let mensagemExiste = props.currentMessage.text || props.currentMessage.image;
    return (
        <>
            {mensagemExiste &&
                <View style={{ flexDirection: 'column' }}>
                    {possuiResposta &&
                        <View style={{ width: '100%', flexDirection: estaNoLadoEsquerdo ? 'row-reverse' : 'row', marginTop: 2 }}>
                            {(quantidadeLetras > 8 || (quantidadeLetras > 5 && foiAlterada)) && <View style={{ width: 60 }}></View>}
                            <View style={[styles.bubbleRespondendo, { padding: imagemResposta ? 0 : 5, flex: imagemResposta ? 0 : 1, backgroundColor: estaNoLadoEsquerdo ? '#B0B0B0' : '#E0E0E0', alignSelf: estaNoLadoEsquerdo ? 'flex-start' : 'flex-end' }]}>
                                <Text style={[{ color: estaNoLadoEsquerdo ? '#fdfdfd' : '#505050', padding: imagemResposta ? 5 : 0 }]}>Respondendo:</Text>
                                {textoResposta && <Text style={[{ color: estaNoLadoEsquerdo ? '#fafafa' : '#020202', fontSize: 16 }]}>{textoResposta}</Text>}
                                {imagemResposta && <MessageImage currentMessage={resposta} />}
                            </View>
                        </View>}
                    <SwipeableMessage enabled={!pessoal} onActivated={AoDeslizarMensagem}>
                        <Bubble {...dados} wrapperStyle={{ left: { backgroundColor: '#fafafa' }, right: { backgroundColor: '#E6C3C3' } }} textStyle={{ left: foiExcluida && { fontStyle: 'italic', color: '#505050' }, right: foiExcluida && { fontStyle: 'italic', color: '#ededed' } }} />
                    </SwipeableMessage>
                </View>}
        </>
    )
}

export const renderInputToolbar = (props, editando, respondendo, desativado, textoDigitado, mensagemSelecionada, setAlturaViewRespondendo) => {
    const Fechar = () => {
        respondendo.current = false;
        setAlturaViewRespondendo(50);
    }
    const MedirAltura = (event) => {
        let alturaViewRespondendo = Math.round(event.nativeEvent.layout.height);
        setAlturaViewRespondendo(50 + alturaViewRespondendo);
    }
    let respondendoImagem = mensagemSelecionada.current.image;
    let respondendoTexto = mensagemSelecionada.current.text;

    return (
        <>
            {!desativado.current &&
                <>
                    {editando.current &&
                        <View style={styles.containerEditando}>
                            <Text style={styles.textoEditando}>Você só pode editar a mensagem uma vez</Text>
                        </View>}
                    {respondendo.current &&
                        <View style={[styles.containerRespondendo, { minWidth: textoDigitado ? windowWidth - 150 : windowWidth - 70 }]} onLayout={MedirAltura}>
                            <Text>Respondendo a:</Text>
                            <AntDesign name="close" size={25} color="#9e9e9e" style={{ position: 'absolute', top: 5, right: 5 }} onPress={Fechar} />
                            {!respondendoImagem ?
                                <Text style={styles.textoRespondendo}>{respondendoTexto}</Text> :
                                <Image source={{ uri: respondendoImagem }} resizeMode="cover" style={{ aspectRatio: 1, height: 100 }} />}
                        </View>}
                    <InputToolbar {...props} containerStyle={styles.barraInput} />
                </>
            }
        </>
    )
}

export const renderTime = (props, user) => {
    const dados = { ...props };
    dados.currentMessage = { ...props.currentMessage, text: "(Editada)" };
    let pessoal = dados.currentMessage.user._id == user._id;
    let foiExcluida = dados.currentMessage.mensagemExcluida;
    let foiAlterada = dados.currentMessage.mensagemAlterada;
    return (
        <View style={{ flexDirection: pessoal ? 'row' : 'row-reverse' }}>
            {foiAlterada && !foiExcluida && <MessageText {...dados} containerStyle={{ left: { marginTop: -8, marginLeft: -10 }, right: { marginTop: -8, marginRight: -10 } }} textStyle={{ left: { color: '#3a3a3a', fontSize: 14 }, right: { color: '#fafafa', fontSize: 14 } }} />}
            <Time {...props} timeTextStyle={{ left: { color: '#3a3a3a', fontSize: 12 }, right: { color: '#fafafa', fontSize: 12 } }} />
        </View>
    )
}

export const renderSend = (props, editando, respondendo) => {
    return (
        <Send {...props} containerStyle={{ justifyContent: 'center' }}>
            <View style={styles.enviarContainer}>
                <Text style={{ fontSize: 16 }}>{editando.current ? 'Editar' : respondendo.current ? 'Responder' : 'Enviar'}</Text>
            </View>
        </Send>
    );
};

export const renderActions = (props, editando, setTextoDigitado, onSendCustomActions) => {
    const Fechar = () => {
        editando.current = false;
        setTextoDigitado('');
    }
    return (
        <>
            {editando.current ?
                <AntDesign name="close" size={35} color="#9e9e9e" style={{ marginLeft: 10, marginBottom: 7 }} onPress={Fechar} />
                :
                <CustomActions {...props} onSend={onSendCustomActions} />}
        </>
    )
}

export const renderChatEmpty = (msgEmptyChat) => {
    return (
        <View style={styles.emptyChat}>
            <Text style={styles.emptyChatText}>{msgEmptyChat.current}</Text>
        </View>
    )
}

export const renderSystemMessage = (props) => {
    return (
        <SystemMessage {...props} containerStyle={{ marginBottom: 15 }} textStyle={{ fontSize: 16, textAlign: 'center', color: '#222' }} />
    )
}

export const renderComposer = (props) => {
    return (
        <Composer {...props} textInputStyle={styles.inputMensagem} placeholder={'Escreva uma mensagem'} />
    )
}

export const renderCustomView = (props) => {
    return (
        <CustomView {...props} />
    )
}

const styles = StyleSheet.create({
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
        backgroundColor: '#ffffff',
        marginRight: 5,
        borderRadius: 10,
        fontSize: 16,
        paddingLeft: 10,
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
    },
    bubbleRespondendo: {
        borderRadius: 10,
    },
})