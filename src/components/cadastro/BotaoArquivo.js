import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { corPlaceholderCad } from '../../constants';

const BotaoArquivo = (props) => {
    return (
        <TouchableOpacity {...props} style={styles.botaocadastro}>
            <Text style={styles.textocadastro}>{props.texto ? props.texto : 'Escolha um arquivo'}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    botaocadastro: {
        width: '50%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fafafa',
        borderRadius: 50,
        marginTop: 10,
        // marginBottom: 35,
        elevation: 5,
    },
    textocadastro: {
        color: corPlaceholderCad,
        fontSize: 18,
    },
});

export default BotaoArquivo