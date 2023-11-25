import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useState, useRef } from "react";
import axios from "axios";
import React from "react";
import { urlAPI, corBordaBoxCad } from "../../constants";
import { useEffect } from "react";
import Imagem from "../geral/Imagem";
import BotaoAceitar from "./BotaoAceitar";
import BotaoNegar from "./BotaoNegar";
import { DropdownAlertType } from 'react-native-dropdownalert';

const AlterarSolicitacao = (props) => {
  const dadosSolicitacaoRef = useRef([]);
  const dadosAdocaoRef = useRef({});
  const dadosTratamentoRef = useRef({});
  const dadosAbrigoRef = useRef({});
  const [existeAdocao, setExisteAdocao] = useState(false);
  const [existeAbrigo, setExisteAbrigo] = useState(false);
  const [existeTratamento, setExisteTratamento] = useState(false);
  const TB_PESSOA_ID = props.TB_PESSOA_ID;
  const TB_ANIMAL_ID = props.TB_ANIMAL_ID;
  const [carregando, setCarregando] = useState(true);
  const urlAnimal = urlAPI + 'selanimalimg/' + TB_ANIMAL_ID;

  const SelSolicitacao = async () => {
    await axios.post(urlAPI + 'selsolicitacao/filtrar', {
      TB_PESSOA_ID,
      TB_ANIMAL_ID
    }).then(async response => {
      dadosSolicitacaoRef.current = response.data
      await dadosSolicitacaoRef.current.map(item => {
        if (item['TB_TIPO_SOLICITACAO_ID'] == 1) {
          setExisteAdocao(true)
          dadosAdocaoRef.current = item
        } if (item['TB_TIPO_SOLICITACAO_ID'] == 2) {
          setExisteAbrigo(true)
          dadosAbrigoRef.current = item
        } if (item['TB_TIPO_SOLICITACAO_ID'] == 3) {
          setExisteTratamento(true)
          dadosTratamentoRef.current = item
        }
      })
      setCarregando(false);
    }).catch(error => {
      console.error(error)
      if (error.response.status !== 404) {
        let erro = error.response.data;
        ToastAndroid.show(erro.message, ToastAndroid.SHORT);
        console.error('Erro ao selecionar: ', erro.error);
      }
    });
  };

  useEffect(() => {
    SelSolicitacao();
  }, []);

  const AlterarSolicitacao = async (tipoSolicitacao, situacao) => {
    let id;
    await dadosSolicitacaoRef.current.map(item => {
      if (item['TB_TIPO_SOLICITACAO_ID'] == tipoSolicitacao) {
        id = item.TB_SOLICITACAO_ID;
      }
    });
    const url = urlAPI + 'altsolicitacao/' + id;
    await axios.put(url, {
      TB_SOLICITACAO_SITUACAO: situacao
    }).then(response => {
      let textoSolicitacao;
      if (tipoSolicitacao == 1) {
        setExisteAdocao(false)
        textoSolicitacao = 'a adoção';
      } else if (tipoSolicitacao == 2) {
        setExisteAbrigo(false)
        textoSolicitacao = 'o abrigo';
      } else {
        setExisteTratamento(false)
        textoSolicitacao = 'o tratamento';
      }

      if (situacao == 'APROVADA') {
        props.alert({
          type: DropdownAlertType.Info,
          title: 'Solicitação aprovada',
          interval: 6000,
          message: 'Dentro de 4 dias você receberá uma mensagem de confirmação d' + textoSolicitacao,
        });
      } else {
        props.alert({
          type: DropdownAlertType.Info,
          title: 'Solicitação negada',
          interval: 6000,
          message: textoSolicitacao + 'foi cancelada',
        });

      }
    }).catch(error => {
      console.error(error)
      let erro = error.response.data;
      ToastAndroid.show(erro.message, ToastAndroid.SHORT);
      console.error('Erro ao alterar: ', erro.error, error);
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
      ) :
        <>
          {dadosSolicitacaoRef.current.length > 0 ?
            <>
              {existeAdocao &&
                dadosAdocaoRef.current["TB_SOLICITACAO_SITUACAO"] == "EM ANDAMENTO" ?
                <View style={styles.Botoes}>
                  <BotaoAceitar onPress={() => AlterarSolicitacao(1, "APROVADA")} texto="Aceitar solicitação de adoção" />
                  <BotaoNegar onPress={() => AlterarSolicitacao(1, "NEGADA")} texto="Negar solicitação de adoção" />
                </View>
                :
                <Text style={styles.Titulo}>Solicitação finalizada</Text>
              }
              {existeAbrigo &&
                dadosAbrigoRef.current["TB_SOLICITACAO_SITUACAO"] == "EM ANDAMENTO" ?
                <View style={styles.Botoes}>
                  <BotaoAceitar onPress={() => AlterarSolicitacao(2, "APROVADA")} texto="Aceitar solicitação de abrigo" />
                  <BotaoNegar onPress={() => AlterarSolicitacao(2, "NEGADA")} texto="Negar solicitação de abrigo" />
                </View>
                :
                <Text style={styles.Titulo}>Solicitação finalizada</Text>
              }
              {existeTratamento &&
                dadosTratamentoRef.current["TB_SOLICITACAO_SITUACAO"] == "EM ANDAMENTO" ?
                <View style={styles.Botoes}>
                  <BotaoAceitar onPress={() => AlterarSolicitacao(3, "APROVADA")} texto="Aceitar solicitação de cuidados" />
                  <BotaoNegar onPress={() => AlterarSolicitacao(3, "NEGADA")} texto="Negar solicitação de cuidados" />
                </View>
                :
                <Text style={styles.Titulo}>Solicitação finalizada</Text>
              }
            </>
            :
            <Text style={styles.Titulo}>Nenhuma solicitação feita por enquanto</Text>
          }
        </>
      }
    </>
  );
};
const styles = StyleSheet.create({
  Titulo: {
    fontSize: 25,
    color: '#fff',
    marginBottom: 15,
    marginTop: 15,
    textAlign: 'center'
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

export default AlterarSolicitacao;