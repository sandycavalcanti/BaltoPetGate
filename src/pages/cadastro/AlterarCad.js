import { useState, useEffect, useRef } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, TextInput, StatusBar, ActivityIndicator } from 'react-native'
import GroupBox from '../../components/cadastro/GroupBox';
import ContainerCadastro from '../../components/cadastro/ContainerCadastro';
import ValidarCamposCad from '../../utils/ValidarCamposCad';
import { corBordaBoxCad, corFundoCad, corRosaFraco, urlAPI } from '../../constants';
import axios from 'axios';
import DecodificarToken from '../../utils/DecodificarToken';
import { useRoute } from '@react-navigation/native';
import Mensagem from '../../components/cadastro/Mensagem';
import CampoSimplesAnimado from '../../components/cadastro/CampoSimplesAnimado';
import CampoNumFormatadoAnimado from '../../components/cadastro/CampoNumFormatadoAnimado';
import CampoDtNascAnimado from '../../components/cadastro/CampoDtNascAnimado';
import BotaoCadastrarAnimado from '../../components/cadastro/BotaoCadastrarAnimado';
import CatchError from '../../utils/CatchError';
import CampoEnderecoAnimado from '../../components/cadastro/CampoEnderecoAnimado';
import AlertPro from 'react-native-alert-pro';

