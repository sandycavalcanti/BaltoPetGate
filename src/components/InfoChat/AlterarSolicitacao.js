import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { urlAPI, corBordaBoxCad, corBotaoNegar } from "../../constants";
import Imagem from "../geral/Imagem";
import BotaoSolicitacao from "./BotaoSolicitacao";
import { DropdownAlertType } from 'react-native-dropdownalert';
import CatchError from "../../utils/CatchError";
import { useNavigation } from "@react-navigation/native";

const AlterarSolicitacao = (props) => {
  const navigation = useNavigation();
  const dadosSolicitacaoRef = useRef([]);
  const dadosAdocaoRef = useRef({});
  const dadosTratamentoRef = useRef({});
  const dadosAbrigoRef = useRef({});
  const existeAdocao = useRef(false);
  const existeAbrigo = useRef(false);
  const existeTratamento = useRef(false);
  const TB_PESSOA_ID = props.TB_PESSOA_ID;
  const TB_ANIMAL_ID = props.TB_ANIMAL_ID;
  const urlAnimal = urlAPI + 'selanimalimg/' + TB_ANIMAL_ID;
  const [rerender, setRerender] = useState(0);
  const [carregando, setCarregando] = useState(true);
  const controller = new AbortController();

  const SelSolicitacao = async () => {
    await axios.post(urlAPI + 'selsolicitacao/filtrar', {
      TB_PESSOA_ID,
      TB_ANIMAL_ID
    }, { signal: controller.signal }).then(response => {
      dadosSolicitacaoRef.current = response.data
      dadosSolicitacaoRef.current.map(item => {
        switch (item["TB_TIPO_SOLICITACAO_ID"]) {
          case 1:
            existeAdocao.current = true;
            dadosAdocaoRef.current = item;
            break;
          case 2:
            existeAbrigo.current = true;
            dadosAbrigoRef.current = item;
            break;
          case 3:
            existeTratamento.current = true;
            dadosTratamentoRef.current = item;
            break;
        }
      })
      setCarregando(false);
    }).catch(CatchError);
  };

  useEffect(() => {
    SelSolicitacao();
    return (() => {
      controller.abort();
    })
  }, []);
  
  const AlterarSolicitacao = async (tipoSolicitacao, situacao) => {
    let id;
    dadosSolicitacaoRef.current.map(item => {
      if (item['TB_TIPO_SOLICITACAO_ID'] == tipoSolicitacao) {
        id = item.TB_SOLICITACAO_ID;
      }
    });
    const url = urlAPI + 'altsolicitacao/' + id;
    await axios.put(url, {
      TB_SOLICITACAO_SITUACAO: situacao
    }).then(response => {
      let textoSolicitacao, textoSolicitacaoNegada = '';
      switch (tipoSolicitacao) {
        case 1:
          dadosAdocaoRef.current.TB_SOLICITACAO_SITUACAO = situacao;
          textoSolicitacao = 'a adoção';
          textoSolicitacaoNegada = 'A adoção foi cancelada';
          break;
        case 2:
          dadosAbrigoRef.current.TB_SOLICITACAO_SITUACAO = situacao;
          textoSolicitacao = 'o abrigo';
          textoSolicitacaoNegada = 'O abrigo foi cancelado';
          break;
        case 3:
          dadosTratamentoRef.current.TB_SOLICITACAO_SITUACAO = situacao;
          textoSolicitacao = 'o tratamento';
          textoSolicitacaoNegada = 'O tratamento foi cancelado';
          break;
      }
      setRerender(prev => prev + 1);
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
          message: textoSolicitacaoNegada,
        });
      }
    }).catch(CatchError);
  };

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
        <>
          {dadosSolicitacaoRef.current.length > 0 ?
            <>
              {existeAdocao.current &&
                (dadosAdocaoRef.current["TB_SOLICITACAO_SITUACAO"] == "EM ANDAMENTO" ?
                  <View style={styles.Botoes}>
                    <BotaoSolicitacao onPress={() => AlterarSolicitacao(1, "APROVADA")} texto="Aceitar solicitação de adoção" />
                    <BotaoSolicitacao onPress={() => AlterarSolicitacao(1, "NEGADA")} texto="Negar solicitação de adoção" styleBotao={{ backgroundColor: corBotaoNegar }} />
                  </View>
                  :
                  <Text style={styles.Titulo}>Solicitação de adoção finalizada</Text>)
              }
              {existeAbrigo.current &&
                (dadosAbrigoRef.current["TB_SOLICITACAO_SITUACAO"] == "EM ANDAMENTO" ?
                  <View style={styles.Botoes}>
                    <BotaoSolicitacao onPress={() => AlterarSolicitacao(2, "APROVADA")} texto="Aceitar solicitação de abrigo" />
                    <BotaoSolicitacao onPress={() => AlterarSolicitacao(2, "NEGADA")} texto="Negar solicitação de abrigo" styleBotao={{ backgroundColor: corBotaoNegar }} />
                  </View>
                  :
                  <Text style={styles.Titulo}>Solicitação de abrigo finalizada</Text>)
              }
              {existeTratamento.current &&
                (dadosTratamentoRef.current["TB_SOLICITACAO_SITUACAO"] == "EM ANDAMENTO" ?
                  <View style={styles.Botoes}>
                    <BotaoSolicitacao onPress={() => AlterarSolicitacao(3, "APROVADA")} texto="Aceitar solicitação de cuidados" />
                    <BotaoSolicitacao onPress={() => AlterarSolicitacao(3, "NEGADA")} texto="Negar solicitação de cuidados" styleBotao={{ backgroundColor: corBotaoNegar }} />
                  </View>
                  :
                  <Text style={styles.Titulo}>Solicitação de cuidados finalizada</Text>)
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
  Botoes: {
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20
  },
});

export default AlterarSolicitacao;