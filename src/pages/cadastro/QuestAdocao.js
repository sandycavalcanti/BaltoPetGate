import { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TextInput, StatusBar, ActivityIndicator } from 'react-native'
import { useRoute } from '@react-navigation/native';
import CampoSimples from '../../components/cadastro/CampoSimples';
import GroupBox from '../../components/cadastro/GroupBox';
import RadioButton from '../../components/cadastro/RadioButton';
import ContainerCadastro from '../../components/cadastro/ContainerCadastro';
import BotaoQuantidade from '../../components/cadastro/BotaoQuantidade';
import { corBordaBoxCad, corFundoCad, corRosaFraco, urlAPI } from '../../constants';
import axios from 'axios';
import DecodificarToken from '../../utils/DecodificarToken';
import IniciarChat from '../../utils/IniciarChat';
import BotaoCadastrarAnimado from '../../components/cadastro/BotaoCadastrarAnimado';
import AlertPro from 'react-native-alert-pro';
import CatchError from '../../utils/CatchError';
import Mensagem from '../../components/cadastro/Mensagem';

const QuestAdocao = ({ navigation }) => {
    const route = useRoute();
    const { TB_PESSOA_ID, TB_ANIMAL_ID } = route.params;
    const TB_PESSOA_IDD = useRef(null);

    const moradia = useRef('');
    const espaco = useRef('');
    const passear = useRef(0);
    const ausencia = useRef('');
    const acessoRua = useRef();
    const ciente = useRef();
    const quantidade = useRef(0);

    const alertRef = useRef(null);
    const [textoAlert, setTextoAlert] = useState('');
    const [carregando, setCarregando] = useState(true);
    const [mensagem, setMensagem] = useState({});
    const controller = new AbortController();

    const Selecionar = async () => {
        const decodedToken = await DecodificarToken();
        TB_PESSOA_IDD.current = decodedToken.TB_PESSOA_IDD;
        axios.post(urlAPI + 'selpessoa/filtrar', {
            TB_PESSOA_ID: TB_PESSOA_IDD.current
        }).then(response => {
            const dados = response.data[0];
            moradia.current = dados.TB_PESSOA_ANIMAL_CASA;
            espaco.current = dados.TB_PESSOA_ANIMAL_ESPACO;
            passear.current = dados.TB_PESSOA_ANIMAL_PASSEAR ? dados.TB_PESSOA_ANIMAL_PASSEAR : 0;
            ausencia.current = dados.TB_PESSOA_ANIMAL_AUSENCIA;
            ciente.current = dados.TB_PESSOA_ANIMAL_FAMILIA;
            quantidade.current = dados.TB_PESSOA_ANIMAL_QUANTIDADE ? dados.TB_PESSOA_ANIMAL_QUANTIDADE : 0;
            acessoRua.current = dados.TB_PESSOA_ANIMAL_RUA;
            setCarregando(false);
        }).catch(CatchError)
    }

    useEffect(() => {
        Selecionar();
        return (() => {
            controller.abort();
        })
    }, []);

    const Alterar = async () => {
        const camposObrigatorios = [ciente.current, moradia.current, passear.current, espaco.current, ausencia.current, acessoRua.current, quantidade.current];
        const mensagemErro = ValidarCampos(camposObrigatorios);
        if (mensagemErro) {
            setTextoAlert(mensagemErro);
            alertRef.current.open();
        } else {
            InserirDados();
        }
    }

    const ValidarCampos = (array) => {
        if (array.some(campo => campo === undefined || campo === '' || campo === null)) {
            return "Complete todos os campos obrigatórios.";
        }
    }

    const InserirDados = () => {
        const url = urlAPI + 'altpessoa/' + TB_PESSOA_IDD.current;
        axios.put(url, {
            TB_PESSOA_ANIMAL_CASA: moradia.current,
            TB_PESSOA_ANIMAL_ESPACO: espaco.current,
            TB_PESSOA_ANIMAL_PASSEAR: passear.current,
            TB_PESSOA_ANIMAL_AUSENCIA: ausencia.current,
            TB_PESSOA_ANIMAL_FAMILIA: ciente.current,
            TB_PESSOA_ANIMAL_RUA: acessoRua.current,
            TB_PESSOA_ANIMAL_QUANTIDADE: quantidade.current,
        }).then(response => {
            setMensagem({ color: '#fafafa', text: 'Questionário respondido!' })
            setTimeout(() => {
                IniciarChat(TB_PESSOA_IDD.current, TB_PESSOA_ID, navigation, TB_ANIMAL_ID, true)
            }, 1000);
        }).catch(CatchError);
    };

    const SimNao = [true, false];
    const Moradia = ['CASA', 'APARTAMENTO'];
    const Tamanho = ['POUCO', 'MEDIO', 'MUITO'];

    return (
        <ContainerCadastro titulo="Responda a esse questionário">
            {carregando ? <ActivityIndicator size="large" color={corBordaBoxCad} />
                :
                <>
                    <GroupBox titulo='Toda a familia esta ciente e apoia a adoção do animal?'>
                        <RadioButton opcoes={SimNao} setRef={ciente} defaultValue={ciente.current} />
                    </GroupBox>
                    <GroupBox titulo='Moradia'>
                        <RadioButton opcoes={Moradia} setRef={moradia} defaultValue={moradia.current} />
                    </GroupBox>
                    <GroupBox titulo='Quantas vezes por semana o animal será levado a passeios?' >
                        <BotaoQuantidade setRef={passear} limite={14} defaultValue={passear.current} />
                    </GroupBox>
                    <GroupBox titulo='Qual a quantidade media de espaço que o animal terá acesso?' >
                        <RadioButton opcoes={Tamanho} setRef={espaco} defaultValue={espaco.current} />
                    </GroupBox>
                    <GroupBox titulo='Em caso de sua ausência, quem ficará responsável pelo animal?' >
                        <CampoSimples setRef={ausencia} multiline defaultValue={ausencia.current} />
                    </GroupBox>
                    <GroupBox titulo='Durante o dia-a-dia, o animal terá acesso a rua?'>
                        <RadioButton opcoes={SimNao} setRef={acessoRua} defaultValue={acessoRua.current} />
                    </GroupBox>
                    <GroupBox titulo='Quantos animais você possui em sua casa?' >
                        <BotaoQuantidade setRef={quantidade} limite={300} defaultValue={quantidade.current} />
                    </GroupBox>
                    <Mensagem mensagem={mensagem} />
                    <BotaoCadastrarAnimado onPress={Alterar} texto='Enviar' width={350} />
                    <AlertPro
                        ref={alertRef}
                        onConfirm={() => alertRef.current.close()}
                        title="Campos inválidos"
                        message={textoAlert}
                        showCancel={false}
                        textConfirm="OK"
                        customStyles={{ buttonConfirm: { backgroundColor: corRosaFraco }, }}
                    />
                </>
            }
            <StatusBar hidden />
        </ContainerCadastro>
    )
}

const styles = StyleSheet.create({
    titulocampo: {
        fontSize: 18,
        marginBottom: 5,
        color: '#fff',
        textAlign: 'center',
    }
});

export default QuestAdocao