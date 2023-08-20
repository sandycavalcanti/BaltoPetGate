import { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { corDicaCad, corFundoCampoCad, corPlaceholderCad, valorBordaCampoCad } from '../../constants';

const CampoDica = (props) => {
    const [textoDica, setTextoDica] = useState(false);
    return (
        <View style={styles.containercampo}>
            <TextInput onChangeText={text => props.set(text)} onFocus={() => setTextoDica(true)} onBlur={() => setTextoDica(false)} placeholderTextColor={corPlaceholderCad} style={styles.campo} {...props} />
            {props.opcional ? <Text style={styles.asterisco}></Text> : <Text style={styles.asterisco}>*</Text>}
            {textoDica && <Text style={styles.dica}>{props.textodica}</Text>}
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

export default CampoDica