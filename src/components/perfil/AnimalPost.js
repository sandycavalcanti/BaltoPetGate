import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from "react-native";
import { memo, useState, useEffect } from "react";
import { format } from "date-fns";
import { urlAPI } from "../../constants";
import Temperamento from "./Temperamento";
import axios from "axios";
import Imagem from "../geral/Imagem";

const AnimalPost = memo((props) => {
  const dataOriginal = props.data.createdAt;
  const urlImg = urlAPI + 'selanimalimg/' + props.data.TB_ANIMAL_ID;
  let dataFormatada = "";

  if (dataOriginal && !isNaN(new Date(dataOriginal))) {
    dataFormatada = format(new Date(dataOriginal), "dd/MM/yy");
  }

  const [temperamento, setTemperamento] = useState([])

  const Selecionar = () => {
    axios.get(urlAPI + 'seltemperamentos/' + props.data.TB_ANIMAL_ID)
      .then(response => {
        setTemperamento(response.data);
      }).catch(error => {
        if (error.response.status !== 404) {
          let erro = error.response.data;
          ToastAndroid.show(erro.message, ToastAndroid.SHORT);
          console.log('Erro ao selecionar:', erro.error);
        }
      })
  }

  useEffect(() => {
    Selecionar();
  }, []);

  return (
    <View style={styles.Container}>
      <TouchableWithoutFeedback onPress={() => props.navigate("Ficha", { id: props.data.TB_ANIMAL_ID })}>
        <View style={styles.ContainerImagem}>
          <Imagem url={urlImg} style={styles.Imagem} />
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
            {temperamento.map((item, index) => {
              return (
                <Temperamento key={index} texto={item} />
              )
            })}
          </View>
        }
      </View>
      <View style={styles.ContainerData}>
        <Text style={styles.Data}>{dataFormatada}</Text>
      </View>
    </View>
  );
});

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
    height: "auto",
    backgroundColor: '#CEF7FF'
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
    marginTop: 15,
    padding: 10,
    paddingRight: 15,
    borderColor: "#FFBEBE",
    borderTopWidth: 1,
    alignItems: "flex-end",
  },
  Data: {
    color: "#216357",
  },
  HeaderPerfil: {
    width: "100%",
    flexDirection: "row",
    alignItems: 'center'
  },
});

export default AnimalPost;
