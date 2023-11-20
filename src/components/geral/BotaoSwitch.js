import { View, Text, StyleSheet } from 'react-native'
import { useState } from 'react'
import { Switch } from 'react-native-elements';
import PropTypes from 'prop-types';
import { corHabilitado } from '../../constants';

const BotaoSwitch = (props) => {
    const [isEnabled, setIsEnabled] = useState(false);
    let corSwitchHabilitado = props.corFundo ? props.corFundo : corHabilitado;
    let corBotaoHabilitado = props.corBotao ? props.corBotao : '#f4f3f4';

    const onValueChange = () => {
        setIsEnabled(!isEnabled);
        if (props.set) props.set(!isEnabled);
        if (props.setRef) props.setRef.current = !isEnabled
    }

    return (
        <View style={styles.container}>
            <Switch
                trackColor={{ true: corSwitchHabilitado, false: '#767577' }}
                thumbColor={isEnabled ? corBotaoHabilitado : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={onValueChange}
                value={isEnabled}
            />
            <Text style={[styles.texto, props.styleTexto]}>{props.texto}</Text>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    texto: {
        fontSize: 16,
    }
});

BotaoSwitch.propTypes = {
    texto: PropTypes.string,
    setRef: PropTypes.bool,
    styleTexto: PropTypes.object,
    corFundo: PropTypes.string,
    corBotao: PropTypes.string,
}

export default BotaoSwitch