import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import BotaoCadastrar from "../cadastro/BotaoCadastrar";
import { useState, useRef } from "react";
import axios from "axios";
import React from "react";
import { urlAPI, corBordaBoxCad } from "../../constants";
import { useEffect } from "react";
import Imagem from "../geral/Imagem";
import { DropdownAlertType } from 'react-native-dropdownalert';

const Solicitacao = (props) => {
  const dadosSolicitacaoRef = useRef([]);
  const [existeAdocao, setExisteAdocao] = useState(false);
  const [existeAbrigo, setExisteAbrigo] = useState(false);
  const [existeTratamento, setExisteTratamento] = useState(false);
  const TB_PESSOA_ID = props.TB_PESSOA_ID;
  const TB_ANIMAL_ID = props.TB_ANIMAL_ID;
  const TB_TIPO_IDD = props.TB_TIPO_IDD;
  const [carregando, setCarregando] = useState(true);
  const urlAnimal = urlAPI + 'selanimalimg/' + TB_ANIMAL_ID;

  useEffect(() => {
    SelSolicitacao();
  }, []);

  const SelSolicitacao = async () => {
    await axios.post(urlAPI + "selsolicitacao/filtrar", {
      TB_PESSOA_ID,
      TB_ANIMAL_ID,
    }).then(async (response) => {
      dadosSolicitacaoRef.current = response.data;
      await dadosSolicitacaoRef.current.map((item) => {
        if (item["TB_TIPO_SOLICITACAO_ID"] == 1) {
          setExisteAdocao(true);
        }
        if (item["TB_TIPO_SOLICITACAO_ID"] == 2) {
          setExisteAbrigo(true);
        }
        if (item["TB_TIPO_SOLICITACAO_ID"] == 3) {
          setExisteTratamento(true);
        }
      });
      setCarregando(false);
    }).catch((error) => {
      if (error.response.status !== 404) {
        let erro = error.response.data;
        ToastAndroid.show(erro.message, ToastAndroid.SHORT);
      }
    });
  };

  const Solicitar = (tipoSolicitacao) => {
    const NovaData = new Date();
    axios.post(urlAPI + "cadsolicitacao", {
      TB_PESSOA_ID,
      TB_ANIMAL_ID,
      TB_SOLICITACAO_DT_SOLICITACAO: NovaData,
      TB_TIPO_SOLICITACAO_ID: tipoSolicitacao,
    }).then(response => {
      if (tipoSolicitacao == 1) {
        setExisteAdocao(true);
      }
      if (tipoSolicitacao == 2) {
        setExisteAbrigo(true);
      }
      if (tipoSolicitacao == 3) {
        setExisteTratamento(true);
      }
      props.alert({
        type: DropdownAlertType.Info,
        title: 'Solicitação em andamento',
        interval: 6000,
        message: 'Aguardando resposta da solicitação',
      });
    })
      .catch(error => {
        let erro = error.response.data;
        ToastAndroid.show(erro.message, ToastAndroid.SHORT);
        console.error("Erro ao selecionar: ", erro.error);
      });
  };
  return (
    <>
      <View style={styles.InfoPet}>
        <Text style={styles.TituloPet}>{props.nome}</Text>
        <View style={styles.ImagemPet}>
          <Imagem url={urlAnimal} />
        </View>
      </View>
      {carregando ? (
        <ActivityIndicator size="large" color={corBordaBoxCad} />
      ) : (
        <>
          {(TB_TIPO_IDD == 1 || TB_TIPO_IDD == 2 || TB_TIPO_IDD == 6) &&
            !existeAdocao &&
            <>
              <View style={styles.Botao}>
                <BotaoCadastrar onPress={() => Solicitar(1)} texto="Quero adotar" />
              </View>
            </>
          }
          {(TB_TIPO_IDD == 3 || TB_TIPO_IDD == 4 || TB_TIPO_IDD == 5) &&
            !existeAbrigo &&
            <>
              <View style={styles.Botao}>
                <BotaoCadastrar onPress={() => Solicitar(2)} texto="Oferecer abrigo" />
              </View>
            </>
          }
          {(TB_TIPO_IDD == 2 || TB_TIPO_IDD == 3 || TB_TIPO_IDD == 4) &&
            !existeTratamento &&
            <>
              <View style={styles.Botao}>
                <BotaoCadastrar onPress={() => Solicitar(3)} texto="Oferecer tratamentos" />
              </View>
            </>
          }
        </>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  Container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#D1BBB2',
  },
  InfoHead: {
    alignItems: 'center',
    width: '100%',
    flexDirection: 'column',
    display: 'flex',
    backgroundColor: '#A9DDAE',
  },
  ImagemCirculo: {
    width: 230,
    height: 230,
    borderRadius: 150,
    borderColor: '#fff',
    borderWidth: 2,
    alignItems: 'center',
    overflow: 'hidden',
    marginTop: 40
  },
  Titulo: {
    fontSize: 25,
    color: '#fff',
    marginBottom: 15,
    marginTop: 15,
  },
  InfoPet: {
    width: '100%',
    backgroundColor: "#CC8F8F",
    borderColor: 'white',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
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
  TituloPet: {
    fontSize: 20,
    color: '#fff',
    marginRight: 20
  },
  InfoForm: {
    alignItems: 'center'
  },
  Botoes: {
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20
  },
  Botao: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: 20
  }
});

export default Solicitacao;
