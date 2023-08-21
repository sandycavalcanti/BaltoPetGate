import { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { corDicaCad, corFundoCampoCad, corPlaceholderCad, valorBordaCampoCad } from '../../constants';

const CampoTelefone = (props) => {

    const [textoDica, setTextoDica] = useState(false);
    const [texto, setTexto] = useState('');
    
    const formatarTextoCampo = (text) => {
        const dataFormatadaCampo = text.replace(/[()a-zA-Z]/g, '');
        console.log(dataFormatadaCampo)
        props.set1(1);

        if (dataFormatadaCampo.length <= 0) {
            setTexto(dataFormatadaCampo);
        } else if (dataFormatadaCampo.length <= 2) {
            setTexto(`(${dataFormatadaCampo.slice(0,2)}`);
        } else {
            setTexto(`(${dataFormatadaCampo.slice(0,2)})${dataFormatadaCampo.slice(2,12)}`);
            props.set1(dataFormatadaCampo);
        }
    };

    return (
        <View style={styles.containercampo}>
            <TextInput onChangeText={text => formatarTextoCampo(text)} value={texto} placeholderTextColor={corPlaceholderCad} placeholder={"Telefone"} onFocus={() => setTextoDica(true)} onBlur={() => setTextoDica(false)} keyboardType='numeric' style={styles.campo} />
            <Text style={styles.asterisco}>*</Text>
            <TextInput onChangeText={text => props.set2(text)} placeholderTextColor={corPlaceholderCad} placeholder={"Outro Telefone (Opcional)"} onFocus={() => setTextoDica(true)} onBlur={() => setTextoDica(false)} keyboardType='numeric' style={styles.campo} />
            {textoDica && <Text style={styles.dica}>Insira o DDD e apenas números</Text>}
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
        top: 10,
        bottom: 0,
    },
    dica: {
        fontSize: 14,
        color: corDicaCad,
        textAlign: 'center',
    },
});

export default CampoTelefone