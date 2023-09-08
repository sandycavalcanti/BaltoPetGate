import { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { corDicaCad, corFundoCampoCad, corPlaceholderCad, valorBordaCampoCad } from '../../constants';

const CampoRede = (props) => {

    const [textoDica, setTextoDica] = useState('');

    let msg;
    if (props.opcional) msg = ' (Opcional):'
    else msg = ''

    const formatarTextoInstagram = (text) => {
        const dataFormatadaCampo = text.replace(/[@#]/g, '').replace('https://www.', '').toLowerCase();
        props.set1(dataFormatadaCampo);
    };

    const formatarTextoFacebook = (text) => {
        const dataFormatadaCampo = text.replace(/[@#]/g, '').replace('https://www.', '').toLowerCase();
        props.set2(dataFormatadaCampo);
    };

    return (
        <View style={styles.containercampo}>
            {!props.opcional && <Text style={styles.titulocampo}>Insira pelo menos uma rede social:</Text>}
            {!props.opcional && <Text style={styles.asterisco}>*</Text>}
            <TextInput onChangeText={text => formatarTextoInstagram(text)} placeholderTextColor={corPlaceholderCad} placeholder={"Instagram" + msg} onFocus={() => setTextoDica('Você pode inserir o seu nome de usuário ou o link do Instagram')} onBlur={() => setTextoDica('')}
                keyboardType='url' value={props.val1} style={styles.campo} />
            <TextInput onChangeText={text => formatarTextoFacebook(text)} placeholderTextColor={corPlaceholderCad} placeholder={"Link do Facebook" + msg} onFocus={() => setTextoDica('Você deve inserir o link do Facebook')} onBlur={() => setTextoDica('')}
                keyboardType='url' value={props.val2} style={styles.campo} />
            {textoDica && <Text style={styles.dica}>{textoDica}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    containercampo: {
        width: '95%',
    },
    titulocampo: {
        fontSize: 18,
        marginBottom: 5,
        color: '#fff',
        textAlign: 'center',
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
    },
    dica: {
        fontSize: 14,
        color: corDicaCad,
        textAlign: 'center',
    },
});

export default CampoRede
