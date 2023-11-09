import { useState, useEffect } from 'react'
import { StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';

const Imagem = (props) => {
    const [imageExists, setImageExists] = useState(true);
    const controller = new AbortController();

    const ChecarImagem = async () => {
        try {
            const response = await fetch(props.url, { signal: controller.signal });
            setImageExists(response.ok);
            if (props.setResult) props.setResult(response.ok)
        } catch (error) {
            setImageExists(false);
            if (props.setResult) props.setResult(false)
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
    style: PropTypes.object,
    setResult: PropTypes.func,
    desativado: PropTypes.bool,
    remove: PropTypes.bool
};

export default Imagem