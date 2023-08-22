import { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, TextInput, ToastAndroid } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import CampoSimples from '../../components/components_cadastro/CampoSimples';
import CampoSenha from '../../components/components_cadastro/CampoSenha';
import BotaoCadastrar from '../../components/components_cadastro/BotaoCadastrar';
import GroupBox from '../../components/components_cadastro/GroupBox';
import ContainerCadastro from '../../components/components_cadastro/ContainerCadastro';
import ValidarCamposCad from '../../utils/ValidarCamposCad';
import axios from 'axios';
import { urlAPI } from '../../constants';

const CadUsuario = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [nomePerfil, setNomePerfil] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaConfirmacao, setSenhaConfirmacao] = useState('');

  const [mensagem, setMensagem] = useState('');

  const Cadastrar = async () => {
    const camposObrigatorios = [email, nome, nomePerfil, senha, senhaConfirmacao];
    const camposCadastro = { email, nome, nomePerfil, senha, senhaConfirmacao }

    let mensagemErro = ValidarCamposCad(camposObrigatorios, camposCadastro);
    if (!mensagemErro) {
      InserirDados();
    } else {
      alert(mensagemErro);
    }
  }

  const InserirDados = async () => {
    await axios.post(urlAPI + 'cadpessoa', {
      TB_TIPO_ID: 1,
      TB_PESSOA_NOME: nome,
      TB_PESSOA_NOME_PERFIL: nomePerfil,
      TB_PESSOA_EMAIL: email,
      TB_PESSOA_SENHA: senha,
    }).then(response => {
      const TokenUsuario = response.data.token;
      console.log(TokenUsuario);
      navigation.reset({ index: 0, routes: [{ name: 'Navegacao' }] });
    }).catch(error => {
      let erro = error.response.data.message;
      ToastAndroid.show(erro, ToastAndroid.SHORT);
      setMensagem(erro);
    })
  }

  return (
    <ContainerCadastro titulo="Crie sua conta!">
      <GroupBox titulo="Informações pessoais">
        <CampoSimples set={setNome} placeholder={"Nome Completo"} />
        <CampoSimples set={setNomePerfil} placeholder={"Como gostaria de ser chamado?"} />
      </GroupBox>
      <GroupBox titulo="Informações de login">
        <CampoSimples set={setEmail} placeholder={"Email"} keyboardType='email-address' />
        <CampoSenha set1={setSenha} set2={setSenhaConfirmacao} />
      </GroupBox>
      {mensagem && <Text style={{ color: 'red' }}>{mensagem}</Text>}
      <BotaoCadastrar onPress={Cadastrar} />
    </ContainerCadastro>
  )
}

export default CadUsuario