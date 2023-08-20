import {View, Text, StyleSheet} from 'react-native';

const TextoComum = (props) => {
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
        padding: 10
    },
    Titulo:{
        color: '#096D82',
        fontSize: 20,
        paddingRight: 7  
    },
    Descricao:{
        color: '#299FB8',
        fontSize: 20
    }
});

export default TextoComum;