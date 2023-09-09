import {View, Text, StyleSheet} from 'react-native';

const TextoMultiplo = (props) => {
    return(
        <View style={styles.Container}>
            <Text style={styles.Descricao}>
                {props.textoMultiplo}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    Container:{
        backgroundColor:'#fff',
        marginLeft: 5,
        borderColor: '#82D7E9',
        borderWidth: 2,
        borderRadius: 12,
        padding: 6
    },
    Descricao:{
        color: '#299FB8',
        fontSize: 15,
        marginRight: 7,
        marginLeft: 7
    }
});

export default TextoMultiplo;