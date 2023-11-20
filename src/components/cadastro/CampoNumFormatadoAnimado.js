import { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { corDicaCad, corFundoCampoCad, corPlaceholderCad, valorBordaCampoCad } from '../../constants';
import PropTypes from 'prop-types';
import FormatarTexto from '../../utils/FormatarTexto';

const CampoNumFormatadoAnimado = (props) => {
    const [texto, setTexto] = useState('');
    const tipo = props.tipo;

    useEffect(() => {
        if (props.val) {
            setTexto(FormatarTexto(props.val, tipo));
        }
    }, [])

    const formatarTextoCrmv = (text) => {
        const dataFormatadaCampo = text.replace(/[\D.\-a-zA-Z]/g, '');
        props.set(1);
        setTexto(dataFormatadaCampo);

        if (dataFormatadaCampo.length >= 4 && dataFormatadaCampo.length <= 7)
            props.set(dataFormatadaCampo);
    };

    const formatarTextoCnpj = (text) => {
        const dataFormatadaCampo = text.replace(/[\D.\-a-zA-Z]/g, '');
        props.set(1);

        if (dataFormatadaCampo.length <= 2) {
            setTexto(dataFormatadaCampo);
        } else if (dataFormatadaCampo.length <= 5) {
            setTexto(`${dataFormatadaCampo.slice(0, 2)}.${dataFormatadaCampo.slice(2, 5)}`);
        } else if (dataFormatadaCampo.length <= 8) {
            setTexto(`${dataFormatadaCampo.slice(0, 2)}.${dataFormatadaCampo.slice(2, 5)}.${dataFormatadaCampo.slice(5, 8)}`);
        } else if (dataFormatadaCampo.length <= 12) {
            setTexto(`${dataFormatadaCampo.slice(0, 2)}.${dataFormatadaCampo.slice(2, 5)}.${dataFormatadaCampo.slice(5, 8)}/${dataFormatadaCampo.slice(8, 12)}`);
        } else {
            const dataFormatada = `${dataFormatadaCampo.slice(0, 2)}.${dataFormatadaCampo.slice(2, 5)}.${dataFormatadaCampo.slice(5, 8)}/${dataFormatadaCampo.slice(8, 12)}-${dataFormatadaCampo.slice(12, 14)}`;
            setTexto(dataFormatada);
            if (dataFormatadaCampo.length == 14)
                props.set(dataFormatadaCampo);
        }
    };

    const formatarTextoNum = (text) => {
        const dataFormatadaCampo = text.replace(/[\D.\-a-zA-Z]/g, '');
        props.set(dataFormatadaCampo);
        setTexto(dataFormatadaCampo);
    };

    return (
        <View style={styles.containercampo}>
            <TextInput onChangeText={text => setTexto(FormatarTexto(text, tipo))} value={texto} placeholderTextColor={corPlaceholderCad} style={styles.campo}
                placeholder={props.placeholder ? props.placeholder : props.tipo.toUpperCase()} maxLength={tipo == 'cpf' ? 14 : tipo == 'crmv' ? 7 : tipo == 'cnpj' ? 18 : null} keyboardType='numeric' />
            {!props.opcional && <Text style={styles.asterisco}>*</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    containercampo: {
        width: '95%',
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
        top: 10,
        bottom: 0,
    },
});

CampoNumFormatadoAnimado.propTypes = {
    set: PropTypes.func,
    val: PropTypes.number || PropTypes.string,
    opcional: PropTypes.bool,
    tipo: PropTypes.string,
    placeholder: PropTypes.string
}

export default CampoNumFormatadoAnimado