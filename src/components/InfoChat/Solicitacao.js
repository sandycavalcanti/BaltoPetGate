import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { urlAPI, corBordaBoxCad } from "../../constants";
import Imagem from "../geral/Imagem";
import BotaoCadastrar from "../cadastro/BotaoCadastrar";
import { DropdownAlertType } from 'react-native-dropdownalert';
import CatchError from "../../utils/CatchError";
import { useNavigation } from "@react-navigation/native";
import ModalConfirmacao from "../geral/ModalConfirmacao";
import RetornarTipoNome from "../../utils/RetornarTipoNome";

const Solicitacao = (props) => {
  const navigation = useNavigation();
  const existeAdocao = useRef(false);
  const existeAbrigo = useRef(false);
  const existeTratamento = useRef(false);
  const TB_PESSOA_ID = props.TB_PESSOA_ID;
  const TB_ANIMAL_ID = props.TB_ANIMAL_ID;
  const TB_TIPO_IDD = props.TB_TIPO_IDD;
  const urlAnimal = urlAPI + 'selanimalimg/' + TB_ANIMAL_ID;
  const tipoDaSolicitacao = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [rerender, setRerender] = useState(0);
  const [carregando, setCarregando] = useState(true);
  const controller = new AbortController();

  const SelSolicitacao = async () => {
    await axios.post(urlAPI + "selsolicitacao/filtrar", {
      TB_PESSOA_ID,
      TB_ANIMAL_ID,
    }, { signal: controller.signal }).then(response => {
      const dadosSolicitacao = response.data;
      dadosSolicitacao.map(item => {
        switch (item["TB_TIPO_SOLICITACAO_ID"]) {
          case 1:
            existeAdocao.current = true;
            break;
          case 2:
            existeAbrigo.current = true;
            break;
          case 3:
            existeTratamento.current = true;
            break;
        }
      });
      setCarregando(false);
    }).catch(CatchError);
  };

  useEffect(() => {
    SelSolicitacao();
    return (() => {
      controller.abort();
    })
  }, []);

  const Solicitar = (tipoSolicitacao) => {
    const NovaData = new Date();
    axios.post(urlAPI + "cadsolicitacao", {
      TB_PESSOA_ID,
      TB_ANIMAL_ID,
      TB_SOLICITACAO_DT_SOLICITACAO: NovaData,
      TB_TIPO_SOLICITACAO_ID: tipoSolicitacao,
    }).then(response => {
      switch (tipoSolicitacao) {
        case 1:
          existeAdocao.current = true;
          break;
        case 2:
          existeAbrigo.current = true;
          break;
        case 3:
          existeTratamento.current = true;
          break;
      }
      setRerender(prev => prev + 1);
      props.alert({
        type: DropdownAlertType.Info,
        title: 'Solicitação em andamento',
        interval: 6000,
        message: 'Aguardando resposta da solicitação',
      });
    }).catch(CatchError);
  };

  const PressSolicitar = (tipoSolicitacao) => {
    tipoDaSolicitacao.current = tipoSolicitacao;
    setModalVisible(true);
  }

  const RetornarSubTexto = (tipoSolicitacao) => {
    switch (tipoSolicitacao) {
      case 1:
        return 'Ao adotar um animal, você assume um compromisso que exige responsabilidade e atenção'
      case 2:
        return 'Ao apertar em Abrigar, você assume a responsabilidade de abrigar o animal'
      case 3:
        return 'Ao apertar em Cuidar, você assume a responsabilidade de oferecer tratamentos ao animal'
    }
  }

  const textoConfimacaoModal = RetornarTipoNome(tipoDaSolicitacao.current, true);
  const textoSubTextoModal = RetornarSubTexto(tipoDaSolicitacao.current);

  return (
    <>
      <View style={styles.InfoPet}>
        <Text style={styles.TituloPet}>{props.nome}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Ficha', { id: TB_ANIMAL_ID })}>
          <Imagem url={urlAnimal} style={styles.ImagemPet} />
        </TouchableOpacity>
      </View>
      {carregando ? <ActivityIndicator size="large" color={corBordaBoxCad} />
        :
        <View style={styles.Botao}>
          {(TB_TIPO_IDD == 1 || TB_TIPO_IDD == 2 || TB_TIPO_IDD == 6) && (!existeAdocao.current ?
            <BotaoCadastrar styleBotao={styles.botaoCad} onPress={() => PressSolicitar(1)} texto="Quero adotar" />
            :
            <Text style={styles.mensagemFeita}>Solicitação de adoção feita</Text>
          )}
          {(TB_TIPO_IDD == 3 || TB_TIPO_IDD == 4 || TB_TIPO_IDD == 5) && (!existeAbrigo.current ?
            <BotaoCadastrar styleBotao={styles.botaoCad} onPress={() => PressSolicitar(2)} texto="Oferecer abrigo" />
            :
            <Text style={styles.mensagemFeita}>Solicitação de abrigo feita</Text>
          )}
          {(TB_TIPO_IDD == 2 || TB_TIPO_IDD == 3 || TB_TIPO_IDD == 4) && (!existeTratamento.current ?
            <BotaoCadastrar styleBotao={styles.botaoCad} onPress={() => PressSolicitar(3)} texto="Oferecer tratamentos" />
            :
            <Text style={styles.mensagemFeita}>Solicitação de tratamentos feita</Text>
          )}
          <ModalConfirmacao texto={`Deseja ${textoConfimacaoModal}?`} subtexto={textoSubTextoModal} sim={textoConfimacaoModal} press={() => Solicitar(tipoDaSolicitacao.current)} val={modalVisible} set={setModalVisible} />
        </View>
      }
    </>
  );
};

const styles = StyleSheet.create({
  ImagemPet: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: '#fff',
    borderWidth: 1,
    alignItems: 'center',
    overflow: 'hidden',
    margin: 2
  },
  Titulo: {
    fontSize: 25,
    color: '#fff',
    marginBottom: 15,
    marginTop: 15,
  },
  InfoPet: {
    width: '100%',
    backgroundColor: "#A8DDAE",
    borderColor: 'white',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  TituloPet: {
    fontSize: 20,
    color: '#fff',
    marginRight: 20
  },
  Botao: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  botaoCad: {
    backgroundColor: '#64939D',
    borderColor: '#fff',
    borderWidth: 2,
    elevation: 1,
  },
  mensagemFeita: {
    marginVertical: 10,
    color: '#fafafa',
    fontSize: 18
  }
});

export default Solicitacao;