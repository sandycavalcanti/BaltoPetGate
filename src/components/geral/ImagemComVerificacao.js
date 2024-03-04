import { useState, useEffect } from 'react'
import { StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import axios from 'axios';
import { urlAPI } from '../../constants';

const ImagemComVerificacao = (props) => {
    const [imageExists, setImageExists] = useState(true);
    const controller = new AbortController();
    let urlImg = urlAPI + 'selpessoaimg/' + props.id;
    if (props.ponto) {
        urlImg = urlAPI + 'selpontoalimentacaoimg/' + props.id;
    }

    useEffect(() => {
        axios.get(urlImg, { signal: controller.signal })
            .then(() => {
                setImageExists(true);
            }).catch(() => {
                setImageExists(false);
            })
        return (() => {
            controller.abort();
        })
    }, [props.id]);

    return (
        <>
            {imageExists ?
                <Image style={[styles.contactImage, props.style, { opacity: props.desativado ? 0.5 : 1 }]} source={{ uri: urlImg }} resizeMode='cover' />
                :
                !props.remove &&
                <Image style={[styles.contactImage, props.style, { opacity: props.desativado ? 0.5 : 1 }]} source={require('../../../assets/img/user.png')} resizeMode='cover' />
            }
        </>
    )
}

const styles = StyleSheet.create({
    contactImage: {
        width: 50,
        height: 50,
    },
});

ImagemComVerificacao.propTypes = {
    id: PropTypes.number,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    desativado: PropTypes.bool,
    ponto: PropTypes.bool
};

export default ImagemComVerificacao