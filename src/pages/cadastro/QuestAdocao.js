import { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, StyleSheet, View, TextInput, ToastAndroid, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import CampoSimples from '../../components/cadastro/CampoSimples';
import BotaoCadastrar from '../../components/cadastro/BotaoCadastrar';
import GroupBox from '../../components/cadastro/GroupBox';
import RadioButton from '../../components/QuestAdocao/RadioButton';
import ContainerCadastro from '../../components/cadastro/ContainerCadastro';
import CampoDtNasc from '../../components/cadastro/CampoDtNasc';
import CampoNumFormatado from '../../components/cadastro/CampoNumFormatado';
import ValidarCamposCad from '../../utils/ValidarCamposCad';
import { corBordaBoxCad, urlAPI } from '../../constants';
import axios from 'axios';
import DecodificarToken from '../../utils/DecodificarToken';

let TB_PESSOA_IDD;

const QuestionarioAdocao = () => {
    const navigation = useNavigation();
    const [mensagem, setMensagem] = useState('');

    const [email, setEmail] = useState('');
    const [dtNasc, setDtNasc] = useState();
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState();
    const [telefone1, setTelefone1] = useState();
    const [telefone2, setTelefone2] = useState();
    const [whatsapp, setWhatsapp] = useState();
    const [cep, setCep] = useState('');
    const [uf, setUf] = useState('');
    const [cidade, setCidade] = useState('');
    const [bairro, setBairro] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState();
    const [complemento, setComplemento] = useState('');
    const [instagram, setInstagram] = useState('');
    const [facebook, setFacebook] = useState('');

    const Alterar = async () => {
        const camposObrigatorios = [email, dtNasc, nome, cpf, telefone1, whatsapp, uf, cidade, bairro, rua, numero];
        const camposCadastro = {
            email, nome, cep, uf, cidade, bairro, rua, numero, complemento,
            dtNasc, cpf, facebook, instagram, whatsapp, telefone1, telefone2
        }
        let mensagemErro = ValidarCamposCad(camposObrigatorios, camposCadastro);
        if (!mensagemErro) {
            InserirDados();
        } else {
            alert(mensagemErro);
        }
    }


    const PegarId = async () => {
        const decodedToken = await DecodificarToken();
        TB_PESSOA_IDD = decodedToken.TB_PESSOA_IDD;
    }

    const InserirDados = async () => {
        await axios.put(urlAPI + 'altpessoa/' + TB_PESSOA_IDD, {

        }).then(response => {
            // navigation.reset({ index: 0, routes: [{ name: 'Menu' }] });
            console.log('response');
        }).catch(error => {
            let erro = error.response.data.message;
            ToastAndroid.show(erro, ToastAndroid.SHORT);
            setMensagem(erro);
        })
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

    const SimNao = ['SIM', 'NAO'];
    const Moradia = ['CASA', 'APARTAMENTO'];
    const Tamanho = ['POUCO', 'MEDIO', 'MUITO'];

    return (
        <ContainerCadastro titulo="Responda a esse questionário">
            {carregando ? (
                <ActivityIndicator size="large" color={corBordaBoxCad} />
            ) : (
                <>
                    <GroupBox titulo='Toda a familia esta ciente e apoia a adoção do animal?'>
                        <RadioButton opcoes={SimNao} />
                    </GroupBox>
                    <GroupBox titulo='Moradia'>
                        <RadioButton opcoes={Moradia} />
                    </GroupBox>
                    <GroupBox titulo='Quantas vezes por semana o animal será levado a passeios?' >

                    </GroupBox>
                    <GroupBox titulo='Qual a quantidade media de espaço que o animal terá acesso?' >
                        <RadioButton opcoes={Tamanho} />
                    </GroupBox>
                    <GroupBox titulo='Em caso de sua ausência, quem ficará responsável pelo animal?' >
                        <CampoSimples />
                    </GroupBox>
                    <GroupBox titulo='Durante o dia-a-dia, o animal terá acesso a rua?'>
                        <RadioButton opcoes={SimNao} />
                    </GroupBox>

                    <BotaoCadastrar />
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