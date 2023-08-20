import { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { corDicaCad, corFundoCampoCad, corPlaceholderCad, valorBordaCampoCad } from '../../constants';

const CampoSenha = (props) => {
    const [textoDica, setTextoDica] = useState(false);
    return (
        <View style={styles.containercampo}>
            <TextInput placeholder="Senha" onChangeText={text => props.set1(text)} onFocus={() => setTextoDica(true)} onBlur={() => setTextoDica(false)} placeholderTextColor={corPlaceholderCad} style={styles.campo} {...props} />
            <Text style={styles.asterisco}>*</Text>
            {textoDica && <Text style={styles.dica}>A senha deve possuir no mínimo 8 caracteres, um número e uma letra maíscula</Text>}
            <View>
                <TextInput placeholder="Confirmação de senha" onChangeText={text => props.set2(text)} placeholderTextColor={corPlaceholderCad} style={styles.campo} {...props} />
                <Text style={styles.asterisco}>*</Text>
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
        top: 10,
        bottom: 0,
    },
    dica: {
        fontSize: 14,
        color: corDicaCad,
        textAlign: 'center',
    },
});

export default CampoSenha