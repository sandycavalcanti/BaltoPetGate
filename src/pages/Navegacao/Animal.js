import AnimalPost from '../../components/perfil/AnimalPost';
import { TouchableOpacity, Text, View, StyleSheet, FlatList } from 'react-native';
import { corFundoCad, urlAPI } from '../../constants';
import { useEffect, useState } from 'react';
import axios from 'axios';

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
            <FlatList
                data={select}
                renderItem={({ item }) => (
                    <AnimalPost navigate={navigate} />
                )}
                keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
            />
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
