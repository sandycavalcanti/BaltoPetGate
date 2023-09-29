import { View, Text, StyleSheet, Image } from 'react-native';
import { shadow } from 'react-native-paper';

const Post = (props) => {
    return (
        <View style={styles.profileContainer}>
            <View style={styles.Container}>
                <View style={styles.ContainerImagem}>
                    <Image style={styles.Imagem} resizeMode='cover' source={{ uri: 'https://via.placeholder.com/500' }} />
                </View>
                <View style={styles.ContainerTexto}>
                    <Text style={styles.Texto}>{props.data.TB_POSTAGEM_TEXTO}</Text>
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
        backgroundColor: '#CEF7FF'
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
    Imagem: {
        width: '100%',
        height: 'auto',
        aspectRatio: 1
    }
});

export default Post;