const AlterarCad = ({ navigation }) => {
  const route = useRoute();
  const { modoAlterar, TB_PESSOA_ID, TB_ANIMAL_ID } = route.params;

  const TB_PESSOA_IDD = useRef('');
  const email = useRef('');
  const dtNasc = useRef();
  const nome = useRef('');
  const cpf = useRef();
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
  const [mensagem, setMensagem] = useState({});
  const [carregando, setCarregando] = useState(true);
  const alertRef = useRef(null);
  const [textoAlert, setTextoAlert] = useState('');
  const controller = new AbortController();

  const Alterar = async () => {
    let camposObrigatorios = [];
    if (!modoAlterar) {
      camposObrigatorios = [email.current, dtNasc.current, nome.current, cpf.current, telefone1.current, whatsapp.current, uf.current, cidade.current, bairro.current, rua.current, numero.current];
    }
    const camposCadastro = {
      email: email.current, nome: nome.current, cep: cep.current, uf: uf.current, cidade: cidade.current, bairro: bairro.current, rua: rua.current, numero: numero.current, complemento: complemento.current,
      dtNasc: dtNasc.current, cpf: cpf.current, facebook: facebook.current, instagram: instagram.current, whatsapp: whatsapp.current, telefone1: telefone1.current, telefone2: telefone2.current
    }
    const mensagemErro = ValidarCamposCad(camposObrigatorios, camposCadastro);
    if (!mensagemErro) {
      InserirDados();
    } else {
      setTextoAlert(mensagemErro);
      alertRef.current.open();
    }
  }

  const PegarInfo = async () => {
    const decodedToken = await DecodificarToken();
    TB_PESSOA_IDD.current = decodedToken.TB_PESSOA_IDD;
    axios.post(urlAPI + 'selpessoa/filtrar', {
      TB_PESSOA_ID: TB_PESSOA_IDD.current
    }, { signal: controller.signal })
      .then(response => {
        const info = response.data[0];
        nome.current = info.TB_PESSOA_NOME;
        email.current = info.TB_PESSOA_EMAIL;
        dtNasc.current = info.TB_PESSOA_DT_NASC;
        cpf.current = info.TB_PESSOA_CPF;
        telefone1.current = info.TB_PESSOA_TELEFONE1;
        telefone2.current = info.TB_PESSOA_TELEFONE2;
        whatsapp.current = info.TB_PESSOA_WHATSAPP;
        cep.current = info.TB_PESSOA_CEP;
        uf.current = info.TB_PESSOA_UF;
        cidade.current = info.TB_PESSOA_CIDADE;
        bairro.current = info.TB_PESSOA_BAIRRO;
        rua.current = info.TB_PESSOA_RUA;
        numero.current = info.TB_PESSOA_NUMERO;
        complemento.current = info.TB_PESSOA_COMPLEMENTO;
        instagram.current = info.TB_PESSOA_INSTAGRAM;
        facebook.current = info.TB_PESSOA_FACEBOOK;
        setCarregando(false);
      }).catch(CatchError)
  }

  const InserirDados = async () => {
    const url = urlAPI + 'altpessoa/' + TB_PESSOA_IDD.current;
    await axios.put(url, {
      TB_PESSOA_NOME: nome.current,
      TB_PESSOA_EMAIL: email.current,
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
    }).then(response => {
      setMensagem({ color: '#fafafa', text: 'Informações alteradas!' })
      setTimeout(() => {
        if (modoAlterar) {
          navigation.goBack();
        } else {
          navigation.navigate('QuestAdocao', { TB_PESSOA_ID, TB_ANIMAL_ID });
        }
      }, 1000);
    }).catch(CatchError)
  }

  useEffect(() => {
    PegarInfo();
    return (() => {
      controller.abort();
    })
  }, []);

  return (
    <ContainerCadastro titulo={modoAlterar ? "Alterar informações" : "Complete seu cadastro"}>
      {carregando ?
        <ActivityIndicator size="large" color={corBordaBoxCad} />
        :
        <>
          <GroupBox titulo="Informações pessoais">
            {!modoAlterar && <Text style={styles.titulocampo}>Confirme ou complete suas informações</Text>}
            <CampoSimplesAnimado setRef={nome} placeholder="Nome Completo" val={nome.current} opcional={modoAlterar} />
            <CampoSimplesAnimado setRef={email} placeholder="Email" val={email.current} opcional={modoAlterar} />
            <CampoDtNascAnimado setRef={dtNasc} val={dtNasc.current} opcional={modoAlterar} />
            <CampoNumFormatadoAnimado setRef={cpf} tipo='cpf' val={cpf.current} opcional={modoAlterar} />
          </GroupBox>
          <GroupBox titulo="Informações de endereço">
            <CampoEnderecoAnimado val1={cep.current} val2={uf.current} val3={cidade.current} val4={bairro.current} val5={rua.current} val6={numero.current} val7={complemento.current}
              setRef1={cep} setRef2={uf} setRef3={cidade} setRef4={bairro} setRef5={rua} setRef6={numero} setRef7={complemento} removerTitulo opcional={modoAlterar} />
          </GroupBox>
          <GroupBox titulo="Informações de contato">
            <CampoNumFormatadoAnimado setRef={telefone1} tipo='tel' val={telefone1.current} placeholder={'Telefone de contato'} opcional={modoAlterar} />
            <CampoNumFormatadoAnimado setRef={telefone2} tipo='tel' val={telefone2.current} placeholder={modoAlterar ? 'Outro Telefone' : 'Outro Telefone (Opcional)'} opcional />
            <CampoNumFormatadoAnimado setRef={whatsapp} tipo='tel' val={whatsapp.current} placeholder={'WhatsApp'} opcional={modoAlterar} />
            <CampoSimplesAnimado setRef={instagram} val={instagram.current} placeholder={"Instagram"} opcional />
            <CampoSimplesAnimado setRef={facebook} val={facebook.current} placeholder={"Link do Facebook"} opcional />
          </GroupBox>
          <Mensagem mensagem={mensagem} />
          <BotaoCadastrarAnimado onPress={Alterar} texto={modoAlterar ? "Alterar" : "Continuar"} width={300} />
          <AlertPro
            ref={alertRef}
            onConfirm={() => alertRef.current.close()}
            title="Insira seu email e senha."
            message={textoAlert}
            showCancel={false}
            textConfirm="OK"
            customStyles={{ buttonConfirm: { backgroundColor: corRosaFraco } }}
          />
        </>}
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
  },
});

export default AlterarCad