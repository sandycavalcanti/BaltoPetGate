import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Pressable, Modal, TouchableWithoutFeedback } from 'react-native';
import { format } from "date-fns";
import { AntDesign } from '@expo/vector-icons';
import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { corRosaFraco, urlAPI } from '../../constants';
import DecodificarToken from '../../utils/DecodificarToken';
import CatchError from '../../utils/CatchError';
import AlertPro from 'react-native-alert-pro';
import ImagemComVerificacao from '../geral/ImagemComVerificacao';

const Avaliar = (props) => {
  const [rating, setRating] = useState(0);
  const dataformatada = format(new Date(), 'dd/MM/yy')
  const texto = useRef('')
  const [pessoaNome, setPessoaNome] = useState('');
  const alertRef = useRef(null);
  const textoTitulo = useRef('');
  const [textoAlert, setTextoAlert] = useState('');
  const [estaAvaliando, setEstaAvaliando] = useState(false);

  const PegarId = async () => {
    const decodedToken = await DecodificarToken();
    setPessoaNome(decodedToken.TB_PESSOA_NOME_PERFIL);
  }

  useEffect(() => {
    PegarId();
  }, []);

  useEffect(() => {
    setRating(0);
  }, [props.val]);

  const Cadastrar = () => {
    if (rating) {
      setEstaAvaliando(true);
      if (!estaAvaliando) {
        axios.post(urlAPI + 'cadavaliacao', {
          TB_AVALIACAO_TEXTO: texto.current,
          TB_AVALIACAO_NOTA: rating,
          TB_PESSOA_AVALIADORA_ID: props.TB_PESSOA_IDD,
          TB_PESSOA_AVALIADA_ID: props.TB_PESSOA_ID
        }).then(response => {
          textoTitulo.current = 'Avaliação feita!';
          setTextoAlert('Avaliação enviada com sucesso');
          alertRef.current.open();
          setTimeout(() => {
            props.set(false);
          }, 1500);
        }).catch(error => CatchError(error, false, () => setEstaAvaliando(false), () => setEstaAvaliando(false)));
      }
    } else {
      textoTitulo.current = 'Avaliação não realizada';
      setTextoAlert('Insira uma nota de 1 a 5 estrelas');
      alertRef.current.open();
    }
  }

  const Fechar = () => {
    props.set(false)
  }

  return (
    <Modal visible={props.val} transparent animationType='slide' onDismiss={Fechar} onRequestClose={Fechar}>
      <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPressOut={Fechar}>
        <ScrollView directionalLockEnabled={true} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableWithoutFeedback>
            <View style={styles.ContainerAvaliar} >
              <ScrollView style={{ flex: 1 }}>
                <View style={styles.Container}>
                  <View style={styles.ContainerHead}>
                    <View style={styles.ImagemCirculo}>
                      <ImagemComVerificacao id={props.TB_PESSOA_IDD} style={styles.Imagem} />
                    </View>
                    <View style={styles.ContainerTexto}>
                      <Text style={styles.Texto}>{pessoaNome}</Text>
                      <View style={styles.ratingContainer}>
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Pressable key={index} onPress={() => setRating(index + 1)}>
                            <AntDesign name={index < rating ? 'star' : 'staro'} size={24} color={index < rating ? 'gold' : 'gray'} />
                          </Pressable>
                        ))}
                      </View>
                    </View>
                  </View>
                  <View>
                    <View>
                      <TextInput style={styles.Descricao} multiline onChangeText={text => texto.current = text} placeholder='Escreva aqui sua avaliação' />
                    </View>
                    <View style={styles.ContainerData}>
                      <Text style={styles.Data}>{dataformatada}</Text>
                    </View>
                  </View>
                  <Pressable style={styles.Botao} onPress={() => Cadastrar()}>
                    <Text style={[styles.BotaoTexto, { color: !estaAvaliando ? '#CE7272' : '#dddddd' }]}>Avaliar</Text>
                  </Pressable>
                </View>
              </ScrollView>
              <AlertPro
                ref={alertRef}
                onConfirm={() => alertRef.current.close()}
                title={textoTitulo.current}
                message={textoAlert}
                showCancel={false}
                textConfirm="OK"
                customStyles={{ buttonConfirm: { backgroundColor: corRosaFraco } }}
              />
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </TouchableOpacity>
    </Modal>
  )
}

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex: 2,
  },
  ContainerAvaliar: {
    width: 320,
    minHeight: 200,
    backgroundColor: '#EFEFEF',
    borderColor: '#CF8989',
    borderWidth: 2,
    borderRadius: 6
  },
  ContainerHead: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  ImagemCirculo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderColor: '#fff',
    borderWidth: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  ContainerTexto: {
    width: '100%',
    marginHorizontal: 15
  },
  Texto: {
    color: '#A50C0C',
    fontSize: 24
  },
  Descricao: {
    width: '100%',
    color: '#707070',
    fontSize: 22,
    margin: 3,
    textAlignVertical: 'top',
  },
  Imagem: {
    width: 60,
    height: 60,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  ContainerData: {
    padding: 10,
    paddingRight: 15,
    alignItems: "flex-end",
  },
  Data: {
    color: "#A50C0C",
  },
  Botao: {
    width: '100%',
    alignItems: "center",
    borderColor: 'white',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  BotaoTexto: {
    padding: 7,
    fontSize: 23,
  },
});

export default Avaliar;