import { View, Text, StyleSheet, Image } from 'react-native';

const Temperamento = (props) => {
    return (
        <View style={styles.Container}>
            <View style={styles.Campo}>
                <Text style={styles.Data}>Alegre</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
    },
    Campo:{
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 12
    },
    Texto:{
        color: '#74AC86',
        fontSize: 16
    }
});

export default Temperamento;
