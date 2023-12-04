import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useState } from 'react'
import { corDesabilitado } from '../../constants'
import { MaterialIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

const BotaoCheckBox = (props) => {
    const isCheckedDefaultValue = props.valor ? props.valor : props.jaativado
    const [isChecked, setIsChecked] = useState(isCheckedDefaultValue);
    const corBoxAtivado = props.corBoxAtivado ? props.corBoxAtivado : '#000';
    const corTextoAtivado = props.corTextoAtivado ? props.corTextoAtivado : '#000';

    const toggleCheckBox = () => {
        const valor = !isChecked;
        if (props.setRef) {
            props.setRef.current = valor
        } else if (props.set) {
            props.set(valor)
        }
        setIsChecked(valor);
        if (props.onPress) props.onPress()
    }

    return (
        <TouchableOpacity style={[styles.botao, props.styleBotao]} onPress={toggleCheckBox}>
            {isChecked ?
                <MaterialIcons name="check-box" size={30} color={corBoxAtivado} /> :
                <MaterialIcons name="check-box-outline-blank" size={30} color={corDesabilitado} />}
            <View style={[styles.containerTexto, props.styleViewTexto]}>
                <Text style={[styles.texto, { color: isChecked ? corTextoAtivado : corDesabilitado }, props.styleTexto]}>{props.texto}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    containerTexto: {
        height: 30,
        paddingLeft: 5,
        margin: 2,
        justifyContent: 'center',
    },
    botao: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    texto: {
        fontSize: 16
    },
});

BotaoCheckBox.propTypes = {
    texto: PropTypes.string,
    valor: PropTypes.bool,
    jaativado: PropTypes.bool,
    corBoxAtivado: PropTypes.string,
    styleTexto: PropTypes.object,
    styleBotao: PropTypes.object,
    styleViewTexto: PropTypes.object,
    onPress: PropTypes.func,
    setRef: PropTypes.object
}

export default BotaoCheckBox