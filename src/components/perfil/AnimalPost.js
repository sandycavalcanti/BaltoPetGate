import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Button,
  } from "react-native";
  import { memo } from "react";
  import { format } from "date-fns";
  
  const AnimalPost = memo((props) => {
    let id = props.id;
    const dataOriginal = props.data;
    let dataFormatada = "";
  
    // Verifique se dataOriginal é definido e pode ser convertido em um objeto Date válido
    if (dataOriginal && !isNaN(new Date(dataOriginal))) {
      dataFormatada = format(new Date(dataOriginal), "dd/MM/yy");
    }
  
    return (
      <View>
        <View style={styles.profileContainer}>
          <Text style={styles.profileName}>{props.profileName}</Text>
        </View>
        <View style={styles.Container}>
          <TouchableOpacity onPress={() => props.navigate("Ficha", { id })}>
            <View
              style={{
                height: "12%",
                width: "100%",
                backgroundColor: "#B2EDC5",
                flexDirection: "row",
              }}
            >
              <Image
                style={styles.profileImage}
                resizeMode="cover"
                source={require("../../../assets/img/teste.jpg")}
              />
              <Text style={{ color: "#000000", marginTop: 20, fontSize: 20 }}>
                Cristina Freitas
              </Text>
            </View>
            <View style={styles.ContainerImagem}>
              <Image
                style={styles.Imagem}
                resizeMode="cover"
                source={require("../../../assets/img/teste.jpg")}
              />
            </View>
          </TouchableOpacity>
          <View
            style={{ height: "12%", width: "100%", backgroundColor: "#B2EDC5" }}
          >
            <View style={styles.ContainerTexto}>
              <Text style={styles.Texto}>Nome do animal: {props.texto}</Text>
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
  });
  
  export default AnimalPost;
  