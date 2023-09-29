import AnimalPost from '../../components/perfil/AnimalPost';
import { TouchableOpacity, Text, View, StyleSheet, FlatList, ScrollView, Dimensions } from 'react-native';
import { corFundoCad, urlAPI } from '../../constants';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Perfil_post from '../../components/perfil/Perfil_post';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Animal = ({ navigation: { navigate } }) => {
    const [select, setSelect] = useState([]);

    const Selecionar = () => {
        axios.get(urlAPI + 'selanimal')
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
                    keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
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
