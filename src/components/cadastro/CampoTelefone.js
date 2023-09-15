import { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { corDicaCad, corFundoCampoCad, corPlaceholderCad, valorBordaCampoCad } from '../../constants';

const formatarTextoCampo = (text, props, setTexto) => {
    const dataFormatadaCampo = text.replace(/[\D.\-()a-zA-Z]/g, '');
    props(1);

    if (dataFormatadaCampo.length <= 2) {
        setTexto(dataFormatadaCampo);
    } else if (dataFormatadaCampo.length <= 3) {
        setTexto(`(${dataFormatadaCampo.slice(0, 2)}) ${dataFormatadaCampo.slice(2, 3)}`);
    } else if (dataFormatadaCampo.length === 11) {
        setTexto(`(${dataFormatadaCampo.slice(0, 2)}) ${dataFormatadaCampo.slice(2, 7)}-${dataFormatadaCampo.slice(7, 11)}`);
        props(dataFormatadaCampo);
    } else {
        setTexto(`(${dataFormatadaCampo.slice(0, 2)}) ${dataFormatadaCampo.slice(2, 13)}`);
        props(dataFormatadaCampo);
    }
};

const CampoTelefone = (props) => {
    const [textoDica, setTextoDica] = useState(false);
    const [texto1, setTexto1] = useState();
    const [texto2, setTexto2] = useState();
    const [texto3, setTexto3] = useState();

    useEffect(() => {
        if (props.val1) formatarTextoCampo(props.val1, props.set1, setTexto1);
        if (props.val2) formatarTextoCampo(props.val2, props.set2, setTexto2);
        if (props.val3) formatarTextoCampo(props.val3, props.set3, setTexto3);
    }, []);

    return (
        <View style={styles.containercampo}>
            <View>
                <TextInput onChangeText={(text) => formatarTextoCampo(text, props.set1, setTexto1)} value={texto1} maxLength={16} placeholder={"Telefone de contato"} onFocus={() => setTextoDica(true)} onBlur={() => setTextoDica(false)} keyboardType='numeric' placeholderTextColor={corPlaceholderCad} style={styles.campo} />
                <Text style={styles.asterisco}>*</Text>
            </View>
            <TextInput onChangeText={(text) => formatarTextoCampo(text, props.set2, setTexto2)} value={texto2} maxLength={16} placeholder={"Outro Telefone (Opcional)"} onFocus={() => setTextoDica(true)} onBlur={() => setTextoDica(false)} keyboardType='numeric' placeholderTextColor={corPlaceholderCad} style={styles.campo} />
            <View>
                <TextInput onChangeText={(text) => formatarTextoCampo(text, props.set3, setTexto3)} value={texto3} maxLength={16} placeholder={props.opcional ? "WhatsApp (Opcional)" : "WhatsApp"} onFocus={() => setTextoDica(true)} onBlur={() => setTextoDica(false)} placeholderTextColor={corPlaceholderCad} style={styles.campo} keyboardType='numeric' />
                {!props.opcional && <Text style={styles.asterisco}>*</Text>}
            </View>
            {textoDica && <Text style={styles.dica}>Insira o DDD</Text>}
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
    asterisco: {
        position: 'absolute',
        fontSize: 25,
        color: 'red',
        right: 10,
        bottom: 5,
    },
    dica: {
        fontSize: 14,
        color: corDicaCad,
        textAlign: 'center',
    },
});

export default CampoTelefone;