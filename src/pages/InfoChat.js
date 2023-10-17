import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, ScrollView, ImageBackground, ToastAndroid } from 'react-native'
import { corTituloCad, urlAPI } from '../constants';
import BotaoCadastrar from '../components/cadastro/BotaoCadastrar';
import BotaoNegar from '../components/InfoChat/BotaoNegar';
import BotaoAceitar from '../components/InfoChat/BotaoAceitar';
import Questao from '../components/InfoChat/Questao';
import axios from 'axios';
import DecodificarToken from '../utils/DecodificarToken';

let dadosSolicitacao = {};
let TB_PESSOA_IDD = TB_TIPO_IDD = null;

const InfoChat = () => {
    const [info, setInfo] = useState({});

    const PegarId = async () => {
        const decodedToken = await DecodificarToken();
        TB_PESSOA_IDD = decodedToken.TB_PESSOA_IDD;
        TB_TIPO_IDD = decodedToken.TB_TIPO_IDD
    }


    const Selecionar = () => {
        axios.get(urlAPI + 'selpessoa/1').then(response => {
            setInfo(response.data[0]);
        }).catch(error => {
            let erro = error.response.data;
            ToastAndroid.show(erro.message, ToastAndroid.SHORT);
            console.error('Erro ao selecionar: ', erro.error);
        });
    }

    useEffect(() => {
        PegarId();
        Selecionar();
 
    }, []);

    const TB_PESSOA_ID = 1;
    const TB_ANIMAL_ID = 4;
    const animalCadastro = false;
    const [solicitacao, setSolicitacao] = useState(null);

    const Solicitar = (tipoSolicitacao) => {
        const NovaData = new Date();
        const dataFormatada = NovaData.toISOString().split('T')[0];
        axios.post(urlAPI + 'cadsolicitacao', {
            TB_PESSOA_ID,
            TB_ANIMAL_ID,
            TB_SOLICITACAO_DT_SOLICITACAO: dataFormatada,
            TB_TIPO_SOLICITACAO_ID: tipoSolicitacao
        }).then(response => {
            setSolicitacao(true)
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
        }).then(response => {
            dadosSolicitacao = response.data;
            setSolicitacao(true);
        }).catch(error => {
            if (error.response.status == 404) {
                setSolicitacao(false);
            } else {
                let erro = error.response.data;
                ToastAndroid.show(erro.message, ToastAndroid.SHORT);
                console.error('Erro ao selecionar: ', erro.error);
            }
        });
    };

    const AlterarSolicitacao = async (situacao) => {
        const url = urlAPI + 'altsolicitacao/' + dadosSolicitacao['TB_SOLICITACAO_ID'];
        await axios.put(url, {
            TB_SOLICITACAO_SITUACAO: situacao
        }).then(response => {
            setSolicitacao(false);
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
                    </View>
                    <Text style={styles.Titulo}>Nome da pessoa</Text>
                </View>
                <View style={styles.InfoPet}>
                    <Text style={styles.TituloPet}>Doguinho</Text>
                    <View style={styles.ImagemPet}>
                    </View>
                </View>
                {animalCadastro
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

                        {/* {ifadocao && dadosAdocao['TB_ADOCAO_SITUACAO'] == 'EM ANDAMENTO'
                            ?
                            <View style={styles.Botoes}>
                                <BotaoAceitar onPress={() => AlterarAdocao('Aprovada')} texto='Aceitar solicitação de adoção'></BotaoAceitar>
                                <BotaoNegar onPress={() => AlterarAdocao('Negada')} texto='Negar solicitação de adoção'></BotaoNegar>
                            </View>
                            : null
                        } */}

                    </View>
                    :
                    // !ifadocao
                    //     ?
                    //     <View style={styles.Botao}>
                    //         <BotaoCadastrar onPress={FazerAdocao} texto="Quero adotar" />
                    //     </View>
                    //     :
                    //     null
                }
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