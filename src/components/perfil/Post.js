import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { format } from "date-fns";
import { corBordaBoxCad, urlAPI } from '../../constants';
import { useEffect, useState } from 'react';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Post = (props) => {
    const dataOriginal = props.data.createdAt;
    let dataFormatada = "";

    if (dataOriginal && !isNaN(new Date(dataOriginal))) {
        dataFormatada = format(new Date(dataOriginal), "dd/MM/yy");
    }

    const [imageExists, setImageExists] = useState(true);
    const urlImg = urlAPI + 'selpostagemimg/' + props.data.TB_POSTAGEM_ID;

    useEffect(() => {
        const checkImageExists = async () => {
            try {
                const response = await fetch(urlImg);
                if (!response.ok) {
                    setImageExists(false);
                }
            } catch (error) {
                setImageExists(false);
            }
        };

        checkImageExists();
    }, [urlImg]);

    return (
        <View style={styles.profileContainer}>
            <View style={styles.Container}>
                {imageExists &&
                    <View style={styles.ContainerImagem}>
                        <Image style={styles.Imagem} resizeMode='cover' source={{ uri: urlImg }} />
                    </View>}
                <View style={styles.ContainerTexto}>
                    <Text style={[styles.Texto, { textAlign: imageExists ? 'left' : 'center' }]}>{props.data.TB_POSTAGEM_TEXTO}</Text>
                </View>
                <View style={styles.ContainerData}>
                    <Text style={styles.Data}>{dataFormatada}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    profileContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: '#CEF7FF',
        borderColor: "#fff",
        borderTopWidth: 1,
    },
    ContainerTexto: {
        width: windowWidth,
        padding: 20,
        marginBottom: 5,
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
        borderColor: "#FFBEBE",
        borderTopWidth: 1,
        alignItems: "flex-end",
    },
    Data: {
        color: "#216357",
    },
    Imagem: {
        width: windowWidth,
        height: 'auto',
        aspectRatio: 1
    }
});

export default Post;
