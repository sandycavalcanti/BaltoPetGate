import { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { corDicaCad, corFundoCampoCad, corPlaceholderCad, valorBordaCampoCad } from '../../constants';

const CampoCpf = (props) => {
    const [textoDica, setTextoDica] = useState(false);
    const [texto, setTexto] = useState('');
    
    const formatarTextoCampo = (text) => {
        const dataFormatadaCampo = text.replace(/[\D.\-a-zA-Z]/g, '');
        props.set(1);

        if (dataFormatadaCampo.length <= 3) {
            setTexto(dataFormatadaCampo);
        } else if (dataFormatadaCampo.length <= 6) {
            setTexto(`${dataFormatadaCampo.slice(0, 3)}.${dataFormatadaCampo.slice(3)}`);
        } else if (dataFormatadaCampo.length <= 9) {
            setTexto(`${dataFormatadaCampo.slice(0, 3)}.${dataFormatadaCampo.slice(3,6)}.${dataFormatadaCampo.slice(6,9)}`);
        } else {
            const dataFormatada = `${dataFormatadaCampo.slice(0, 3)}.${dataFormatadaCampo.slice(3,6)}.${dataFormatadaCampo.slice(6,9)}-${dataFormatadaCampo.slice(9,11)}`;
            setTexto(dataFormatada);
            if(dataFormatadaCampo.length == 11)
                props.set(dataFormatadaCampo);
        }
    };

    return (
        <View style={styles.containercampo}>
            <TextInput onChangeText={text => formatarTextoCampo(text)} value={texto} onFocus={() => setTextoDica(true)} onBlur={() => setTextoDica(false)} placeholderTextColor={corPlaceholderCad} style={styles.campo} placeholder={"CPF"} keyboardType='numeric' maxLength={14} />
            {props.opcional ? <Text style={styles.asterisco}></Text> : <Text style={styles.asterisco}>*</Text>}
            {textoDica && <Text style={styles.dica}>Insira apenas números</Text>}
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

export default CampoCpf