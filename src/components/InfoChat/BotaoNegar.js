import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { corBotaoNegar, corTextoBotaoCad } from '../../constants';
import PropTypes from 'prop-types';

const BotaoNegar = (props) => {
    return (
        <TouchableOpacity {...props} style={styles.botaocadastro}>
            <Text style={styles.textocadastro}>{props.texto ? props.texto : 'Cadastrar'}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    botaocadastro: {
        width: '80%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: corBotaoNegar,
        borderRadius: 10,
        marginBottom: 35,
        elevation: 5,
    },
    textocadastro: {
        color: corTextoBotaoCad,
        fontSize: 20,
    },
});

BotaoNegar.propTypes = {
    texto: PropTypes.string,
    onPress: PropTypes.func,
}

export default BotaoNegar