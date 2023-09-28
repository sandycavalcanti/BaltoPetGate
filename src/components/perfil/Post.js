import { View, Text, StyleSheet, Image } from 'react-native';
import { shadow } from 'react-native-paper';

const Post = (props) => {
    return (
        <View>
            <View style={styles.profileContainer}>
              <View
                style={{
                  backgroundColor: "#B2EDC5",
                  flexDirection: "row",
                  alignItems: "center",
                  paddingLeft: 80,
                  height: 70, // Aumenta a altura do contêiner
                  width: '100%',
                }}
              >
                 <View style={styles.ContainerTexto}>
                    <Text style={styles.TextoPerfil}>{props.data.TB_PESSOA.TB_PESSOA_NOME_PERFIL}</Text>
                </View>

              </View>
              <Image
                style={styles.profileImage}
                resizeMode="cover"
                source={require("../../../assets/img/teste.jpg")} // Substitua por sua imagem de perfil
              />
            </View>
            <View style={styles.Container}>
                <View style={styles.ContainerImagem}>
                    <Image style={styles.Imagem} resizeMode='cover' source={require('../../../assets/img/teste.jpg')} />
                </View>
                <View style={styles.ContainerTexto}>
                    <Text style={styles.Texto}>{props.data.TB_POSTAGEM_STATUS}</Text>
                </View>
            </View>
            <View style={styles.ContainerData}>
                <Text style={styles.Data}>12/09</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    profileContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10, // Adiciona espaço entre a imagem do perfil e a postagem
    },
    profileImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 10,
      position: 'absolute',
      left: 10,
      zIndex: 1, // Traz a imagem para frente
    },
    ContainerTexto: {
        padding: 20
    },
    TextoPerfil: {
        color: '#000000',
        fontSize: 24,
    },
    Texto: {
        color: '#216357'
    },
    ContainerData: {
        padding: 10,
        paddingRight: 15,
        borderColor: '#FFBEBE',
        borderTopWidth: 1,
        alignItems: 'flex-end'
    },
    Data: {
        color: '#216357'
    },
    Imagem:{
        width:'100%',
        height:'auto',
        aspectRatio:1
    }
});

export default Post;
