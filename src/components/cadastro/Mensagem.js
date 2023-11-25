import { Text } from 'react-native'
import PropTypes from 'prop-types';

const Mensagem = (props) => {
    const mensagem = props.mensagem

    return (
        <>
            {mensagem && <Text style={[{ color: mensagem.color, fontSize: 16 }, props.style]}>{mensagem.text}</Text>}
        </>
    )
}

Mensagem.propTypes = {
    mensagem: PropTypes.object,
    style: PropTypes.object,
}

export default Mensagem