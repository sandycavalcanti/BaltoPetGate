import AnimalPost from '../../components/perfil/AnimalPost';
import { TouchableOpacity, Text, View, StyleSheet, FlatList, Dimensions, ToastAndroid } from 'react-native';
import { corFundoCad, urlAPI } from '../../constants';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Perfil_post from '../../components/perfil/Perfil_post';

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

const Animal = ({ navigation: { navigate } }) => {
    const [select, setSelect] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const controller = new AbortController();

    const Selecionar = () => {
        axios.get(urlAPI + 'selanimais', { signal: controller.signal })
            .then(response => {
                setSelect(response.data);
                setIsFetching(false);
            }).catch(error => {
                if (error.response) {
                    let erro = error.response.data;
                    ToastAndroid.show(erro.message, ToastAndroid.SHORT);
                    console.error(erro.error, error);
                } else {
                    console.error('Error:', error);
                    ToastAndroid.show('Um erro aconteceu', ToastAndroid.SHORT);
                }
            })
    }

    useEffect(() => {
        Selecionar();
        return (() => {
            controller.abort();
        })
    }, []);

    const onRefresh = () => {
        setIsFetching(true);
        Selecionar();
    }

    return (
        <View style={styles.container}>
            <>
                <FlatList style={styles.Lista} data={select} onRefresh={onRefresh} refreshing={isFetching} keyExtractor={item => item.TB_ANIMAL_ID} renderItem={({ item }) => (
                    <>
                        <Perfil_post data={item} />
                        <AnimalPost data={item} />
                    </>
                )} />
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
