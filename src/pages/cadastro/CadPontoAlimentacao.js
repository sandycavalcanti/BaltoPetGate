
import { useState, useEffect, useRef } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { Modal, StyleSheet, Text, View, Button, TextInput, Image, TouchableOpacity, ToastAndroid } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject, watchPositionAsync, LocationAccuracy } from 'expo-location';
import axios from 'axios';
import { corRosaForte, urlAPI } from '../../constants';
import Imagem from '../../components/geral/Imagem';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import FormData from 'form-data';
import DecodificarToken from '../../utils/DecodificarToken';

const CadPontoAlimento = () => {
    const [location, setLocation] = useState(null);
    const [redMarkerCoords, setRedMarkerCoords] = useState(null);
    const [orangeMarkersCoords, setOrangeMarkersCoords] = useState([]);
    const [isOrangeModalVisible, setIsOrangeModalVisible] = useState(false);
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');
    const [cadastrando, setCadastrando] = useState(false);
    const coordenadas = useRef({});
    const TB_PESSOA_IDD = useRef(null);

    async function requestLocationPermissions() {
        const { granted } = await requestForegroundPermissionsAsync();

        if (granted) {
            const currentPosition = await getCurrentPositionAsync();
            setLocation(currentPosition);
            setRedMarkerCoords(currentPosition.coords);
            console.log("LOCALIZAÇÃO ATUAL =>", currentPosition);
        }
    }

    useEffect(() => {
        // requestLocationPermissions();
    }, []);

    // useEffect(() => {
    //   watchPositionAsync({
    //     accuracy: LocationAccuracy.Highest,
    //     timeInterval: 1000,
    //     distanceInterval: 1,
    //   }, (response) => {
    //     console.log("NOVA LOCALIZAÇÃO!", response);
    //     setLocation(response);
    //   });
    // }, []);

    const PegarId = async () => {
        const decodedToken = await DecodificarToken();
        TB_PESSOA_IDD.current = decodedToken.TB_PESSOA_IDD;
    }

    const getMarkers = async () => {
        const response = await axios.get(urlAPI + 'selpontoalimentacao');
        const newCoords = response.data.map((item) => {
            const id = item.TB_PONTO_ALIMENTACAO_ID;
            const nomePerfil = item.TB_PESSOA.TB_PESSOA_NOME_PERFIL;
            const latitude = parseFloat(item.TB_PONTO_ALIMENTACAO_LATITUDE);
            const longitude = parseFloat(item.TB_PONTO_ALIMENTACAO_LONGITUDE);
            const createdAt = item.createdAt;
            const updatedAt = item.updatedAt;
            return { latitude, longitude, id, nomePerfil, createdAt, updatedAt };
        });
        setOrangeMarkersCoords([...orangeMarkersCoords, ...newCoords]);
    };

    useEffect(() => {
        PegarId();
        getMarkers();
    }, [])

    const Inserir = async () => {
        if (image) {
            const formData = new FormData();
            let imagem = {
                uri: image,
                type: 'image/jpeg',
                name: 'image.jpg',
            };

            const latitude = coordenadas.current.latitude.toFixed(6);
            const longitude = coordenadas.current.longitude.toFixed(6);
            formData.append('img', imagem);
            formData.append('TB_PESSOA_ID', TB_PESSOA_IDD.current);
            formData.append('TB_PONTO_ALIMENTACAO_LATITUDE', latitude);
            formData.append('TB_PONTO_ALIMENTACAO_LONGITUDE', longitude);

            await axios.post(urlAPI + 'cadpontoalimentacao/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            }).then(response => {
                setCadastrando(false)
                setIsOrangeModalVisible(false);
                const coordenadasArray = [coordenadas.current]
                setOrangeMarkersCoords([...orangeMarkersCoords, ...coordenadasArray]);
            }).catch(error => {
                let erro = error.response.data;
                ToastAndroid.show(erro.message, ToastAndroid.SHORT);
                console.error(erro.error, error);
            })
        } else {
            ToastAndroid.show('Insira uma imagem', ToastAndroid.SHORT);
        }
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const onPress = (props) => {
        if (cadastrando) {
            setIsOrangeModalVisible(true);
            setCadastrando(false);
            coordenadas.current = props.nativeEvent.coordinate
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ position: 'absolute', left: 10, bottom: 20, zIndex: 10 }}>
                <TouchableOpacity onPress={() => setCadastrando(prev => !prev)}>
                    {cadastrando ?
                        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                            <Ionicons name="close-circle" size={50} color="black" />
                            <Text style={{ fontSize: 18 }}>Clique em um lugar no mapa para cadastrar um ponto</Text>
                        </View>
                        :
                        <AntDesign name="pluscircle" size={50} color={corRosaForte} />}
                </TouchableOpacity>
            </View>
            <Text style={{ position: 'absolute', top: 10, textAlign: 'center', left: 0, right: 0, fontSize: 16, zIndex: 10 }}>Cadastre seu ponto de alimentação!</Text>
            <MapView style={{ width: '100%', height: '100%' }}
                initialRegion={{
                    latitude:
                        -23.447440,
                    //  location.coords.latitude,
                    longitude:
                        -46.917877,
                    // location.coords.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005
                }}
                onPress={onPress}
            >
                {orangeMarkersCoords.map((coords, index) => {
                    const dataAtual = new Date();
                    const dataFornecida = new Date(coords.updatedAt);
                    const diferencaEmMilissegundos = dataAtual - dataFornecida;
                    const diferencaEmDias = Math.floor(diferencaEmMilissegundos / (1000 * 60 * 60 * 24));
                    return (
                        <Marker key={index} coordinate={coords} >
                            <Imagem url={urlAPI + 'selpontoalimentacaoimg/' + coords.id} style={{ borderRadius: 125 }} />
                            <Callout onPress={() => setIsOrangeModalVisible(true)} style={{ minWidth: 200, justifyContent: 'center', alignItems: 'center' }} >
                                <Text>Ponto de Alimentação de {coords.nomePerfil}</Text>
                                <Imagem url={urlAPI + 'selpontoalimentacaoimg/' + coords.id} style={{ height: 50 }} />
                                <Text>Ativo há {diferencaEmDias} {diferencaEmDias == 1 ? 'dia' : 'dias'}</Text>
                            </Callout>
                        </Marker>
                    )
                })}
            </MapView>
            <Modal animationType="slide" transparent={false} visible={isOrangeModalVisible}>
                <View style={styles.modalContainer}>
                    <Text>Selecione uma imagem:</Text>
                    <Button title="Escolher imagem" onPress={pickImage} />
                    {image &&
                        <>
                            <Text>Imagem selecionada:</Text>
                            <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
                        </>
                    }
                    <Button title="Confirmar" onPress={Inserir} />
                    <Button title="Cancelar" onPress={() => setIsOrangeModalVisible(false)} />
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

export default CadPontoAlimento;