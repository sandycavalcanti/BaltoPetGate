import AnimalPost from '../../components/perfil/AnimalPost';
import { TouchableOpacity, Text, View, StyleSheet, FlatList, ScrollView, Dimensions } from 'react-native';
import { corFundoCad, urlAPI } from '../../constants';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Perfil_post from '../../components/perfil/Perfil_post';

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

const Animal = ({ navigation: { navigate } }) => {
    const [select, setSelect] = useState([]);

    const Selecionar = () => {
        axios.get(urlAPI + 'selanimais')
            .then((response) => {
                setSelect(response.data)
            }).catch((error) => {
                console.error('Error:', error)
            })
    }

    useEffect(() => {
        Selecionar()
    }, []);

    return (
        <View style={styles.container}>
            <>
                <FlatList
                    style={styles.Lista}
                    data={select}
                    renderItem={({ item }) => (
                        <>
                            <Perfil_post navigate={navigate} data={item} />
                            <AnimalPost navigate={navigate} data={item} />
                        </>
                    )}
                />
            </>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: corFundoCad,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: windowWidth,
        height: '100%',
        padding: 0,
    },
    Lista: {
        width: '100%'
    }
});

export default Animal;
