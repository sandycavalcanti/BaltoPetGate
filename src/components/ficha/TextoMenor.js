import {View, Text, StyleSheet} from 'react-native';

const TextoMenor = (props) => {
    return(
        <View style={styles.Container}>
            <Text style={styles.Titulo}>
                {props.textoTitulo}
            </Text>
            <Text style={styles.Descricao}>
                {props.textoDescricao}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    Container:{
        flexDirection: 'row',
        padding: 3
    },
    Titulo:{
        color: '#096D82',
        fontSize: 16,
        paddingRight: 5
    },
    Descricao:{
        color: '#299FB8',
        fontSize: 16
    }
});

export default TextoMenor;