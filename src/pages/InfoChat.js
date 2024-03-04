import { useEffect, useRef, useState } from 'react'
import { View, StyleSheet, Text, ScrollView, ImageBackground, ToastAndroid, ActivityIndicator, StatusBar } from 'react-native'
import { urlAPI, corBordaBoxCad } from '../constants';
import Questao from '../components/InfoChat/Questao';
import axios from 'axios';
import DecodificarToken from '../utils/DecodificarToken';
import Solicitacao from '../components/InfoChat/Solicitacao';
import Imagem from '../components/geral/Imagem';
import DropdownAlert from 'react-native-dropdownalert';
import { useRoute } from '@react-navigation/native';
import AlterarSolicitacao from '../components/InfoChat/AlterarSolicitacao';
import FormatarTextoBanco from '../utils/FormatarTextoBanco';
import CatchError from '../utils/CatchError';
import RetornarTipoNome from '../utils/RetornarTipoNome';

let alert = (_data) => new Promise(res => res);

const InfoChat = () => {
    const route = useRoute();
    const { dadosPessoa, dados, animais } = route.params;
    const TB_PESSOA_ID = dadosPessoa.TB_PESSOA_ID;
    const TB_PESSOA_NOME_PERFIL = dadosPessoa.TB_PESSOA_NOME_PERFIL;
    const TB_TIPO_ID = dadosPessoa.TB_TIPO_ID;
    const animalCadastro = dados.TB_ANIMAL_CADASTRADO;
    const info = useRef({})
    const TB_PESSOA_IDD = useRef(null);
    const TB_TIPO_IDD = useRef(null);
    const [carregando, setCarregando] = useState(true);
    const controller = new AbortController();

    const PegarId = async () => {
        const decodedToken = await DecodificarToken();
        TB_PESSOA_IDD.current = decodedToken.TB_PESSOA_IDD;
        TB_TIPO_IDD.current = decodedToken.TB_TIPO_IDD
    }

    const Selecionar = async () => {
        await axios.get(urlAPI + 'selpessoa/' + TB_PESSOA_ID, { signal: controller.signal })
            .then(response => {
                info.current = response.data[0];
                setCarregando(false)
            }).catch(CatchError);
    }

    useEffect(() => {
        PegarId();
        Selecionar();
        return (() => {
            controller.abort();
        })
    }, []);

    return (
        <View style={styles.Container}>
            <ScrollView>
                <View style={styles.InfoHead}>
                    <View style={styles.ImagemCirculo}>
                        <Imagem id={TB_PESSOA_ID} style={styles.Imagem} existe={dadosPessoa.TB_PESSOA_POSSUI_IMG} />
                    </View>
                    <Text style={styles.Titulo}>{TB_PESSOA_NOME_PERFIL}</Text>
                    {TB_TIPO_ID != 1 && <Text style={styles.tipoUsuario}>{RetornarTipoNome(TB_TIPO_ID)}</Text>}
                </View>

                {carregando ? <ActivityIndicator size="large" color={corBordaBoxCad} />
                    :
                    animalCadastro
                        ? // Caso o usuário que estiver usando for quem cadastrou o animal
                        <View style={styles.InfoForm}>
                            {TB_TIPO_ID == 1 && // Mostrar formulário apenas se o tipo da outra pessoa for 1
                                <>
                                    <Text style={styles.Titulo}>Formulario adoção</Text>
                                    <Questao texto='Toda a fámilia esta ciente e apoia a adoção do animal?' resposta={info.current.TB_PESSOA_ANIMAL_FAMILIA ? 'Sim' : 'Não'} />
                                    <Questao texto='Moradia' resposta={FormatarTextoBanco(info.current.TB_PESSOA_ANIMAL_CASA)} />
                                    <Questao texto='Quantas vezes por semana o animal será levado a passeios?' resposta={info.current.TB_PESSOA_ANIMAL_PASSEAR} />
                                    <Questao texto='Qual a quantidade média de espaço que o animal terá acesso?' resposta={FormatarTextoBanco(info.current.TB_PESSOA_ANIMAL_ESPACO)} />
                                    <Questao texto='Em caso de sua ausência, quem ficará responsável pelo animal?' resposta={info.current.TB_PESSOA_ANIMAL_AUSENCIA} />
                                    <Questao texto='Durante o dia-a-dia, o animal terá acesso a rua?' resposta={info.current.TB_PESSOA_ANIMAL_RUA ? 'Sim' : 'Não'} />
                                    <Questao texto='Quantos animais você possui em sua casa?' resposta={info.current.TB_PESSOA_ANIMAL_QUANTIDADE} />
                                </>}
                            {animais.map(item => <AlterarSolicitacao key={item.TB_ANIMAL_ID} TB_ANIMAL_ID={item.TB_ANIMAL_ID} TB_PESSOA_ID={TB_PESSOA_ID} nome={item['TB_ANIMAL.TB_ANIMAL_NOME']} alert={alert} />)}
                        </View>
                        : // Caso a outra pessoa for quem cadastrou o animal
                        animais.map(item => <Solicitacao key={item.TB_ANIMAL_ID} TB_ANIMAL_ID={item.TB_ANIMAL_ID} nome={item['TB_ANIMAL.TB_ANIMAL_NOME']} TB_PESSOA_ID={TB_PESSOA_IDD.current} TB_TIPO_IDD={TB_TIPO_IDD.current} alert={alert} />)
                }
            </ScrollView>
            <DropdownAlert alert={func => (alert = func)} />
            <StatusBar animated backgroundColor={'#BFDDE4'} hidden={false} />
        </View>
    )
}
const styles = StyleSheet.create({
    Container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#BFDDE4',
    },
    InfoHead: {
        alignItems: 'center',
        width: '100%',
        flexDirection: 'column',
        display: 'flex',
        paddingTop: 30,
        marginBottom: 15,
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
        marginTop: 15,
        marginBottom: 2,
    },
    InfoForm: {
        alignItems: 'center'
    },
    tipoUsuario: {
        fontStyle: 'italic',
        fontSize: 18,
        color: 'gray',
        textAlign: 'center'
    }
});

export default InfoChat;