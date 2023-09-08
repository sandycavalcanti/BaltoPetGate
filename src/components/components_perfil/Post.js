import { View, Text, StyleSheet, Image } from 'react-native';
import { shadow } from 'react-native-paper';

const Post = (props) => {
    return (
        <View>
            <View style={styles.Container}>
                <View style={styles.ContainerImagem}>
                    <Image style={styles.Imagem} resizeMode='cover' source={require('../../../assets/img/teste.jpg')} />
                </View>
                <View style={styles.ContainerTexto}>
                    <Text style={styles.Texto}>{props.textoPost}</Text>
                </View>
            </View>
            <View style={styles.ContainerData}>
                <Text style={styles.Data}>12/09</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        height: 'auto',
    },
    ContainerImagem: {
        width: '100%'
    },
    Imagem: {
        width: '100%',
        height: undefined,
        aspectRatio: 1
    },
    ContainerTexto: {
        padding: 20
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

    }
});

export default Post;