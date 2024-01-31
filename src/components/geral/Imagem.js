import { StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import { urlAPI } from '../../constants';

const ImagemPerfil = (props) => {
    const url = props.postagem ? urlAPI + 'selpostagemimg/' + props.id : urlAPI + 'selpessoaimg/' + props.id;
    
    return (
        <>
            {props.existe ?
                <Image style={[styles.contactImage, props.style, { opacity: props.desativado ? 0.5 : 1 }]} source={{ uri: url }} resizeMode='cover' />
                :
                !props.postagem &&
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

ImagemPerfil.propTypes = {
    id: PropTypes.number,
    existe: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    desativado: PropTypes.bool,
    postagem: PropTypes.bool,
};

export default ImagemPerfil