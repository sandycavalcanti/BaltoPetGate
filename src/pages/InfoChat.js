import { useEffect, useRef, useState } from 'react'
import { View, StyleSheet, Text, ScrollView, ImageBackground, ToastAndroid, ActivityIndicator } from 'react-native'
import { corTituloCad, urlAPI, corBordaBoxCad } from '../constants';
import Questao from '../components/InfoChat/Questao';
import axios from 'axios';
import DecodificarToken from '../utils/DecodificarToken';
import Solicitacao from '../components/InfoChat/Solicitacao';
import Imagem from '../components/geral/Imagem';
import DropdownAlert from 'react-native-dropdownalert';
import { useNavigation, useRoute } from '@react-navigation/native';
import AlterarSolicitacao from '../components/InfoChat/AlterarSolicitacao';
let alert = (_data) => new Promise(res => res);

const InfoChat = () => {
    const route = useRoute();
    const { TB_PESSOA_ID, TB_PESSOA_NOME_PERFIL, dados, animais } = route.params;
    const animalCadastro = dados.TB_ANIMAL_CADASTRADO;
    const info = useRef({})
    const TB_PESSOA_IDD = useRef(null);
    const TB_TIPO_IDD = useRef(null);

    const PegarId = async () => {
        const decodedToken = await DecodificarToken();
        TB_PESSOA_IDD.current = decodedToken.TB_PESSOA_IDD;
        TB_TIPO_IDD.current = decodedToken.TB_TIPO_IDD
    }

    const Selecionar = async () => {
        await axios.get(urlAPI + 'selpessoa/' + TB_PESSOA_ID).then(response => {
            info.current = response.data[0];
            setCarregando(false)
        }).catch(error => {
            let erro = error.response.data;
            ToastAndroid.show(erro.message, ToastAndroid.SHORT);
            console.error('Erro ao selecionar: ', erro.error, error);
        });
    }

    useEffect(() => {
        PegarId();
        Selecionar();
    }, []);

    const urlPessoa = urlAPI + 'selpessoaimg/' + TB_PESSOA_ID;
    const [carregando, setCarregando] = useState(true);

    return (
        <View style={styles.Container}>
            <ScrollView>
                <View style={styles.InfoHead}>
                    <View style={styles.ImagemCirculo}>
                        <Imagem url={urlPessoa} style={styles.Imagem} />
                    </View>
                    <Text style={styles.Titulo}>{TB_PESSOA_NOME_PERFIL}</Text>
                </View>

                {carregando ? <ActivityIndicator size="large" color={corBordaBoxCad} />
                    :
                    animalCadastro
                        ?

                        <View style={styles.InfoForm}>
                            <Text style={styles.Titulo}>Formulario adoção</Text>
                            <Questao texto='Toda a fámilia esta ciente e apoia a adoção do animal?' resposta={info.current.TB_PESSOA_ANIMAL_FAMILIA ? 'Sim' : 'Não'} />
                            <Questao texto='Moradia' resposta={info.current.TB_PESSOA_ANIMAL_CASA} />
                            <Questao texto='Quantas vezes por semana o animal será levado a passeios?' resposta={info.current.TB_PESSOA_ANIMAL_PASSEAR} />
                            <Questao texto='Qual a quantidade média de espaço que o animal terá acesso?' resposta={info.current.TB_PESSOA_ANIMAL_ESPACO} />
                            <Questao texto='Em caso de sua ausência, quem ficará responsável pelo animal?' resposta={info.current.TB_PESSOA_ANIMAL_AUSENCIA} />
                            <Questao texto='Durante o dia-a-dia, o animal terá acesso a rua?' resposta={info.current.TB_PESSOA_ANIMAL_RUA ? 'Sim' : 'Não'} />
                            <Questao texto='Quantos animais você possui em sua casa?' resposta={info.current.TB_PESSOA_ANIMAL_QUANTIDADE} />

                            {animais.map(item => {
                                return (
                                    <AlterarSolicitacao key={item.TB_ANIMAL_ID} TB_ANIMAL_ID={item.TB_ANIMAL_ID} TB_PESSOA_ID={TB_PESSOA_ID} nome={item['TB_ANIMAL.TB_ANIMAL_NOME']} alert={alert} />
                                );
                            })}

                        </View>
                        :
                        animais.map(item => {
                            return (
                                <Solicitacao key={item.TB_ANIMAL_ID} TB_ANIMAL_ID={item.TB_ANIMAL_ID} nome={item['TB_ANIMAL.TB_ANIMAL_NOME']} TB_PESSOA_ID={TB_PESSOA_IDD.current} TB_TIPO_IDD={TB_TIPO_IDD.current} alert={alert} />
                            );
                        })
                }
            </ScrollView>
            <DropdownAlert alert={func => (alert = func)} />
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
        paddingTop: 30
    },
    ImagemCirculo: {
        width: 230,
        height: 230,
        borderRadius: 150,
        borderColor: '#fff',
        borderWidth: 2,
        alignItems: 'center',
        overflow: 'hidden',
    },
    Imagem: {
        width: 230,
        height: 230,
        borderRadius: 150,
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