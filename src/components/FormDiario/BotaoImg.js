import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { corBotaoCad, corTextoBotaoCad } from '../../constants';

const BotaoImg = (props) => {
    return (
        <TouchableOpacity {...props} style={styles.botaocadastro}>
            <Text style={styles.textocadastro}>{props.texto ? props.texto : 'Acrescentar uma imagem'}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    botaocadastro: {
        width: '90%',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EEECEC',
        borderRadius: 10,
        marginTop: '10%',
        marginBottom: 15,
        elevation: 5,
    },
    textocadastro: {
        color: '#8EBF81',
        fontSize: 18,
    },
});

export default BotaoImg