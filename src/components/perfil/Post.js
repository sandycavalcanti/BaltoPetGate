import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { format } from "date-fns";
import { urlAPI } from '../../constants';
import Imagem from '../geral/Imagem';
import PropTypes from 'prop-types';
import Lightbox from 'react-native-lightbox-v2'

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

const Post = (props) => {
    const dataOriginal = props.data ? props.data.createdAt : new Date();
    const foiEditado = props.alterado ? props.alterado : props.data?.TB_POSTAGEM_TEXTO_ALTERADO;
    const texto = props.text ? props.text : props.data?.TB_POSTAGEM_TEXTO_ALTERADO ? props.data.TB_POSTAGEM_TEXTO_ALTERADO : props.data.TB_POSTAGEM_TEXTO;
    let dataFormatada, urlImg = "";

    if (dataOriginal) {
        dataFormatada = format(new Date(dataOriginal), "dd/MM/yy");
    }
    if (props.data) {
        urlImg = urlAPI + 'selpostagemimg/' + props.data.TB_POSTAGEM_ID;
    }
    const possuiImg = props.img ? true : props.img === null ? false : props.data.TB_POSTAGEM_POSSUI_IMG;

    return (
        <View style={styles.profileContainer}>
            <View style={styles.Container}>
                {props.img ?
                    <Image source={{ uri: props.img }} style={styles.Imagem} />
                    :
                    <Lightbox activeProps={{ style: styles.imageActive }} underlayColor='transparent'>
                        <Imagem url={urlImg} style={styles.Imagem} remove={!possuiImg} />
                    </Lightbox>
                }
                {texto &&
                    <View style={styles.ContainerTexto}>
                        <Text style={[styles.Texto, { textAlign: (possuiImg || props.img) ? 'left' : 'center' }]}>{texto}</Text>
                    </View>}
                <View style={styles.ContainerData}>
                    <Text style={styles.mensagemEditada}>{foiEditado && '(Editada)'}</Text>
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
    Imagem: {
        width: windowWidth,
        height: 'auto',
        aspectRatio: 1
    },
    imageActive: {
        width: windowWidth,
        height: windowWidth,
        resizeMode: 'contain',
    },
});

Post.propTypes = {
    data: PropTypes.object,
    text: PropTypes.string,
    img: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}

export default Post;