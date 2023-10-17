import { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, StyleSheet, View, TextInput, ToastAndroid, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import CampoSimples from '../../components/cadastro/CampoSimples';
import BotaoCadastrar from '../../components/cadastro/BotaoCadastrar';
import GroupBox from '../../components/cadastro/GroupBox';
import RadioButton from '../../components/QuestAdocao/RadioButton';
import ContainerCadastro from '../../components/cadastro/ContainerCadastro';
import BotaoQuantidade from '../../components/QuestAdocao/BotaoQuantidade';
import ValidarCamposCad from '../../utils/ValidarCamposCad';
import { corBordaBoxCad, urlAPI } from '../../constants';
import axios from 'axios';
import DecodificarToken from '../../utils/DecodificarToken';

let TB_PESSOA_IDD;

const QuestionarioAdocao = ({navigation:{navigate}}) => {
    const navigation = useNavigation();
    const [mensagem, setMensagem] = useState('');

    const [moradia, setMoradia] = useState('');
    const [espaco, setEspaco] = useState('');
    const [passear, setPassear] = useState();
    const [ausencia, setAusencia] = useState('');
    const [acessoRua, setAcessoRua] = useState();
    const [ciente, setCiente] = useState();
    const [quantidade, setQuantidade] = useState();


    const Alterar = async () => {
        const camposObrigatorios = [moradia,espaco,passear,ausencia,ciente,acessoRua,quantidade];
        const camposCadastro = {
            moradia,espaco,passear,ausencia,ciente,acessoRua,quantidade
        }
        console.log(camposCadastro);
        let mensagemErro = ValidarCamposCad(camposObrigatorios, camposCadastro);
        if (!mensagemErro) {
            InserirDados();
        } else {
            alert(mensagemErro);
        }
    }

    const InserirDados = async () => {
        try {
            const url = urlAPI + 'altpessoa/' + TB_PESSOA_IDD;
            await axios.put(url, {
                TB_PESSOA_ANIMAL_CASA: moradia,
                TB_PESSOA_ANIMAL_ESPACO: espaco,
                TB_PESSOA_ANIMAL_PASSEAR: passear,
                TB_PESSOA_ANIMAL_AUSENCIA: ausencia,
                TB_PESSOA_ANIMAL_FAMILIA: ciente,
                TB_PESSOA_ANIMAL_RUA: acessoRua,
                TB_PESSOA_ANIMAL_QUANTIDADE: quantidade,
            }).then(response => {
                navigate("Home");

            }).catch(error => {
            console.error(error);
            })
        } catch (error) {
            console.error('Erro ao cadastrar:', error);
        }
    };

    const PegarId = async () => {
        const decodedToken = await DecodificarToken();
        TB_PESSOA_IDD = decodedToken.TB_PESSOA_IDD;
    }

    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        PegarId()
            .then(() => {
                setCarregando(false);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const SimNao = [true, false];
    const Moradia = ['CASA', 'APARTAMENTO'];
    const Tamanho = ['POUCO', 'MEDIO', 'MUITO'];

    return (
        <ContainerCadastro titulo="Responda a esse questionário">
            {carregando ? (
                <ActivityIndicator size="large" color={corBordaBoxCad} />
            ) : (
                <>
                    <GroupBox titulo='Toda a familia esta ciente e apoia a adoção do animal?'>
                        <RadioButton opcoes={SimNao} set={setCiente}/>
                    </GroupBox>
                    <GroupBox titulo='Moradia'>
                        <RadioButton opcoes={Moradia} set={setMoradia}/>
                    </GroupBox>
                    <GroupBox titulo='Quantas vezes por semana o animal será levado a passeios?' >
                        <BotaoQuantidade set={setPassear}/>
                    </GroupBox>
                    <GroupBox titulo='Qual a quantidade media de espaço que o animal terá acesso?' >
                        <RadioButton opcoes={Tamanho} set={setEspaco}/>
                    </GroupBox>
                    <GroupBox titulo='Em caso de sua ausência, quem ficará responsável pelo animal?' >
                        <CampoSimples set={setAusencia}/>
                    </GroupBox>
                    <GroupBox titulo='Durante o dia-a-dia, o animal terá acesso a rua?'>
                        <RadioButton opcoes={SimNao} set={setAcessoRua}/>
                    </GroupBox>
                    <GroupBox titulo='Quantos animais você possuí em sua casa?' >
                        <BotaoQuantidade set={setQuantidade}/>
                    </GroupBox>

                    <BotaoCadastrar onPress={Alterar} texto='Enviar'/>
                </>
            )}
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

export default QuestionarioAdocao