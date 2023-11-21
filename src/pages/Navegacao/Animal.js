import AnimalPost from '../../components/perfil/AnimalPost';
import { View, StyleSheet, FlatList, Dimensions, ToastAndroid, ActivityIndicator } from 'react-native';
import { corFundoCad, corRosaForte, urlAPI } from '../../constants';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Perfil_post from '../../components/perfil/Perfil_post';
import DecodificarToken from '../../utils/DecodificarToken';

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

const Animal = ({ navigation: { navigate } }) => {
    const [select, setSelect] = useState([]);
    const TB_PESSOA_IDD = useRef(null)
    const carregando = useRef(true)
    const [isFetching, setIsFetching] = useState(false);
    const controller = new AbortController();

    const PegarId = async () => {
        const decodedToken = await DecodificarToken();
        TB_PESSOA_IDD.current = decodedToken.TB_PESSOA_IDD;
    }

    const Selecionar = () => {
        axios.get(urlAPI + 'selanimais', { signal: controller.signal })
            .then(response => {
                if (carregando.current) carregando.current = false;
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
        PegarId();
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
            {carregando.current && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator color={corRosaForte} size='large' /></View>}
            <FlatList style={styles.Lista} data={select} onRefresh={onRefresh} refreshing={isFetching} keyExtractor={item => item.TB_ANIMAL_ID} renderItem={({ item }) => {
                const pessoal = item.TB_PESSOA_ID == TB_PESSOA_IDD.current;
                const animalId = item.TB_ANIMAL_ID;
                return (
                    <>
                        <Perfil_post data={item} pessoal={pessoal} tipo='animal' itemId={animalId} />
                        <AnimalPost data={item} />
                    </>
                )
            }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: corFundoCad,
        alignItems: 'center',
        justifyContent: 'center',
        width: windowWidth,
        height: '100%',
        padding: 0,
    },
    Lista: {
        width: '100%'
    }
});

export default Animal;