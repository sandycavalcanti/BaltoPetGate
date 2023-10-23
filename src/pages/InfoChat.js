import { useEffect, useState } from 'react'
import { View, StyleSheet, Text, ScrollView, ImageBackground, ToastAndroid, ActivityIndicator } from 'react-native'
import { corTituloCad, urlAPI, corBordaBoxCad } from '../constants';
import BotaoCadastrar from '../components/cadastro/BotaoCadastrar';
import BotaoNegar from '../components/InfoChat/BotaoNegar';
import BotaoAceitar from '../components/InfoChat/BotaoAceitar';
import Questao from '../components/InfoChat/Questao';
import axios from 'axios';
import DecodificarToken from '../utils/DecodificarToken';
import Imagem from '../components/geral/Imagem';
import DropdownAlert, { DropdownAlertData, DropdownAlertType, } from 'react-native-dropdownalert';
import { useNavigation, useRoute } from '@react-navigation/native';
let dadosSolicitacao = [];
let dadosAdocao = dadosTratamento = dadosAbrigo = {};
let TB_PESSOA_IDD = TB_TIPO_IDD = null;
let alert = (_data) => new Promise(res => res);

const InfoChat = () => {
    const route = useRoute();
    const { TB_PESSOA_ID, TB_ANIMAL_ID, dados } = route.params;

    const animalCadastro = dados.TB_ANIMAL_CADASTRADO;
    const [info, setInfo] = useState({});
    const [existeAdocao, setExisteAdocao] = useState(false);
    const [existeAbrigo, setExisteAbrigo] = useState(false);
    const [existeTratamento, setExisteTratamento] = useState(false);

    const PegarId = async () => {
        const decodedToken = await DecodificarToken();
        TB_PESSOA_IDD = decodedToken.TB_PESSOA_IDD;
        TB_TIPO_IDD = decodedToken.TB_TIPO_IDD
    }

    const Selecionar = async () => {
        await axios.get(urlAPI + 'selpessoa/' + TB_PESSOA_ID).then(response => {
            setInfo(response.data[0]);
        }).catch(error => {
            let erro = error.response.data;
            ToastAndroid.show(erro.message, ToastAndroid.SHORT);
            console.error('Erro ao selecionar: ', erro.error, error);
        });
    }

    useEffect(() => {
        PegarId();
        Selecionar();
        SelSolicitacao();
    }, []);

    const urlPessoa = urlAPI + 'selpessoaimg/' + TB_PESSOA_ID;
    const urlAnimal = urlAPI + 'selanimalimg/' + TB_ANIMAL_ID;
    const [carregando, setCarregando] = useState(true);

    const Solicitar = (tipoSolicitacao) => {
        const NovaData = new Date();
        axios.post(urlAPI + 'cadsolicitacao', {
            TB_PESSOA_ID,
            TB_ANIMAL_ID,
            TB_SOLICITACAO_DT_SOLICITACAO: NovaData,
            TB_TIPO_SOLICITACAO_ID: tipoSolicitacao
        }).then(async response => {
            if (tipoSolicitacao == 1) {
                setExisteAdocao(true)
            } if (tipoSolicitacao == 2) {
                setExisteAbrigo(true)
            } if (tipoSolicitacao == 3) {
                setExisteTratamento(true)
            }
            const alertData = await alert({
                type: DropdownAlertType.Info,
                title: 'Solicitação em andamento',
                message: 'Aguardando resposta da solicitação',
            });
        }).catch(error => {
            let erro = error.response.data;
            ToastAndroid.show(erro.message, ToastAndroid.SHORT);
            console.error('Erro ao selecionar: ', erro.error);
        });
    };

    const SelSolicitacao = async () => {
        await axios.post(urlAPI + 'selsolicitacao/filtrar', {
            TB_PESSOA_ID,
            TB_ANIMAL_ID
        }).then(async response => {
            dadosSolicitacao = response.data;
            await dadosSolicitacao.map(item => {
                if (item['TB_TIPO_SOLICITACAO_ID'] == 1) {
                    setExisteAdocao(true)
                    dadosAdocao = item;
                } if (item['TB_TIPO_SOLICITACAO_ID'] == 2) {
                    setExisteAbrigo(true)
                    dadosAbrigo = item;
                } if (item['TB_TIPO_SOLICITACAO_ID'] == 3) {
                    setExisteTratamento(true)
                    dadosTratamento = item;
                }
            })
            setCarregando(false);
        }).catch(error => {
            if (error.response.status !== 404) {
                let erro = error.response.data;
                ToastAndroid.show(erro.message, ToastAndroid.SHORT);
                console.error('Erro ao selecionar: ', erro.error);
            }
        });
    };



    const AlterarSolicitacao = async (tipoSolicitacao, situacao) => {

        let id;
        await dadosSolicitacao.map(item => {
            if (item['TB_TIPO_SOLICITACAO_ID'] == tipoSolicitacao) {
                id = item.TB_SOLICITACAO_ID;
            }
        });
        const url = urlAPI + 'altsolicitacao/' + id;
        await axios.put(url, {
            TB_SOLICITACAO_SITUACAO: situacao
        }).then(response => {
            let textoSolicitacao;
            if (tipoSolicitacao == 1) {
                setExisteAdocao(false)
                textoSolicitacao = 'a adoção';
            } else if (tipoSolicitacao == 2) {
                setExisteAbrigo(false)
                textoSolicitacao = 'o abrigo';
            } else {
                setExisteTratamento(false)
                textoSolicitacao = 'o tratamento';
            }

            if (situacao == 'APROVADA') {
                alert({
                    type: DropdownAlertType.Info,
                    title: 'Solicitação aprovada',
                    message: 'Dentro de 4 dias você receberá uma mensagem de confirmação d' + textoSolicitacao,
                });
            } else {
                alert({
                    type: DropdownAlertType.Info,
                    title: 'Solicitação negada',
                    message: textoSolicitacao + 'foi cancelada',
                });

            }
        }).catch(error => {
            let erro = error.response.data;
            ToastAndroid.show(erro.message, ToastAndroid.SHORT);
            console.error('Erro ao alterar: ', erro.error, error);
        });
    };


    return (
        <View style={styles.Container}>
            <ScrollView>
                <View style={styles.InfoHead}>
                    <View style={styles.ImagemCirculo}>
                        <Imagem url={urlPessoa} />
                    </View>
                    <Text style={styles.Titulo}>Nome da pessoa</Text>
                </View>
                <View style={styles.InfoPet}>
                    <Text style={styles.TituloPet}>Doguinho</Text>
                    <View style={styles.ImagemPet}>
                        <Imagem url={urlAnimal} />
                    </View>
                </View>
                {carregando ? <ActivityIndicator size="large" color={corBordaBoxCad} />
                    :
                    animalCadastro
                        ?

                        <View style={styles.InfoForm}>
                            <Text style={styles.Titulo}>Formulario adoção</Text>
                            <Questao texto='Toda a familia esta ciente e apoia a adoção do animal?' resposta={info.TB_PESSOA_ANIMAL_FAMILIA ? 'Sim' : 'Não'} />
                            <Questao texto='Moradia' resposta={info.TB_PESSOA_ANIMAL_CASA} />
                            <Questao texto='Quantas vezes por semana o animal será levado a passeios?' resposta={info.TB_PESSOA_ANIMAL_PASSEAR} />
                            <Questao texto='Qual a quantidade media de espaço que o animal terá acesso?' resposta={info.TB_PESSOA_ANIMAL_ESPACO} />
                            <Questao texto='Em caso de sua ausência, quem ficará responsável pelo animal?' resposta={info.TB_PESSOA_ANIMAL_AUSENCIA} />
                            <Questao texto='Durante o dia-a-dia, o animal terá acesso a rua?' resposta={info.TB_PESSOA_ANIMAL_RUA ? 'Sim' : 'Não'} />
                            <Questao texto='Quantos animais você possuí em sua casa?' resposta={info.TB_PESSOA_ANIMAL_QUANTIDADE} />

                            {existeAdocao && dadosAdocao['TB_SOLICITACAO_SITUACAO'] == 'EM ANDAMENTO'
                                &&
                                <View style={styles.Botoes}>
                                    <BotaoAceitar onPress={() => AlterarSolicitacao(1, 'APROVADA')} texto='Aceitar solicitação de adoção'></BotaoAceitar>
                                    <BotaoNegar onPress={() => AlterarSolicitacao(1, 'NEGADA')} texto='Negar solicitação de adoção'></BotaoNegar>
                                </View>
                            }
                            {existeAbrigo && dadosAbrigo['TB_SOLICITACAO_SITUACAO'] == 'EM ANDAMENTO'
                                &&
                                <View style={styles.Botoes}>
                                    <BotaoAceitar onPress={() => AlterarSolicitacao(2, 'APROVADA')} texto='Aceitar solicitação de abrigo'></BotaoAceitar>
                                    <BotaoNegar onPress={() => AlterarSolicitacao(2, 'NEGADA')} texto='Negar solicitação de abrigo'></BotaoNegar>
                                </View>
                            }
                            {existeTratamento && dadosTratamento['TB_SOLICITACAO_SITUACAO'] == 'EM ANDAMENTO'
                                &&
                                <View style={styles.Botoes}>
                                    <BotaoAceitar onPress={() => AlterarSolicitacao(3, 'APROVADA')} texto='Aceitar solicitação de cuidados'></BotaoAceitar>
                                    <BotaoNegar onPress={() => AlterarSolicitacao(3, 'NEGADA')} texto='Negar solicitação de cuidados'></BotaoNegar>
                                </View>
                            }

                        </View>
                        :
                        <>
                            {(TB_TIPO_IDD == 1 || TB_TIPO_IDD == 2 || TB_TIPO_IDD == 6)
                                &&
                                !existeAdocao
                                &&
                                <>
                                    <View style={styles.Botao}>
                                        <BotaoCadastrar onPress={() => Solicitar(1)} texto="Quero adotar" />
                                    </View>
                                </>}
                            {(TB_TIPO_IDD == 3 || TB_TIPO_IDD == 4 || TB_TIPO_IDD == 5)
                                &&
                                !existeAbrigo
                                &&
                                <>
                                    <View style={styles.Botao}>
                                        <BotaoCadastrar onPress={() => Solicitar(2)} texto="Oferecer abrigo" />
                                    </View>
                                </>}
                            {(TB_TIPO_IDD == 2 || TB_TIPO_IDD == 3 || TB_TIPO_IDD == 4)
                                &&
                                !existeTratamento
                                &&
                                <>
                                    <View style={styles.Botao}>
                                        <BotaoCadastrar onPress={() => Solicitar(3)} texto="Oferecer tratamentos" />
                                    </View>
                                </>}
                        </>
                }
                <DropdownAlert alert={func => (alert = func)} />
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    Container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#D1BBB2',
    },
    InfoHead: {
        alignItems: 'center',
        width: '100%',
        flexDirection: 'column',
        display: 'flex',
        backgroundColor: '#A9DDAE',
    },
    ImagemCirculo: {
        width: 230,
        height: 230,
        borderRadius: 150,
        borderColor: '#fff',
        borderWidth: 2,
        alignItems: 'center',
        overflow: 'hidden',
        marginTop: 40
    },
    Titulo: {
        fontSize: 25,
        color: '#fff',
        marginBottom: 15,
        marginTop: 15,
    },
    InfoPet: {
        width: '100%',
        backgroundColor: "#CC8F8F",
        borderColor: 'white',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    ImagemPet: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderColor: '#fff',
        borderWidth: 1,
        alignItems: 'center',
        overflow: 'hidden',
        margin: 2
    },
    TituloPet: {
        fontSize: 20,
        color: '#fff',
        marginRight: 20
    },
    InfoForm: {
        alignItems: 'center'
    },
    Botoes: {
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 20
    },
    Botao: {
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingVertical: 20
    }
});

export default InfoChat;