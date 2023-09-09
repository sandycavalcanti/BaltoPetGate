import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { memo } from 'react';
import { format } from 'date-fns'

const AnimalPost = memo((props) => {
    let id = props.id;
    const dataOriginal = props.data;
    const dataFormatada = format(new Date(dataOriginal), 'dd/MM/yy');
    
    return (
        <View>
            <View style={styles.Container}>
                <TouchableOpacity onPress={() => props.navigate('Ficha', { id })}>
                    <View style={styles.ContainerImagem}>
                        <Image style={styles.Imagem} resizeMode='cover' source={require('../../../assets/img/teste.jpg')} />
                    </View>
                </TouchableOpacity>
                <View style={styles.ContainerTexto}>
                    <Text style={styles.Texto}>{props.texto}</Text>
                </View>
            </View>
            <View style={styles.ContainerData}>
                <Text style={styles.Data}>{dataFormatada}</Text>
            </View>
        </View>
    )
});

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        height: 'auto',
    },
    ContainerImagem: {
        width: '100%'
    },
    Imagem: {
        width: '100%',
        height: undefined,
        aspectRatio: 1
    },
    ContainerTexto: {
        padding: 20
    },
    Texto: {
        color: '#216357'
    },
    ContainerData: {
        padding: 10,
        paddingRight: 15,
        borderColor: '#FFBEBE',
        borderTopWidth: 1,
        alignItems: 'flex-end'
    },
    Data: {
        color: '#216357'

    }
});

export default AnimalPost;