import { useRef, useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, TextInput, ToastAndroid } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native';
import CampoSimples from '../../components/cadastro/CampoSimples';
import GroupBox from '../../components/cadastro/GroupBox';
import ContainerCadastro from '../../components/cadastro/ContainerCadastro';
import ValidarCamposCad from '../../utils/ValidarCamposCad';
import axios from 'axios';
import { corBotaoCad, urlAPI } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Mensagem from '../../components/cadastro/Mensagem';
import CampoNumFormatado from '../../components/cadastro/CampoNumFormatado';
import CampoDtNasc from '../../components/cadastro/CampoDtNasc';
import CampoEndereco from '../../components/cadastro/CampoEndereco';
import CampoTelefone from '../../components/cadastro/CampoTelefone';
import CampoRede from '../../components/cadastro/CampoRede';
import BotaoCadastrarAnimado from '../../components/cadastro/BotaoCadastrarAnimado';
import AlertPro from 'react-native-alert-pro';
import CampoSimplesAnimado from '../../components/cadastro/CampoSimplesAnimado';
import CampoSenhaAnimado from '../../components/cadastro/CampoSenhaAnimado';
import CampoDtNascAnimado from '../../components/cadastro/CampoDtNascAnimado';

const CadConta = () => {
    const route = useRoute();
    const { tipo } = route.params;
    const navigation = useNavigation();

    const nome = useRef('')
    const nomePerfil = useRef('')
    const email = useRef('')
    const senha = useRef('');
    const senhaConfirmacao = useRef('');
    const dtNasc = useRef();
    const cpf = useRef();
    const crmv = useRef();
    const cnpj = useRef();
    const telefone1 = useRef();
    const telefone2 = useRef();
    const whatsapp = useRef();
    const cep = useRef('');
    const uf = useRef('');
    const cidade = useRef('');
    const bairro = useRef('');
    const rua = useRef('');
    const numero = useRef();
    const complemento = useRef('');
    const instagram = useRef('');
    const facebook = useRef('');

    const alertRef = useRef(null);
    const tentativas = useRef(0);
    const [textoAlert, setTextoAlert] = useState('');
    const [mensagem, setMensagem] = useState({});

    const Cadastrar = async () => {
        const camposObrigatorios = [email.current, nome.current, nomePerfil.current, senha.current, senhaConfirmacao.current]
        let camposCadastro = { email: email.current, nome: nome.current, nomePerfil: nomePerfil.current, senha: senha.current, senhaConfirmacao: senhaConfirmacao.current }

        const camposEndereco = { cep: cep.current, uf: uf.current, cidade: cidade.current, bairro: bairro.current, rua: rua.current, numero: numero.current, complemento: complemento.current }
        const camposRedesTelefones = { facebook: facebook.current, instagram: instagram.current, whatsapp: whatsapp.current, telefone1: telefone1.current, telefone2: telefone2.current }
        const camposPessoais = { dtNasc: dtNasc.current, cpf: cpf.current };
        const redeExiste = !(!instagram.current && !facebook.current);

        if (tipo != 1) {
            camposObrigatorios.push(dtNasc.current, cpf.current, telefone1.current);
            camposCadastro = { ...camposCadastro, ...camposEndereco, ...camposRedesTelefones, ...camposPessoais};
        }

        switch (tipo) {
            case 2:
                camposObrigatorios.push(crmv.current);
                camposCadastro = { crmv: crmv.current };
                break;
            case 3:
                camposObrigatorios.push(whatsapp.current, redeExiste);
                camposCadastro = { cnpj: cnpj.current };
                break;
            case 4:
                camposObrigatorios.push(whatsapp.current, redeExiste);
                break;
            case 5:
                camposObrigatorios.push(whatsapp.current);
                break;
            case 6:
                camposObrigatorios.push(cnpj.current);
                camposCadastro = { cnpj: cnpj.current };
                break;
            default:
                break;
        }

        let mensagemErro = ValidarCamposCad(camposObrigatorios, camposCadastro);
        if (!mensagemErro) {
            if (tentativas.current == 0)
                InserirDados();
            tentativas.current += 1;
        } else {
            setTextoAlert(mensagemErro);
            alertRef.current.open();
        }
    }

    const InserirDados = () => {
        setMensagem({ color: '#fff', text: 'Realizando cadastro...' });
        axios.post(urlAPI + 'cadpessoa', {
            TB_TIPO_ID: tipo,
            TB_PESSOA_NOME: nome.current,
            TB_PESSOA_NOME_PERFIL: nomePerfil.current,
            TB_PESSOA_EMAIL: email.current,
            TB_PESSOA_SENHA: senha.current,
        }).then(async response => {
            const TokenUsuario = response.data.token;
            await AsyncStorage.removeItem('token');
            await AsyncStorage.setItem('token', TokenUsuario);
            navigation.reset({ index: 0, routes: [{ name: 'Menu' }] });
        }).catch(error => {
            tentativas.current = 0;
            let erro = error.response.data.message;
            ToastAndroid.show(erro, ToastAndroid.SHORT);
            setMensagem({ color: 'red', text: erro });
        });
    }
const [a, setA] = useState('');
const [b, setB] = useState('');
    return (
        <ContainerCadastro titulo="Crie sua conta!">
            {(() => {
                switch (tipo) {
                    case 1:
                        return (
                            <>
                                <GroupBox titulo="Informações pessoais">
                                    <CampoSimplesAnimado setRef={nome} placeholder={"Nome Completo"} />
                                    <CampoSimplesAnimado setRef={nomePerfil} placeholder={"Como gostaria de ser chamado?"} />
                                </GroupBox>
                            </>
                        )
                    case 2:
                        return (
                            <>
                                <GroupBox titulo="Informações pessoais">
                                    <CampoSimplesAnimado setRef={nome} placeholder={"Nome Completo"} />
                                    {/* <CampoDtNascAnimado set={setDtNasc} /> */}
                                    <CampoNumFormatado set={setA} tipo='cpf' />
                                    <CampoNumFormatado set={setB} tipo='crmv' />
                                </GroupBox>
                                <GroupBox titulo="Informações da cliníca veterinária">
                                    <CampoSimplesAnimado setRef={nomePerfil} placeholder={"Nome da clínica"} />
                                    {/* <CampoEndereco opcional set1={setCep} set2={setUf} set3={setCidade} set4={setBairro} set5={setRua} set6={setNumero} set7={setComplemento} /> */}
                                </GroupBox>
                                <GroupBox titulo="Informações de contato">
                                    {/* <CampoTelefone set1={setTelefone1} set2={setTelefone2} set3={setWhatsapp} opcional />
                                    <CampoRede set1={setInstagram} set2={setFacebook} opcional /> */}
                                </GroupBox>
                            </>
                        )
                    case 3:
                        return (
                            <>
                            </>
                        )
                    case 4:
                        return (
                            <>
                            </>
                        )
                    case 5:
                        return (
                            <>
                            </>
                        )
                    case 6:
                        return (
                            <>
                            </>
                        )
                }
            })()}
            <GroupBox titulo="Informações de login">
                <CampoSimplesAnimado setRef={email} placeholder={"Email"} keyboardType='email-address' />
                <CampoSenhaAnimado setRef1={senha} setRef2={senhaConfirmacao} />
            </GroupBox>
            <Mensagem mensagem={mensagem} />
            <BotaoCadastrarAnimado onPress={Cadastrar} width={250} />
            <AlertPro
                ref={alertRef}
                onConfirm={() => alertRef.current.close()}
                title="Campos inválidos"
                message={textoAlert}
                showCancel={false}
                textConfirm="OK"
                customStyles={{ buttonConfirm: { backgroundColor: corBotaoCad }, message: { textAlign: 'left' } }}
            />
        </ContainerCadastro>
    )
}

export default CadConta