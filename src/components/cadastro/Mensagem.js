import { Text } from 'react-native'
import PropTypes from 'prop-types';

const Mensagem = (props) => {
    const texto = props.texto

    const Verificar = (texto) => {
        if (texto == 'Cadastrado') {
            return '#fdfdfd'
        }
        if (texto == '') {
            return '#fdfdfd'
        }
        return '#ff0000'
    }

    const cor = Verificar(texto);

    return (
        <>
            {texto && <Text style={{ color: cor }}>{texto}</Text>}
        </>
    )
}

Mensagem.propTypes = {
    texto: PropTypes.string,
}

export default Mensagem