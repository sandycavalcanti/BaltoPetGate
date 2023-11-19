import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { format } from "date-fns";
import { urlAPI } from '../../constants';
import { useState } from 'react';
import Imagem from '../geral/Imagem';
import PropTypes from 'prop-types';

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

const Post = (props) => {
    const dataOriginal = props.data ? props.data.createdAt : new Date();
    const texto = props.text ? props.text : props.data ? props.data.TB_POSTAGEM_TEXTO : '';
    let dataFormatada = urlImg = "";

    if (dataOriginal && !isNaN(new Date(dataOriginal))) {
        dataFormatada = format(new Date(dataOriginal), "dd/MM/yy");
    }

    const [imageExists, setImageExists] = useState(false);
    if (props.data) {
        urlImg = urlAPI + 'selpostagemimg/' + props.data.TB_POSTAGEM_ID;
    }

    return (
        <View style={styles.profileContainer}>
            <View style={styles.Container}>
                {props.img ?
                    <Image source={{ uri: props.img }} style={styles.Imagem} />
                    :
                    <Imagem url={urlImg} style={styles.Imagem} setResult={setImageExists} remove />
                }
                {texto &&
                    <View style={styles.ContainerTexto}>
                        <Text style={[styles.Texto, { textAlign: (imageExists || props.img) ? 'left' : 'center' }]}>{texto}</Text>
                    </View>}
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
        borderBottomWidth: 1
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
        color: '#216357',
        fontSize: 16,
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

Post.propTypes = {
    data: PropTypes.object,
    text: PropTypes.string,
    img: PropTypes.object
}

export default Post;