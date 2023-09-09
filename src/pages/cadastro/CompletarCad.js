import { useState, useEffect } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, TextInput, ToastAndroid } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import CampoSimples from '../../components/cadastro/CampoSimples';
import BotaoCadastrar from '../../components/cadastro/BotaoCadastrar';
import CampoTelefone from '../../components/cadastro/CampoTelefone';
import CampoRede from '../../components/cadastro/CampoRede';
import CampoEndereco from '../../components/cadastro/CampoEndereco';
import GroupBox from '../../components/cadastro/GroupBox';
import ContainerCadastro from '../../components/cadastro/ContainerCadastro';
import CampoDtNasc from '../../components/cadastro/CampoDtNasc';
import CampoNumFormatado from '../../components/cadastro/CampoNumFormatado';
import ValidarCamposCad from '../../utils/ValidarCamposCad';
import { urlAPI } from '../../constants';
import axios from 'axios';
import DecodificarToken from '../../utils/DecodificarToken';

const CompletarCad = () => {
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
    const camposObrigatorios = [email, dtNasc, nome, cpf, telefone1];
    const camposCadastro = {
      email, nome, cep, uf, cidade, bairro, rua, numero, complemento,
      dtNasc, cpf, facebook, instagram, whatsapp, telefone1, telefone2
    }
    console.log(camposCadastro)
    let mensagemErro = ValidarCamposCad(camposObrigatorios, camposCadastro);
    if (!mensagemErro) {
      InserirDados();
    } else {
      alert(mensagemErro);
    }
  }

  let info = [];
  let TB_PESSOA_IDD;

  const Selecionar = () => {
    axios.post(urlAPI + 'selpessoa/filtrar', {
      TB_PESSOA_ID: TB_PESSOA_IDD
    })
      .then(response => {
        info = response.data[0];
        setNome(info.TB_PESSOA_NOME);
        setEmail(info.TB_PESSOA_EMAIL);
        setDtNasc(info.TB_PESSOA_DT_NASC);
        setCpf(info.TB_PESSOA_CEP);
        setTelefone1(info.TB_PESSOA_TELEFONE1);
        setTelefone2(info.TB_PESSOA_TELEFONE2);
        setWhatsapp(info.TB_PESSOA_WHATSAPP);
        setCep(info.TB_PESSOA_CEP);
        setUf(info.TB_PESSOA_UF);
        setCidade(info.TB_PESSOA_CIDADE);
        setBairro(info.TB_PESSOA_BAIRRO);
        setRua(info.TB_PESSOA_RUA);
        setNumero(info.TB_PESSOA_NUMERO);
        setComplemento(info.TB_PESSOA_COMPLEMENTO);
        setInstagram(info.TB_PESSOA_INSTAGRAM);
        setFacebook(info.TB_PESSOA_FACEBOOK);
      }).catch(error => {
        let erro = error.response.data.message;
        console.error('Erro ao selecionar:', erro);
      })
  };

  useEffect(() => {
    const PegarId = async () => {
      const decodedToken = DecodificarToken();
      TB_PESSOA_IDD = decodedToken.TB_PESSOA_IDD;
    }
    PegarId();
    Selecionar();
  }, []);

  const InserirDados = async () => {
    await axios.put(urlAPI + 'altpessoa/' + TB_PESSOA_IDD, {
      TB_PESSOA_NOME: nome,
      TB_PESSOA_EMAIL: email,
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
      TB_PESSOA_TELEFONE2: telefone2
    }).then(response => {
      // navigation.reset({ index: 0, routes: [{ name: 'Menu' }] });
      console.log(response);
    }).catch(error => {
      let erro = error.response.data.message;
      ToastAndroid.show(erro, ToastAndroid.SHORT);
      setMensagem(erro);
    })
  }

  return (
    <ContainerCadastro titulo="Complete seu cadastro">
      <GroupBox titulo="Informações pessoais">
        <Text style={styles.titulocampo}>Confirme seu nome completo e seu email:</Text>
        <CampoSimples set={setNome} placeholder="Nome Completo" val={nome} />
        <CampoSimples set={setEmail} placeholder="Email" val={email} />
        <CampoDtNasc set={setDtNasc} />
        <CampoNumFormatado set={setCpf} tipo='cpf' val={cpf} />
      </GroupBox>
      <GroupBox titulo="Informações de endereço">
        <CampoEndereco obrigatorio val1={cep} val2={uf} val3={cidade} val4={bairro} val5={rua} val6={numero} val7={complemento}
          set1={setCep} set2={setUf} set3={setCidade} set4={setBairro} set5={setRua} set6={setNumero} set7={setComplemento} />
      </GroupBox>
      <GroupBox titulo="Informações de contato">
        <CampoTelefone set1={setTelefone1} set2={setTelefone2} set3={setWhatsapp} opcional val1={telefone1} val2={telefone2} val3={whatsapp} />
        <CampoRede set1={setInstagram} set2={setFacebook} opcional val1={instagram} val2={facebook} />
      </GroupBox>
      {mensagem && <Text style={{ color: 'red' }}>{mensagem}</Text>}
      <BotaoCadastrar onPress={Alterar} texto="Continuar" />
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

export default CompletarCad