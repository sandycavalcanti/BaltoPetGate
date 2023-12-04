import { useState, useEffect } from 'react'
import { StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import axios from 'axios';
import { urlAPI } from '../../constants';

const Imagem = (props) => {
    const imageExistsDefaultValue = !props.remove;
    const [imageExists, setImageExists] = useState(imageExistsDefaultValue);
    const controller = new AbortController();

    const ChecarImagem = async () => {
        if (props.url.startsWith(urlAPI)) {
            await axios.get(props.url, { signal: controller.signal })
            .then(() => {
                setImageExists(true);
                if (props.setResult) props.setResult(true)
            }).catch(() => {
                setImageExists(false);
                if (props.setResult) props.setResult(false)
            })
        }
    };

    useEffect(() => {
        ChecarImagem();
        return (() => {
            controller.abort();
        })
    }, [props.url]);

    return (
        <>
            {imageExists ?
                <Image style={[styles.contactImage, props.style, { opacity: props.desativado ? 0.5 : 1 }]} source={{ uri: props.url }} resizeMode='cover' />
                :
                !props.remove &&
                <Image style={[styles.contactImage, props.style, { opacity: props.desativado ? 0.5 : 1 }]} source={{ uri: 'https://via.placeholder.com/100' }} resizeMode='cover' />
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

Imagem.propTypes = {
    url: PropTypes.string,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    setResult: PropTypes.func,
    desativado: PropTypes.bool,
    remove: PropTypes.bool
};

export default Imagem