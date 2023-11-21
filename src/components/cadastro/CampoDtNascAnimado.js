import { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Animated, Easing } from 'react-native';
import { corDicaCad, corFundoCampoCad, corPlaceholderCad, valorBordaCampoCad } from '../../constants';
import PropTypes from 'prop-types';
import FormatarTextoCampo from '../../utils/FormatarTextoCampo';
import { Hoshi } from 'react-native-textinput-effects';

const CampoDtNascAnimado = (props) => {
    const [texto, setTexto] = useState('');
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
        const texto = FormatarTextoCampo(text, 'data')
        setTexto(texto);
        props.setRef.current = ValidarDtNasc(texto);
    }

    useEffect(() => {
        if (props.val) {
            const dataOriginal = props.val;
            const partesData = dataOriginal.split("-");

            const novaData = partesData[2] + partesData[1] + partesData[0];
            setTexto(FormatarTextoCampo(novaData, 'data'));
        }
    }, [])

    const ValidarDtNasc = (data) => {
        const anoAtual = new Date().getFullYear();
        const [dia, mes, ano] = data.split('/').map(Number);

        if (!isNaN(dia) && !isNaN(mes) && !isNaN(ano) && mes >= 1 && mes <= 12 && dia > 0 && dia <= 31 && ano > anoAtual - 120 && ano < anoAtual - 12) {
            const dataObjeto = new Date(ano, mes - 1, dia);

            const isValidDate = (date) => date instanceof Date && !isNaN(date);

            if (isValidDate(dataObjeto)) {
                const dataObjetoDate = dataObjeto.toISOString().split('T')[0];
                return dataObjetoDate;
            }
        }
        return false;
    };

    return (
        <Animated.View style={[styles.containercampo, { marginTop: marginTopAnimation }]}>
            <Hoshi
                label={"Data de nascimento"}
                borderColor={corPlaceholderCad}
                borderHeight={1}
                inputStyle={{ fontWeight: '600' }}
                labelStyle={[styles.labelStyle, { display: (props.setRef.current && !focus) ? 'none' : 'flex', paddingHorizontal: focus ? 10 : 0 }]}
                style={{ bottom: 4, width: !props.opcional ? '90%' : '94%', borderBottomColor: 'transparent', marginLeft: -5 }}
                onChangeText={onChangeText}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                maxLength={10}
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

CampoDtNascAnimado.propTypes = {
    setRef: PropTypes.object,
    val: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    opcional: PropTypes.bool,
    placeholder: PropTypes.string
}

export default CampoDtNascAnimado