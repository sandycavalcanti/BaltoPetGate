import { corBotaoCad } from '../../constants'
import { ThemedButton } from 'react-native-really-awesome-button'
import PropTypes from 'prop-types';
import { View } from 'react-native';

const BotaoCadastrarAnimado = (props) => {

    return (
        <View style={{ marginTop: props.marginTop ? props.marginTop : 10, marginBottom: props.marginBottom ? props.marginBottom : 35 }}>
            <ThemedButton
                {...props}
                name="bojack"
                type="primary"
                backgroundColor={props.corBotao ? props.corBotao : corBotaoCad}
                backgroundDarker={props.corBotaoFundo ? props.corBotaoFundo : "#CC9A9A"}
                borderRadius={15}
                textSize={20}
                width={props.width ? props.width : 175}
                height={props.height ? props.height : 55}
                disabled={props.disabled}
            >
                {props.texto ? props.texto : 'Cadastrar'}
            </ThemedButton>
        </View>
    )
}

BotaoCadastrarAnimado.propTypes = {
    texto: PropTypes.string,
    onPress: PropTypes.func,
    corBotao: PropTypes.string,
    corBotaoFundo: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    marginTop: PropTypes.number,
    marginBottom: PropTypes.number,
    disabled: PropTypes.bool
}

export default BotaoCadastrarAnimado