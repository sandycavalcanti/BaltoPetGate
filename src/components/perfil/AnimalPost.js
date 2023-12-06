import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from "react-native";
import { memo, useState, useEffect } from "react";
import { format } from "date-fns";
import { urlAPI } from "../../constants";
import Temperamento from "./Temperamento";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import PropTypes from 'prop-types';
import CatchError from "../../utils/CatchError";

const AnimalPost = (props) => {
  const navigation = useNavigation();
  const dataOriginal = props.data.createdAt;
  const urlImg = urlAPI + 'selanimalimg/' + props.data.TB_ANIMAL_ID;
  let dataFormatada = "";
  const controller = new AbortController();

  if (dataOriginal && !isNaN(new Date(dataOriginal))) {
    dataFormatada = format(new Date(dataOriginal), "dd/MM/yy");
  }

  const [temperamento, setTemperamento] = useState([])

  const Selecionar = () => {
    axios.get(urlAPI + 'seltemperamentos/' + props.data.TB_ANIMAL_ID, { signal: controller.signal })
      .then(response => {
        setTemperamento(response.data);
      }).catch(CatchError)
  }

  useEffect(() => {
    Selecionar();
    return (() => {
      controller.abort();
    })
  }, []);

  const estaEmAlerta = props.data.TB_ANIMAL_ALERTA;

  return (
    <View style={[styles.Container, { backgroundColor: estaEmAlerta ? '#EBC8C8' : '#CEF7FF', opacity: props.desativado ? 0.5 : 1 }]}>
      <TouchableWithoutFeedback onPress={() => navigation.navigate("Ficha", { id: props.data.TB_ANIMAL_ID })}>
        <View style={styles.ContainerImagem}>
          <Image source={{ uri: urlImg }} style={styles.Imagem} resizeMode="cover" />
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.Content}>
        <View style={styles.ContainerTexto}>
          <Text style={styles.Texto}>Nome:</Text>
          <Text style={styles.TextoData}>{props.data.TB_ANIMAL_NOME}</Text>
        </View>
        {temperamento.length !== 0 &&
          <View style={styles.ContainerTexto}>
            <Text style={styles.Texto}>{temperamento.length == 1 ? 'Temperamento:' : 'Temperamentos:'}</Text>
            {temperamento.map((item, index) => <Temperamento key={index} texto={item} />)}
          </View>
        }
      </View>
      <View style={styles.ContainerData}>
        <Text style={styles.mensagemEditada}>{props.desativado && '(Desativado)'}</Text>
        <Text style={styles.Data}>{dataFormatada}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 5,
    marginRight: 10,
  },
  profileName: {
    fontSize: 18,
    color: "#216357",
  },
  Container: {
    width: "100%",
    height: "auto"
  },
  ContainerImagem: {
    width: "100%",
  },
  Imagem: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
  },
  ContainerTexto: {
    paddingTop: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    fontSize: 18,
    flexWrap: 'wrap',
    rowGap: 5,
  },
  Texto: {
    color: "#216357",
    fontSize: 19
  },
  TextoData: {
    color: "#6BC688",
    fontSize: 19,
    marginLeft: 10
  },
  ContainerData: {
    padding: 10,
    paddingRight: 15,
    borderColor: "#FFBEBE",
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: "flex-end",
    justifyContent: 'space-between'
  },
  Data: {
    color: "#216357",
  },
  mensagemEditada: {
    fontStyle: 'italic',
    fontSize: 15,
    color: 'gray',
    textAlign: 'center'
  },
  HeaderPerfil: {
    width: "100%",
    flexDirection: "row",
    alignItems: 'center'
  },
});

AnimalPost.propTypes = {
  data: PropTypes.object,
  desativado: PropTypes.bool
}

export default memo(AnimalPost);