
import { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, TextInput, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import CampoSimples from '../../components/components_cadastro/CampoSimples';
import CampoDica from '../../components/components_cadastro/CampoDica';
import BotaoCadastrar from '../../components/components_cadastro/BotaoCadastrar';
import CampoTelefone from '../../components/components_cadastro/CampoTelefone';
import CampoRede from '../../components/components_cadastro/CampoRede';
import CampoEndereco from '../../components/components_cadastro/CampoEndereco';
import GroupBox from '../../components/components_cadastro/GroupBox';
import ContainerCadastro from '../../components/components_cadastro/ContainerCadastro';
import CampoSenha from '../../components/components_cadastro/CampoSenha';
import CampoDtNasc from '../../components/components_cadastro/CampoDtNasc';
import CampoCpf from '../../components/components_cadastro/CampoCpf';
import ValidarCamposCad from '../../utils/ValidarCamposCad';

const CadVeterinario = () => {
  const navigation = useNavigation();
  const [mensagem, setMensagem] = useState('');

  const [email, setEmail] = useState('');
  const [nomePerfil, setNomePerfil] = useState('');
  const [dtNasc, setDtNasc] = useState();
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState();
  const [crmv, setCrmv] = useState();
  const [telefone1, setTelefone1] = useState();
  const [telefone2, setTelefone2] = useState();
  const [whatsapp, setWhatsapp] = useState();
  const [senha, setSenha] = useState('');
  const [senhaConfirmacao, setSenhaConfirmacao] = useState('');
  const [cep, setCep] = useState('');
  const [uf, setUf] = useState('');
  const [cidade, setCidade] = useState('');
  const [bairro, setBairro] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState();
  const [complemento, setComplemento] = useState('');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');

  const Cadastrar = async () => {
    const camposObrigatorios = [email, dtNasc, nome, nomePerfil, cpf, crmv, telefone1, senha, senhaConfirmacao];
    const camposCadastro = {
      email, nome, nomePerfil, cep, uf, cidade, bairro, rua, numero, complemento,
      dtNasc, cpf, crmv, facebook, instagram, whatsapp, telefone1, telefone2, senha, senhaConfirmacao
    }

    let mensagemErro = ValidarCamposCad(camposObrigatorios, camposCadastro);
    if (!mensagemErro) {
      InserirDados();
    } else {
      alert(mensagemErro);
    }
  }

  const InserirDados = async () => {
    await axios.post(urlAPI + 'cadpessoa', {
      TB_TIPO_ID: 2,
      TB_PESSOA_NOME: nome,
      TB_PESSOA_NOME_PERFIL: nomePerfil,
      TB_PESSOA_EMAIL: email,
      TB_PESSOA_SENHA: senha,
      TB_PESSOA_CEP: cep,
      TB_PESSOA_UF: uf,
      TB_PESSOA_CIDADE: cidade,
      TB_PESSOA_BAIRRO: bairro,
      TB_PESSOA_RUA: rua,
      TB_PESSOA_NUMERO: numero,
      TB_PESSOA_COMPLEMENTO: complemento,
      TB_PESSOA_DT_NASC: dtNasc,
      TB_PESSOA_CPF: cpf,
      TB_PESSOA_WHATSAPP: whatsapp,
      TB_PESSOA_INSTAGRAM: instagram,
      TB_PESSOA_FACEBOOK: facebook,
      TB_PESSOA_TELEFONE1: telefone1,
      TB_PESSOA_TELEFONE2: telefone2,
      TB_PESOA_CRMV: crmv
    }).then(response => {
      const TokenUsuario = response.data.token;
      console.log(TokenUsuario);
      navigation.reset({ index: 0, routes: [{ name: 'Pagina' }] });
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
        <CampoDtNasc set={setDtNasc} />
        <CampoCpf set={setCpf} />
        <CampoDica set={setCrmv} placeholder={"CRMV"} textodica="Insira apenas números" keyboardType='numeric' maxLength={7} />
      </GroupBox>
      <GroupBox titulo="Informações da cliníca veterinária">
        <CampoSimples set={setNomePerfil} placeholder={"Nome da clínica"} />
        <CampoEndereco texto="Localização (Opcional):"
          set1={setCep} set2={setUf} set3={setCidade} set4={setBairro} set5={setRua} set6={setNumero} set7={setComplemento} />
      </GroupBox>
      <GroupBox titulo="Informações de contato">
        <CampoTelefone set1={setTelefone1} set2={setTelefone2} set3={setWhatsapp} opcional />
        <CampoRede set1={setInstagram} set2={setFacebook} opcional />
      </GroupBox>
      <GroupBox titulo="Informações de login">
        <CampoSimples set={setEmail} placeholder={"Email"} keyboardType='email-address' />
        <CampoSenha set1={setSenha} set2={setSenhaConfirmacao} />
      </GroupBox>
      <BotaoCadastrar onPress={Cadastrar} />
      {mensagem && <Text>{mensagem}</Text>}
    </ContainerCadastro>
  )
}

export default CadVeterinario