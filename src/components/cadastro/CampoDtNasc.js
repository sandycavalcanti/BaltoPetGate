import { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { corDicaCad, corFundoCampoCad, corPlaceholderCad, valorBordaCampoCad } from '../../constants';

const CampoDtNasc = (props) => {
    const [data, setData] = useState('');

    useEffect(() => {
        if (props.val) {
            const dataOriginal = props.val;
            const partesData = dataOriginal.split("-");

            const novaData = partesData[2] + partesData[1] + partesData[0];
            formatarDataCampo(novaData)
        }
    }, [])
    
    const formatarDataCampo = (text) => {
        const dataFormatadaCampo = text.replace(/\D/g, '');
        props.set(1);

        if (dataFormatadaCampo.length <= 2) {
            setData(dataFormatadaCampo);
        } else if (dataFormatadaCampo.length <= 4) {
            setData(`${dataFormatadaCampo.slice(0, 2)}/${dataFormatadaCampo.slice(2)}`);
        } else {
            const dataFormatada = `${dataFormatadaCampo.slice(0, 2)}/${dataFormatadaCampo.slice(2, 4)}/${dataFormatadaCampo.slice(4, 8)}`;
            setData(dataFormatada);
            props.set(formatarDataBanco(dataFormatada));
        }
    };

    const formatarDataBanco = (data) => {
        const anoAtual = new Date().getFullYear();
        const [dia, mes, ano] = data.split('/').map(Number);

        if (!isNaN(dia) && !isNaN(mes) && !isNaN(ano) && mes >= 1 && mes <= 12 && dia > 0 && dia <= 31 && ano > anoAtual - 120 && ano < anoAtual - 12) {
            const dataObjeto = new Date(ano, mes - 1, dia);

            const isValidDate = (date) => date instanceof Date && !isNaN(date);

            if (isValidDate(dataObjeto)) {
                const dataObjetoDate = dataObjeto.toISOString().split('T')[0];
                return dataObjetoDate;
            }
        }
        return 1;
    };

    const [textoDica, setTextoDica] = useState(false);

    return (
        <View style={styles.containercampo}>
            <TextInput onChangeText={(text) => formatarDataCampo(text)} value={data} keyboardType="numeric"
                placeholder="Data de nascimento" maxLength={10} onFocus={() => setTextoDica(true)} onBlur={() => setTextoDica(false)}
                placeholderTextColor={corPlaceholderCad} style={styles.campo} {...props} />
            {!props.opcional && <Text style={styles.asterisco}>*</Text>}
            {textoDica && <Text style={styles.dica}>Insira a data no formato DD/MM/YYYY</Text>}
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

export default CampoDtNasc