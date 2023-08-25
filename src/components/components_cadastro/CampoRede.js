import { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { corDicaCad, corFundoCampoCad, corPlaceholderCad, valorBordaCampoCad } from '../../constants';

const CampoRede = (props) => {

    const [textoDica, setTextoDica] = useState(false);
    let msg;
    { props.opcional ? msg = ' (Opcional)' : msg = '' }
    return (
        <View style={styles.containercampo}>
            <TextInput onChangeText={text => props.set1(text)} placeholderTextColor={corPlaceholderCad} placeholder={"Instagram" + msg} onFocus={() => setTextoDica(true)} onBlur={() => setTextoDica(false)} keyboardType='url' style={styles.campo} />
            {props.opcional ? <Text style={styles.asterisco}></Text> : <Text style={styles.asterisco}>*</Text>}
            <View>
                <TextInput onChangeText={text => props.set2(text)} placeholderTextColor={corPlaceholderCad} placeholder={"Link do Facebook" + msg} onFocus={() => setTextoDica(true)} onBlur={() => setTextoDica(false)} keyboardType='url' style={styles.campo} />
                {props.opcional ? <Text style={styles.asterisco}></Text> : <Text style={styles.asterisco}>*</Text>}
            </View>
            {textoDica && <Text style={styles.dica}>Insira o link das redes sociais</Text>}
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

export default CampoRede
