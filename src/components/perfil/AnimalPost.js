import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { memo } from "react";
import { format } from "date-fns";
import { urlAPI } from "../../constants";

const AnimalPost = memo((props) => {
  const dataOriginal = props.data.createdAt;
  let dataFormatada = "";

  // Verifique se dataOriginal é definido e pode ser convertido em um objeto Date válido
  if (dataOriginal && !isNaN(new Date(dataOriginal))) {
    dataFormatada = format(new Date(dataOriginal), "dd/MM/yy");
  }

  return (
    <View>
      <View style={styles.Container}>
        <View style={[styles.HeaderPerfil, { height: 60 }]}>
          <TouchableOpacity onPress={() => props.navigate("PerfilAbaScroll", { id: props.data.TB_PESSOA_ID })} style={styles.HeaderPerfil}>
            <Image style={styles.profileImage} resizeMode="cover" source={{ uri: urlAPI + 'selpessoaimg/' + props.data.TB_PESSOA_ID }} />
            <Text style={{ color: "#000000", fontSize: 20 }}>
              {props.data.TB_PESSOA.TB_PESSOA_NOME_PERFIL}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => props.navigate("Ficha", { id: props.data.TB_ANIMAL_ID })}>
          <View style={styles.ContainerImagem}>
            <Image style={styles.Imagem} resizeMode="cover" source={{ uri: urlAPI + 'selanimalimg/' + props.data.TB_ANIMAL_ID }} />
          </View>
        </TouchableOpacity>
        <View style={styles.Content}>
          <View style={styles.ContainerTexto}>
            <Text style={styles.Texto}>Nome do animal: {props.data.TB_ANIMAL_NOME}</Text>
          </View>
          <View style={styles.ContainerTexto}>
            <Text style={styles.Texto}>Temperamento:</Text>
            <TouchableOpacity style={{ backgroundColor: "white" }}>
              <Text style={styles.Texto}> Alegre</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.ContainerData}>
          <Text style={styles.Data}>{dataFormatada}</Text>
        </View>
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
    padding: 10,
    flexDirection: "row",
  },
  Texto: {
    color: "#216357",
  },
  ContainerData: {
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
    backgroundColor: "#B2EDC5",
    flexDirection: "row",
    alignItems: 'center'
  },
  Content: {
    height: "12%",
    width: "100%",
    backgroundColor: "#B2EDC5"
  }
});

export default AnimalPost;
