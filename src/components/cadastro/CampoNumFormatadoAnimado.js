import { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Animated, Easing } from 'react-native';
import { corDicaCad, corFundoCampoCad, corPlaceholderCad, valorBordaCampoCad } from '../../constants';
import PropTypes from 'prop-types';
import FormatarTexto from '../../utils/FormatarTexto';
import { Hoshi } from 'react-native-textinput-effects';

const CampoNumFormatadoAnimado = (props) => {
    const [texto, setTexto] = useState('');
    const tipo = props.tipo;
    const [focus, setFocus] = useState(false);
    const [marginTopAnimation] = useState(new Animated.Value(5));

    useEffect(() => {
        Animated.timing(marginTopAnimation, {
            toValue: focus ? 20 : 5,
            duration: 200,
            easing: Easing.ease,
            useNativeDriver: false,
        }).start();
    }, [focus, marginTopAnimation]);

    const onChangeText = (text) => {
        setTexto(FormatarTexto(text, tipo));
        props.setRef.current = text.replace(/\D/g, '');
    }

    useEffect(() => {
        if (props.val) {
            setTexto(FormatarTexto(props.val, tipo));
        }
    }, [])

    return (
        <Animated.View style={[styles.containercampo, { marginTop: marginTopAnimation }]}>
            <Hoshi
                label={props.placeholder ? props.placeholder : props.tipo.toUpperCase()}
                borderColor={corPlaceholderCad}
                borderHeight={1}
                inputStyle={{ fontWeight: '600' }}
                labelStyle={[styles.labelStyle, { display: (props.setRef.current && !focus) ? 'none' : 'flex', paddingHorizontal: focus ? 10 : 0 }]}
                style={{ bottom: 4, width: !props.opcional ? '90%' : '94%', borderBottomColor: 'transparent', marginLeft: -5 }}
                onChangeText={onChangeText}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                maxLength={tipo == 'cpf' ? 14 : tipo == 'crmv' ? 7 : tipo == 'cnpj' ? 18 : null}
                keyboardType='numeric'
                value={texto}
                defaultValue={props.val}
            />
            {!props.opcional && <Text style={styles.asterisco}>*</Text>}
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    containercampo: {
        width: '95%',
        borderRadius: valorBordaCampoCad,
        backgroundColor: corFundoCampoCad,
        height: 35,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: "center",
        marginBottom: 5
    },
    campo: {
        width: '100%',
        fontSize: 18,
        paddingHorizontal: 10,
        padding: 5,
        backgroundColor: corFundoCampoCad,
        borderRadius: valorBordaCampoCad,
        marginVertical: 5,
    },
    dica: {
        fontSize: 14,
        color: corDicaCad,
        textAlign: 'center',
    },
    asterisco: {
        position: 'absolute',
        fontSize: 25,
        color: 'red',
        right: 10,
    },
    labelStyle: {
        color: corPlaceholderCad,
        fontSize: 18,
        borderRadius: 15,
        backgroundColor: corFundoCampoCad,
    },
});

CampoNumFormatadoAnimado.propTypes = {
    setRef: PropTypes.object,
    val: PropTypes.number || PropTypes.string,
    opcional: PropTypes.bool,
    tipo: PropTypes.string,
    placeholder: PropTypes.string
}

export default CampoNumFormatadoAnimado