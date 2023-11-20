import { View, Text, StyleSheet, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import { format } from "date-fns";
import { Entypo, AntDesign } from '@expo/vector-icons';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import { useState, useEffect } from "react";
import { urlAPI } from '../../constants';
import Imagem from '../geral/Imagem';


const Avaliacoes = (props) => {
  const dataOriginal = props.data.createdAt;
  let dataFormatada = "";

  if (dataOriginal && !isNaN(new Date(dataOriginal))) {
    dataFormatada = format(new Date(dataOriginal), "dd/MM/yy");
  }

  const [rating, setRating] = useState(props.data.TB_AVALIACAO_NOTA);
  const urlIMG = urlAPI + 'selpessoaimg/' + props.data.TB_PESSOA_AVALIADORA_ID;
  return (
    <View style={styles.Container}>
      <View style={styles.ContainerHead}>
        <View style={styles.ImagemCirculo}>
          {/* <ImageBackground style={styles.Imagem} resizeMode="contain" source={{uri: urlIMG}} /> */}
          <Imagem url={urlIMG} style={styles.Imagem} />
        </View>
        <View style={styles.ContainerTexto}>
          <Text style={styles.Texto}>{props.data['TB_PESSOA_AVALIADORA.TB_PESSOA_NOME_PERFIL']}</Text>
          <View style={styles.ratingContainer}>
            {Array.from({ length: 5 }).map((_, index) => (
              <AntDesign
                name={index < rating ? 'star' : 'staro'}
                size={14}
                color={index < rating ? 'gold' : 'gray'}
              />
            ))}
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.Descricao}>{props.data.TB_AVALIACAO_TEXTO}</Text>
      </View>
      <View style={styles.ContainerData}>
        <Text style={styles.Data}>{dataFormatada}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    borderColor: 'white',
    borderTopWidth: 1,
    borderBottomWidth: 1,
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
    width: 50,
    height: 50,
    borderRadius: 25,
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
    fontSize: 20
  },
  Descricao: {
    color: '#707070',
    fontSize: 16,
    margin: 3
  },
  ContainerIcon: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  dropdownHeader: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  dropdownOptions: {
    height: 140,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 4,
    marginTop: -20,
    paddingTop: 5,
    zIndex: 10,
  },
  Imagem: {
    width: 'auto',
    height: 50,
    aspectRatio: 1,
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
});


export default Avaliacoes;
