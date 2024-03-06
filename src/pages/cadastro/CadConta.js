import { useRef, useState } from 'react';
import { Text, StatusBar, StyleSheet, View, ToastAndroid } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native';
import GroupBox from '../../components/cadastro/GroupBox';
import ContainerCadastro from '../../components/cadastro/ContainerCadastro';
import ValidarCamposCad from '../../utils/ValidarCamposCad';
import axios from 'axios';
import { corBotaoCad, corFundoCad, urlAPI } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Mensagem from '../../components/cadastro/Mensagem';
import BotaoCadastrarAnimado from '../../components/cadastro/BotaoCadastrarAnimado';
import AlertPro from 'react-native-alert-pro';
import CampoSimplesAnimado from '../../components/cadastro/CampoSimplesAnimado';
import CampoSenhaAnimado from '../../components/cadastro/CampoSenhaAnimado';
import CampoDtNascAnimado from '../../components/cadastro/CampoDtNascAnimado';
import CampoNumFormatadoAnimado from '../../components/cadastro/CampoNumFormatadoAnimado';
import CampoEnderecoAnimado from '../../components/cadastro/CampoEnderecoAnimado';

const CadConta = () => {
    const route = useRoute();
    const { tipo } = route.params;
    const navigation = useNavigation();

    const nome = useRef(null)
    const nomePerfil = useRef(null)
    const email = useRef(null)
    const senha = useRef(null);
    const senhaConfirmacao = useRef(null);
    const dtNasc = useRef(null);
    const cpf = useRef(null);
    const crmv = useRef(null);
    const cnpj = useRef(null);
    const telefone1 = useRef(null);
    const telefone2 = useRef(null);
    const whatsapp = useRef(null);
    const cep = useRef(null);
    const uf = useRef(null);
    const cidade = useRef(null);
    const bairro = useRef(null);
    const rua = useRef(null);
    const numero = useRef(null);
    const complemento = useRef(null);
    const instagram = useRef(null);
    const facebook = useRef(null);

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
        const foiInseridoAlgumaRede = !(!instagram.current && !facebook.current);
        const redeExiste = foiInseridoAlgumaRede ? true : null;

        if (tipo != 1) {
            camposObrigatorios.push(dtNasc.current, cpf.current, telefone1.current);
            camposCadastro = { ...camposCadastro, ...camposEndereco, ...camposRedesTelefones, ...camposPessoais };
        }

        switch (tipo) {
            case 2:
                camposObrigatorios.push(crmv.current);
                camposCadastro = { ...camposCadastro, crmv: crmv.current };
                break;
            case 3:
                camposObrigatorios.push(whatsapp.current, redeExiste);
                camposCadastro = { ...camposCadastro, cnpj: cnpj.current };
                break;
            case 4:
                camposObrigatorios.push(whatsapp.current, redeExiste);
                break;
            case 5:
                camposObrigatorios.push(whatsapp.current);
                break;
            case 6:
                camposObrigatorios.push(cnpj.current);
                camposCadastro = { ...camposCadastro, cnpj: cnpj.current };
                break;
            default:
                break;
        }

        const mensagemErro = ValidarCamposCad(camposObrigatorios, camposCadastro);

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
            TB_PESSOA_CEP: cep.current,
            TB_PESSOA_UF: uf.current,
            TB_PESSOA_CIDADE: cidade.current,
            TB_PESSOA_BAIRRO: bairro.current,
            TB_PESSOA_RUA: rua.current,
            TB_PESSOA_NUMERO: numero.current,
            TB_PESSOA_COMPLEMENTO: complemento.current,
            TB_PESSOA_DT_NASC: dtNasc.current,
            TB_PESSOA_CPF: cpf.current,
            TB_PESSOA_WHATSAPP: whatsapp.current,
            TB_PESSOA_INSTAGRAM: instagram.current,
            TB_PESSOA_FACEBOOK: facebook.current,
            TB_PESSOA_TELEFONE1: telefone1.current,
            TB_PESSOA_TELEFONE2: telefone2.current,
            TB_PESSOA_CRMV: crmv.current,
            TB_PESSOA_CNPJ: cnpj.current,
        }).then(async response => {
            const TokenUsuario = response.data.token;
            setMensagem({ color: '#fafafa', text: 'Cadastrado com sucesso!' });
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

    return (
        <ContainerCadastro titulo="Crie sua conta!">
            {(() => {
                switch (tipo) {
                    case 1:
                        return (
                            <>
                                <GroupBox titulo="Informações pessoais">
                                    <CampoSimplesAnimado setRef={nome} placeholder={"Nome Completo"} autoCapitalize='words' />
                                    <CampoSimplesAnimado setRef={nomePerfil} placeholder={"Como gostaria de ser chamado?"} />
                                </GroupBox>
                            </>
                        )
                    case 2:
                        return (
                            <>
                                <GroupBox titulo="Informações pessoais">
                                    <CampoSimplesAnimado setRef={nome} placeholder={"Nome Completo"} autoCapitalize='words' />
                                    <CampoDtNascAnimado setRef={dtNasc} />
                                    <CampoNumFormatadoAnimado setRef={cpf} tipo='cpf' />
                                    <CampoNumFormatadoAnimado setRef={crmv} tipo='crmv' />
                                </GroupBox>
                                <GroupBox titulo="Informações da cliníca veterinária">
                                    <CampoSimplesAnimado setRef={nomePerfil} placeholder={"Nome da clínica"} autoCapitalize='words' />
                                    <CampoEnderecoAnimado setRef1={cep} setRef2={uf} setRef3={cidade} setRef4={bairro} setRef5={rua} setRef6={numero} setRef7={complemento} opcional />
                                </GroupBox>
                                <GroupBox titulo="Informações de contato">
                                    <CampoNumFormatadoAnimado setRef={telefone1} tipo='tel' placeholder={'Telefone de contato'} />
                                    <CampoNumFormatadoAnimado setRef={telefone2} tipo='tel' placeholder={'Outro Telefone (Opcional)'} opcional />
                                    <CampoNumFormatadoAnimado setRef={whatsapp} tipo='tel' placeholder={'WhatsApp (Opcional)'} opcional />
                                    <CampoSimplesAnimado setRef={instagram} placeholder={"Instagram (Opcional)"} opcional />
                                    <CampoSimplesAnimado setRef={facebook} placeholder={"Link do Facebook (Opcional)"} opcional />
                                </GroupBox>
                            </>
                        )
                    case 3:
                        return (
                            <>
                                <GroupBox titulo="Informações pessoais">
                                    <CampoSimplesAnimado setRef={nome} placeholder={"Nome Completo"} autoCapitalize='words' />
                                    <CampoDtNascAnimado setRef={dtNasc} />
                                    <CampoNumFormatadoAnimado setRef={cpf} tipo='cpf' />
                                    <CampoNumFormatadoAnimado setRef={cnpj} tipo='cnpj' opcional />
                                </GroupBox>
                                <GroupBox titulo="Informações da instituição">
                                    <CampoSimplesAnimado setRef={nomePerfil} placeholder={"Nome da instituição"} autoCapitalize='words' />
                                    <CampoEnderecoAnimado setRef1={cep} setRef2={uf} setRef3={cidade} setRef4={bairro} setRef5={rua} setRef6={numero} setRef7={complemento} />
                                </GroupBox>
                                <GroupBox titulo="Informações de contato">
                                    <CampoNumFormatadoAnimado setRef={telefone1} tipo='tel' placeholder={'Telefone de contato'} />
                                    <CampoNumFormatadoAnimado setRef={telefone2} tipo='tel' placeholder={'Outro Telefone (Opcional)'} opcional />
                                    <CampoNumFormatadoAnimado setRef={whatsapp} tipo='tel' placeholder={'WhatsApp'} />
                                    <View style={styles.viewAsterisco}>
                                        <Text style={styles.textoAsterisco}>Insira pelo menos uma rede social</Text>
                                        <Text style={styles.asterisco}>*</Text>
                                    </View>
                                    <CampoSimplesAnimado setRef={instagram} placeholder={"Instagram"} opcional />
                                    <CampoSimplesAnimado setRef={facebook} placeholder={"Link do Facebook"} opcional />
                                </GroupBox>
                            </>
                        )
                    case 4:
                        return (
                            <>
                                <GroupBox titulo="Informações pessoais">
                                    <CampoSimplesAnimado setRef={nome} placeholder={"Nome Completo"} autoCapitalize='words' />
                                    <CampoDtNascAnimado setRef={dtNasc} />
                                    <CampoNumFormatadoAnimado setRef={cpf} tipo='cpf' />
                                </GroupBox>
                                <GroupBox titulo="Informações do protetor">
                                    <CampoSimplesAnimado setRef={nomePerfil} placeholder={"Nome do protetor "} autoCapitalize='words' />
                                    <CampoEnderecoAnimado setRef1={cep} setRef2={uf} setRef3={cidade} setRef4={bairro} setRef5={rua} setRef6={numero} setRef7={complemento} />
                                </GroupBox>
                                <GroupBox titulo="Informações de contato">
                                    <CampoNumFormatadoAnimado setRef={telefone1} tipo='tel' placeholder={'Telefone de contato'} />
                                    <CampoNumFormatadoAnimado setRef={telefone2} tipo='tel' placeholder={'Outro Telefone (Opcional)'} opcional />
                                    <CampoNumFormatadoAnimado setRef={whatsapp} tipo='tel' placeholder={'WhatsApp'} />
                                    <View style={styles.viewAsterisco}>
                                        <Text style={styles.textoAsterisco}>Insira pelo menos uma rede social</Text>
                                        <Text style={styles.asterisco}>*</Text>
                                    </View>
                                    <CampoSimplesAnimado setRef={instagram} placeholder={"Instagram"} opcional />
                                    <CampoSimplesAnimado setRef={facebook} placeholder={"Link do Facebook"} opcional />
                                </GroupBox>
                            </>
                        )
                    case 5:
                        return (
                            <>
                                <GroupBox titulo="Informações pessoais">
                                    <CampoSimplesAnimado setRef={nome} placeholder={"Nome Completo"} autoCapitalize='words' />
                                    <CampoDtNascAnimado setRef={dtNasc} />
                                    <CampoNumFormatadoAnimado setRef={cpf} tipo='cpf' />
                                </GroupBox>
                                <GroupBox titulo="Informações do abrigo">
                                    <CampoSimplesAnimado setRef={nomePerfil} placeholder={"Nome do abrigo"} autoCapitalize='words' />
                                    <CampoEnderecoAnimado setRef1={cep} setRef2={uf} setRef3={cidade} setRef4={bairro} setRef5={rua} setRef6={numero} setRef7={complemento} />
                                </GroupBox>
                                <GroupBox titulo="Informações de contato">
                                    <CampoNumFormatadoAnimado setRef={telefone1} tipo='tel' placeholder={'Telefone de contato'} />
                                    <CampoNumFormatadoAnimado setRef={telefone2} tipo='tel' placeholder={'Outro Telefone (Opcional)'} opcional />
                                    <CampoNumFormatadoAnimado setRef={whatsapp} tipo='tel' placeholder={'WhatsApp'} />
                                    <CampoSimplesAnimado setRef={instagram} placeholder={"Instagram (Opcional)"} opcional />
                                    <CampoSimplesAnimado setRef={facebook} placeholder={"Link do Facebook (Opcional)"} opcional />
                                </GroupBox>
                            </>
                        )
                    case 6:
                        return (
                            <>
                                <GroupBox titulo="Informações pessoais">
                                    <CampoSimplesAnimado setRef={nome} placeholder={"Nome Completo"} autoCapitalize='words' />
                                    <CampoDtNascAnimado setRef={dtNasc} />
                                    <CampoNumFormatadoAnimado setRef={cpf} tipo='cpf' />
                                    <CampoNumFormatadoAnimado setRef={cnpj} tipo='cnpj' />
                                </GroupBox>
                                <GroupBox titulo="Informações do estabecimento">
                                    <CampoSimplesAnimado setRef={nomePerfil} placeholder={"Nome do estabelecimento"} autoCapitalize='words' />
                                    <CampoEnderecoAnimado setRef1={cep} setRef2={uf} setRef3={cidade} setRef4={bairro} setRef5={rua} setRef6={numero} setRef7={complemento} />
                                </GroupBox>
                                <GroupBox titulo="Informações de contato">
                                    <CampoNumFormatadoAnimado setRef={telefone1} tipo='tel' placeholder={'Telefone de contato'} />
                                    <CampoNumFormatadoAnimado setRef={telefone2} tipo='tel' placeholder={'Outro Telefone (Opcional)'} opcional />
                                    <CampoNumFormatadoAnimado setRef={whatsapp} tipo='tel' placeholder={'WhatsApp (Opcional)'} opcional />
                                    <CampoSimplesAnimado setRef={instagram} placeholder={"Instagram (Opcional)"} opcional />
                                    <CampoSimplesAnimado setRef={facebook} placeholder={"Link do Facebook (Opcional)"} opcional />
                                </GroupBox>
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
            <StatusBar hidden />
        </ContainerCadastro>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: corFundoCad,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
    },
    viewAsterisco: {
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textoAsterisco: {
        color: '#fafafa'
    },
    asterisco: {
        position: 'absolute',
        fontSize: 25,
        color: 'red',
        right: 0,
    },
});

export default CadConta