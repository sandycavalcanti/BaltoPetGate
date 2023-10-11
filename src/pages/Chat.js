import { useEffect, useState } from "react";
import { TouchableOpacity, TextInput, Text, View, StyleSheet, Dimensions, Image, ScrollView, ToastAndroid } from "react-native";
import { corBordaBoxCad, corBotaoCad, corDicaCad, corFundo, urlAPI } from "../constants";
import { useRoute } from '@react-navigation/native';
import axios from "axios";
import Carregando from "../components/geral/Carregando";
import { SafeAreaView } from "react-native-safe-area-context";
import socket from "../utils/Socket";

let TB_PESSOA_IDD;

const Chat = () => {
    const route = useRoute();
    const { TB_CHAT_ID, TB_PESSOA_ID } = route.params;

    const [dadosChat, setDadosChat] = useState({});
    const [carregando, setCarregando] = useState(true);
    const [urlImg, setUrlImg] = useState('https://via.placeholder.com/100');
    const [mensagens, setMensagens] = useState([]);

    const SelecionarMensagens = async () => {
        axios.get(urlAPI + 'selmensagem/' + TB_CHAT_ID)
            .then(response => {
                setMensagens(response.data);
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
            let url;
            if (dados.TB_CHAT_INICIADO == true) {
                url = urlAPI + 'selpessoaimg/' + dadosChat.TB_PESSOA_DESTINATARIO_ID;
                TB_PESSOA_IDD = dadosChat.TB_PESSOA_REMETENTE_ID;
            } else {
                url = urlAPI + 'selpessoaimg/' + dadosChat.TB_PESSOA_REMETENTE_ID;
                TB_PESSOA_IDD = dadosChat.TB_PESSOA_DESTINATARIO_ID;
            }
            VerificarImg(url)
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
            await setCarregando(false);
        }
        Carregar();
    }, []);

    const VerificarImg = async (url) => {
        try {
            const response = await fetch(url);
            if (response.ok) {
                setUrlImg(url);
            }
        } catch (error) {
            setUrlImg('https://via.placeholder.com/100');
        }
    };

    const [textoMensagem, setTextoMensagem] = useState('');

    const EnviarMensagem = () => {
        axios.post(urlAPI + 'cadmensagem', {
            TB_CHAT_ID,
            TB_MENSAGEM_TEXTO: textoMensagem,
            TB_PESSOA_ID: TB_PESSOA_IDD,
        }).then(response => {
            socket.emit("newMessage", {
				message,
				room_id: id,
				user,
				timestamp: { hour, mins },
			});
        }).catch((error) => {
            let erro = error.response.data;
            ToastAndroid.show(erro.message, ToastAndroid.SHORT);
            console.error(erro.error);
        });
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: corFundo }}>
            {carregando ? <Carregando /> :
                <>
                    <Image source={{ uri: urlImg }} style={styles.contactImage} />
                    <Text>Pessoa do chat: {dadosChat.TB_CHAT_INICIADO ? dadosChat["TB_PESSOA_DESTINATARIO.TB_PESSOA_NOME_PERFIL"] : dadosChat["TB_PESSOA_REMETENTE.TB_PESSOA_NOME_PERFIL"]}</Text>
                    <Text>Você: {dadosChat.TB_CHAT_INICIADO ? dadosChat["TB_PESSOA_REMETENTE.TB_PESSOA_NOME_PERFIL"] : dadosChat["TB_PESSOA_DESTINATARIO.TB_PESSOA_NOME_PERFIL"]}</Text>
                    {mensagens.map(item => {
                        const proprio = item.TB_PESSOA_ID == TB_PESSOA_IDD
                        return (
                            <View key={item.TB_MENSAGEM_ID} style={{ margin: 10, backgroundColor: proprio ? corBotaoCad : corDicaCad }}>
                                <Text>{item.TB_MENSAGEM_TEXTO}</Text>
                                <Text>{item.TB_PESSOA_ID}</Text>
                            </View>
                        )
                    })}
                    <TextInput onChangeText={text => setTextoMensagem(text)} placeholder="Digite sua mensagem" />
                    <TouchableOpacity onPress={EnviarMensagem}>
                        <Text>Enviar</Text>
                    </TouchableOpacity>
                </>}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    contactImage: {
        width: 80,
        height: 80,
        borderRadius: 250,
        borderColor: 'white',
        borderWidth: 1,
    },
    contactName: {
        width: 90,
        paddingVertical: 6,
        fontSize: 18,
        color: "#697C55",
        textAlign: 'center'
    },
});

export default Chat