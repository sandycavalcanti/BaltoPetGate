import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, ScrollView, ImageBackground, ToastAndroid } from 'react-native'
import { corTituloCad, urlAPI } from '../constants';
import BotaoCadastrar from '../components/cadastro/BotaoCadastrar';
import BotaoNegar from '../components/InfoChat/BotaoNegar';
import BotaoAceitar from '../components/InfoChat/BotaoAceitar';
import Questao from '../components/InfoChat/Questao';
import axios from 'axios';
import DecodificarToken from '../utils/DecodificarToken';


let dadosAdocao = dadosAbrigo = dadosTratamento = {};
let TB_PESSOA_IDD = TB_TIPO_IDD = null;

export const InfoChat = () => {

    const PegarId = async () => {
        const decodedToken = await DecodificarToken();
        TB_PESSOA_IDD = decodedToken.TB_PESSOA_IDD;
        TB_TIPO_IDD = decodedToken.TB_TIPO_IDD
    }

    const [info, setInfo] = useState({});

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
        if(TB_TIPO_IDD == 1){
            SelAdocao();
        }else if(TB_TIPO_IDD == 2){

        }else if(TB_TIPO_IDD == 3 || 4){
            SelAbrigo();

        }else if(TB_TIPO_IDD == 5){
            SelAbrigo();
        }else{
            SelAdocao();
        }
    }, []);

    const TB_PESSOA_ID = 1;
    const TB_ANIMAL_ID = 4;
    const animalCadastro = false;
    const [ifadocao, setIfadocao] = useState(null);
    const [ifabrigo, setIfabrigo] = useState(null);
    const [iftratamento, setIftratamento] = useState(null);

    const FazerAdocao = () => {
        const NovaData = new Date();
        const dataFormatada = NovaData.toISOString().split('T')[0];
        axios.post(urlAPI + 'cadadocao',{
            TB_PESSOA_ID,
            TB_ANIMAL_ID,
            TB_ADOCAO_DT_ADOCAO: dataFormatada
        }).then(response => {
            setIfadocao(true)
        }).catch(error => {
            let erro = error.response.data;
            ToastAndroid.show(erro.message, ToastAndroid.SHORT);
            console.error('Erro ao selecionar: ', erro.error);
        });
    };
    const Abrigar = () => {
        const NovaData = new Date();
        const dataFormatada = NovaData.toISOString().split('T')[0];
        axios.post(urlAPI + 'cadabrigo',{
            TB_PESSOA_ID,
            TB_ANIMAL_ID,
            TB_ABRIGO_DT_ABRIGO: dataFormatada
        }).then(response => {
            setIfabrigo(true)
        }).catch(error => {
            let erro = error.response.data;
            ToastAndroid.show(erro.message, ToastAndroid.SHORT);
            console.error('Erro ao selecionar: ', erro.error);
        });
    };
    // const FazerTratamento = () => {
    //     const NovaData = new Date();
    //     const dataFormatada = NovaData.toISOString().split('T')[0];
    //     axios.post(urlAPI + 'cadtratamento',{
    //         TB_PESSOA_ID,
    //         TB_ANIMAL_ID,
    //         TB_ADOCAO_DT_ADOCAO: dataFormatada
    //     }).then(response => {
    //         setIfadocao(true)
    //     }).catch(error => {
    //         let erro = error.response.data;
    //         ToastAndroid.show(erro.message, ToastAndroid.SHORT);
    //         console.error('Erro ao selecionar: ', erro.error);
    //     });
    // };

    const SelAdocao = async() => {
        await axios.post(urlAPI + 'seladocao/filtrar', {
            TB_PESSOA_ID,
            TB_ANIMAL_ID
        }).then(response => {
            dadosAdocao = response.data[0];
            setIfadocao(true);
        }).catch(error => {
            if(error.response.status == 404){
                setIfadocao(false);
            }else{
            let erro = error.response.data;
            ToastAndroid.show(erro.message, ToastAndroid.SHORT);
            console.error('Erro ao selecionar: ', erro.error);
            }
        });
    };  
    const SelAbrigo = async() => {
        await axios.post(urlAPI + 'selabrigo/filtrar', {
            TB_PESSOA_ID,
            TB_ANIMAL_ID
        }).then(response => {
            dadosAbrigo = response.data[0];
            setIfabrigo(true);
        }).catch(error => {
            if(error.response.status == 404){
                setIfabrigo(false);
            }else{
            let erro = error.response.data;
            ToastAndroid.show(erro.message, ToastAndroid.SHORT);
            console.error('Erro ao selecionar: ', erro.error);
            }
        });
    };  

    const AlterarAdocao = async(situacao) => {
        const url = urlAPI + 'altadocao/' + dadosAdocao['TB_ADOCAO_ID'];
        await axios.put(url, {
            TB_ADOCAO_SITUACAO: situacao
        }).then(response => {
            setIfadocao(false);
        }).catch(error => {
            let erro = error.response.data;
            ToastAndroid.show(erro.message, ToastAndroid.SHORT);
            console.error('Erro ao alterar: ', erro.error, error);
        });
    };
    const AlterarAbrigo = async(situacao) => {
        const url = urlAPI + 'altabrigo/' + dadosAbrigo['TB_ABRIGO_ID'];
        await axios.put(url, {
            TB_ABRIGO_SITUACAO: situacao
        }).then(response => {
            setIfabrigo(false);
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
                        <Questao texto='Moradia' resposta={info.TB_PESSOA_ANIMAL_CASA}  />
                        <Questao texto='Quantas vezes por semana o animal será levado a passeios?' resposta={info.TB_PESSOA_ANIMAL_PASSEAR}/>
                        <Questao texto='Qual a quantidade media de espaço que o animal terá acesso?' resposta={info.TB_PESSOA_ANIMAL_ESPACO}/>
                        <Questao texto='Em caso de sua ausência, quem ficará responsável pelo animal?' resposta={info.TB_PESSOA_ANIMAL_AUSENCIA}/>
                        <Questao texto='Durante o dia-a-dia, o animal terá acesso a rua?' resposta={info.TB_PESSOA_ANIMAL_RUA ? 'Sim' : 'Não'}/>
                        <Questao texto='Quantos animais você possuí em sua casa?' resposta={info.TB_PESSOA_ANIMAL_QUANTIDADE}/>

                    {ifadocao && dadosAdocao['TB_ADOCAO_SITUACAO'] == 'EM ANDAMENTO'
                    ?
                    <View style={styles.Botoes}>
                        <BotaoAceitar onPress={() => AlterarAdocao('Aprovada')} texto='Aceitar solicitação de adoção'></BotaoAceitar>
                        <BotaoNegar onPress={() => AlterarAdocao('Negada')} texto='Negar solicitação de adoção'></BotaoNegar>
                    </View>
                    : null
                    }

                </View>
                :
                !ifadocao 
                ?
                    <View style={styles.Botao}>
                        <BotaoCadastrar onPress={FazerAdocao} texto="Quero adotar"/>
                    </View>
                :
                null
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
    Botao:{
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingVertical: 20
    }
});
export default InfoChat;
