import AnimalPost from '../../components/perfil/AnimalPost';
import { TouchableOpacity, Text, View, StyleSheet, FlatList, ScrollView } from 'react-native';
import { corFundoCad, urlAPI } from '../../constants';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Perfil_post from '../../components/perfil/Perfil_post';

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
            <ScrollView>
                <FlatList
                    data={select}
                    renderItem={({ item }) => (
                        <>
                            <Perfil_post/>
                            <AnimalPost navigate={navigate} data={item} /> 
                        </>
                    )}
                    keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: corFundoCad,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
        height: '100%',
        padding: 0,
    },
});

export default Animal;
