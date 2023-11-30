import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { format } from "date-fns";
import Imagem from '../geral/Imagem';
import { AntDesign } from '@expo/vector-icons';
import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { urlAPI } from '../../constants';
import DecodificarToken from '../../utils/DecodificarToken';
import CatchError from '../../utils/CatchError';

const Avaliar = (props) => {
  const [rating, setRating] = useState(0);
  const dataformatada = format(new Date(), 'dd/MM/yy')
  const texto = useRef('')
  const [pessoaNome, setPessoaNome] = useState('');

  const PegarId = async () => {
    const decodedToken = await DecodificarToken();
    setPessoaNome(decodedToken.TB_PESSOA_NOME_PERFIL);
  }

  useEffect(() => {
    PegarId();
  }, []);

  const Cadastrar = () => {
    if (texto.current && rating) {
      axios.post(urlAPI + 'cadavaliacao', {
        TB_AVALIACAO_TEXTO: texto.current,
        TB_AVALIACAO_NOTA: rating,
        TB_PESSOA_AVALIADORA_ID: props.TB_PESSOA_IDD,
        TB_PESSOA_AVALIADA_ID: props.TB_PESSOA_ID
      }).then(response => {
        console.log('Cadastrado')
      }).catch(CatchError);
    }
  }

  return (
    <View style={styles.Container}>
      <View style={styles.ContainerHead}>
        <View style={styles.ImagemCirculo}>
          <Imagem style={styles.Imagem} url={urlAPI + 'selpessoaimg/' + props.TB_PESSOA_IDD} />
        </View>
        <View style={styles.ContainerTexto}>
          <Text style={styles.Texto}>{pessoaNome}</Text>
          <View style={styles.ratingContainer}>
            {Array.from({ length: 5 }).map((_, index) => (
              <TouchableOpacity key={index} onPress={() => setRating(index + 1)}>
                <AntDesign name={index < rating ? 'star' : 'staro'} size={22} color={index < rating ? 'gold' : 'gray'} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
      <View>
        <View>
          <TextInput style={styles.Descricao} multiline onChangeText={text => texto.current = text} />
        </View>
        <View style={styles.ContainerData}>
          <Text style={styles.Data}>{dataformatada}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.Botao} onPress={() => Cadastrar()}>
        <Text style={styles.BotaoTexto} >Avaliar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex: 2,
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
    color: '#CE7272',
    fontSize: 23,
  },
});

export default Avaliar;