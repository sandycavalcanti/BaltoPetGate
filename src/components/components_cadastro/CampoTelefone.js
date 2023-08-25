import { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { corDicaCad, corFundoCampoCad, corPlaceholderCad, valorBordaCampoCad } from '../../constants';

const CampoTelefone = (props) => {

    const [textoDica, setTextoDica] = useState(false);
    const [texto1, setTexto1] = useState();
    const [texto2, setTexto2] = useState();
    const [texto3, setTexto3] = useState();

    const formatarTextoCampo1 = (text) => {
        const dataFormatadaCampo = text.replace(/[\D.\-()a-zA-Z]/g, '');
        props.set1(1);

        if (dataFormatadaCampo.length <= 0) {
            setTexto1(dataFormatadaCampo);
        } else if (dataFormatadaCampo.length <= 2) {
            setTexto1(`(${dataFormatadaCampo.slice(0, 2)}`);
        } else {
            setTexto1(`(${dataFormatadaCampo.slice(0, 2)}) ${dataFormatadaCampo.slice(2, 13)}`);
            props.set1(dataFormatadaCampo);
        }
    };

    const formatarTextoCampo2 = (text) => {
        const dataFormatadaCampo = text.replace(/[\D.\-()a-zA-Z]/g, '');
        props.set2(1);

        if (dataFormatadaCampo.length <= 0) {
            setTexto2(dataFormatadaCampo);
        } else if (dataFormatadaCampo.length <= 2) {
            setTexto2(`(${dataFormatadaCampo.slice(0, 2)}`);
        } else {
            setTexto2(`(${dataFormatadaCampo.slice(0, 2)}) ${dataFormatadaCampo.slice(2, 13)}`);
            props.set2(dataFormatadaCampo);
        }
    };

    const formatarTextoCampoWhatsapp = (text) => {
        const dataFormatadaCampo = text.replace(/[\D.\-()a-zA-Z]/g, '');
        props.set3(1);

        if (dataFormatadaCampo.length <= 0) {
            setTexto3(dataFormatadaCampo);
        } else if (dataFormatadaCampo.length <= 2) {
            setTexto3(`(${dataFormatadaCampo.slice(0, 2)}`);
        } else if (dataFormatadaCampo.length == 11) {
            setTexto3(`(${dataFormatadaCampo.slice(0, 2)}) ${dataFormatadaCampo.slice(2, 7)}-${dataFormatadaCampo.slice(7, 11)}`);
        } else {
            setTexto3(`(${dataFormatadaCampo.slice(0, 2)}) ${dataFormatadaCampo.slice(2, 13)}`);
            props.set3(dataFormatadaCampo);
        }
    };

    return (
        <View style={styles.containercampo}>
            {textoDica && <Text style={styles.dica}>Insira o DDD</Text>}
            <View>
                <TextInput onChangeText={text => formatarTextoCampo1(text)} value={texto1} maxLength={16} placeholder={"Telefone"} onFocus={() => setTextoDica(true)} onBlur={() => setTextoDica(false)} keyboardType='numeric' placeholderTextColor={corPlaceholderCad} style={styles.campo} />
                <Text style={styles.asterisco}>*</Text></View>
            <TextInput onChangeText={text => formatarTextoCampo2(text)} value={texto2} maxLength={16} placeholder={"Outro Telefone (Opcional)"} onFocus={() => setTextoDica(true)} onBlur={() => setTextoDica(false)} keyboardType='numeric' placeholderTextColor={corPlaceholderCad} style={styles.campo} />
            <View>
                <TextInput onChangeText={text => formatarTextoCampoWhatsapp(text)} value={texto3} maxLength={16} placeholder={props.opcional ? "WhatsApp (Opcional)" : "WhatsApp"} onFocus={() => setTextoDica(true)} onBlur={() => setTextoDica(false)} placeholderTextColor={corPlaceholderCad} style={styles.campo} keyboardType='numeric' />
                {props.opcional ? <></> : <Text style={styles.asterisco}>*</Text>}
            </View>
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

export default CampoTelefone