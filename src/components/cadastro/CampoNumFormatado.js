import { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { corDicaCad, corFundoCampoCad, corPlaceholderCad, valorBordaCampoCad } from '../../constants';

const CampoNumFormatado = (props) => {
    const [textoDica, setTextoDica] = useState(false);
    const [texto, setTexto] = useState('');
    const tipo = props.tipo;

    useEffect(() => {
        if (props.val) {
            if (tipo == 'cpf') {
                formatarTextoCpf(props.val)
            } else if (tipo == 'crmv') {
                formatarTextoCrmv(props.val)
            } else if (tipo == 'cnpj') {
                formatarTextoCnpj(props.val)
            }
        }
    }, [])

    const formatarTextoCpf = (text) => {
        const dataFormatadaCampo = text.replace(/[\D.\-a-zA-Z]/g, '');
        props.set(1);

        if (dataFormatadaCampo.length <= 3) {
            setTexto(dataFormatadaCampo);
        } else if (dataFormatadaCampo.length <= 6) {
            setTexto(`${dataFormatadaCampo.slice(0, 3)}.${dataFormatadaCampo.slice(3)}`);
        } else if (dataFormatadaCampo.length <= 9) {
            setTexto(`${dataFormatadaCampo.slice(0, 3)}.${dataFormatadaCampo.slice(3, 6)}.${dataFormatadaCampo.slice(6, 9)}`);
        } else {
            const dataFormatada = `${dataFormatadaCampo.slice(0, 3)}.${dataFormatadaCampo.slice(3, 6)}.${dataFormatadaCampo.slice(6, 9)}-${dataFormatadaCampo.slice(9, 11)}`;
            setTexto(dataFormatada);
            if (dataFormatadaCampo.length == 11)
                props.set(dataFormatadaCampo);
        }
    };

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
            {tipo === 'cpf' ?
                <TextInput onChangeText={text => formatarTextoCpf(text)} value={texto} placeholderTextColor={corPlaceholderCad} style={styles.campo}
                    placeholder={"CPF"} keyboardType='numeric' maxLength={14} />
                : tipo === 'crmv' ?
                    <TextInput onChangeText={text => formatarTextoCrmv(text)} value={texto} placeholderTextColor={corPlaceholderCad} style={styles.campo}
                        placeholder={"CRMV"} keyboardType='numeric' maxLength={7} />
                    : tipo === 'cnpj' ?
                        <TextInput onChangeText={text => formatarTextoCnpj(text)} value={texto} placeholderTextColor={corPlaceholderCad} style={styles.campo}
                            placeholder={"CNPJ"} keyboardType='numeric' maxLength={18} />
                        : <TextInput onChangeText={text => formatarTextoNum(text)} value={texto} onFocus={() => setTextoDica(true)} onBlur={() => setTextoDica(false)} placeholderTextColor={corPlaceholderCad} style={styles.campo}
                            keyboardType='numeric' {...props} />}
            {!props.opcional && <Text style={styles.asterisco}>*</Text>}
            {textoDica && props.textodica && <Text style={styles.dica}>{props.textodica}</Text>}
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

export default CampoNumFormatado