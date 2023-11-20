import { Text } from 'react-native'
import PropTypes from 'prop-types';

const Mensagem = (props) => {
    const texto = props.texto

    return (
        <>
            {texto && <Text style={{ color: texto.color }}>{texto.text}</Text>}
        </>
    )
}

Mensagem.propTypes = {
    mensagem: PropTypes.object,
}

export default Mensagem