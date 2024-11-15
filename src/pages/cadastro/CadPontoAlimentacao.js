
import { useState, useEffect, useRef } from 'react';
import { Modal, StyleSheet, Text, View, Image, TouchableOpacity, ToastAndroid, Dimensions, StatusBar } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { corFundo, corFundoCad, corFundoNavegacao, corRosaForte, corRosaFraco, urlAPI } from '../../constants';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import FormData from 'form-data';
import DecodificarToken from '../../utils/DecodificarToken';
import BotaoArquivo from '../../components/cadastro/BotaoArquivo';
import BotaoCadastrarAnimado from '../../components/cadastro/BotaoCadastrarAnimado';
import * as Location from "expo-location";
import CalcularDistanciaCoordenadas from '../../utils/CalcularDistanciaCoordenadas';
import DropdownAlert, { DropdownAlertType } from 'react-native-dropdownalert';
import MapaMapView from '../../components/navegacao/MapaMapView';
import CatchError from '../../utils/CatchError';
import AlertPro from 'react-native-alert-pro';
import VerificarTamanhoImagem from '../../utils/VerificarTamanhoImagem';

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');
let alert = (_data) => new Promise(res => res);

const CadPontoAlimento = () => {
    const [pontosAlimentacao, setPontosAlimentacao] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [image, setImage] = useState(null);
    const [cadastrando, setCadastrando] = useState(false);
    const coordenadas = useRef({});
    const TB_PESSOA_IDD = useRef(null);
    const TB_PESSOA_NOME_PERFIL = useRef('')
    const [carregando, setCarregando] = useState(true);
    const initialRegion = useRef({
        latitude: -23.447440,
        longitude: -46.917877,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
    })
    const alertRef = useRef(null);
    const tituloAlert = useRef('');
    const [textoAlert, setTextoAlert] = useState('');
    const controller = new AbortController();

    const PegarLocalizacao = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status == "granted") {
                let location = await Location.getCurrentPositionAsync({});

                initialRegion.current = {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                };
            }
            setCarregando(false);
        } catch (error) {
            ToastAndroid.show('Houve um erro ao requisitar a localização', ToastAndroid.SHORT);
            setCarregando(false);
        }
    }

    const Selecionar = async () => {
        await axios.get(urlAPI + 'selpontoalimentacao', { signal: controller.signal })
            .then(response => {
                const newCoords = response.data.map(item => {
                    const id = item.TB_PONTO_ALIMENTACAO_ID;
                    const idPerfil = item.TB_PESSOA_ID;
                    const tipoIdPerfil = item.TB_PESSOA.TB_TIPO_ID;
                    const nomePerfil = item.TB_PESSOA.TB_PESSOA_NOME_PERFIL;
                    const latitude = parseFloat(item.TB_PONTO_ALIMENTACAO_LATITUDE);
                    const longitude = parseFloat(item.TB_PONTO_ALIMENTACAO_LONGITUDE);
                    const possuiImg = item.TB_PESSOA.TB_PESSOA_POSSUI_IMG;
                    const createdAt = item.createdAt;
                    const updatedAt = item.updatedAt;
                    return { latitude, longitude, id, idPerfil, tipoIdPerfil, nomePerfil, possuiImg, createdAt, updatedAt };
                });
                setPontosAlimentacao([...newCoords]);
            }).catch(CatchError);
    };

    const PegarId = async () => {
        const decodedToken = await DecodificarToken();
        TB_PESSOA_IDD.current = decodedToken.TB_PESSOA_IDD;
        TB_PESSOA_NOME_PERFIL.current = decodedToken.TB_PESSOA_NOME_PERFIL;
    }

    useEffect(() => {
        PegarLocalizacao();
        Selecionar();
        PegarId();
        return (() => {
            controller.abort();
        })
    }, []);

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
                setModalVisible(false);
                setImage(null);
                const dados = response.data.response;
                const id = dados.TB_PONTO_ALIMENTACAO_ID;
                const nomePerfil = TB_PESSOA_NOME_PERFIL.current;
                const latitude = parseFloat(dados.TB_PONTO_ALIMENTACAO_LATITUDE);
                const longitude = parseFloat(dados.TB_PONTO_ALIMENTACAO_LONGITUDE);
                const createdAt = new Date();
                const updatedAt = new Date();
                const newCoords = [{ latitude, longitude, id, nomePerfil, createdAt, updatedAt }];
                tituloAlert.current = "Cadastrado!";
                setTextoAlert('Para manter o ponto de alimentação você terá que preencher formulários diários. Caso ficar mais de três dias sem preencher os formulários, seu ponto de alimentação será desativado.');
                alertRef.current.open();
                setPontosAlimentacao([...pontosAlimentacao, ...newCoords]);
            }).catch(CatchError)
        } else {
            tituloAlert.current = "Campos inválidos";
            setTextoAlert('Insira uma imagem');
            alertRef.current.open();
        }
    }


    const EscolherImagem = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            const mensagemArquivo = await VerificarTamanhoImagem(result);
            if (mensagemArquivo) {
                tituloAlert.current = "Arquivo inválido";
                setTextoAlert(mensagemArquivo);
                alertRef.current.open();
                return
            }
            setImage(result.assets[0].uri);
        }
    };


    const onPress = (props) => {
        if (cadastrando) {
            const coordenadasPress = props.nativeEvent.coordinate;
            const distancia = CalcularDistanciaCoordenadas(coordenadasPress, initialRegion.current).toFixed(2);
            if (distancia <= 1 || true) { // Remover true
                setModalVisible(true);
                setCadastrando(false);
                coordenadas.current = coordenadasPress;
            } else {
                alert({
                    type: DropdownAlertType.Error,
                    title: 'Escolha um ponto mais próximo',
                    interval: 6000,
                    message: 'Não é possível cadastrar um ponto a mais de 1Km de distância',
                });
            }
        }
    }

    const [mensagemFalha, setMensagemFalha] = useState(true);

    return (
        <View style={styles.container}>
            {mensagemFalha ?
                <>
                    <Text style={{ color: '#030303', fontSize: 22, textAlign: "center", marginHorizontal: 20 }}>
                        O mapa apresenta falhas no aplicativo. Pedimos desculpas pelo inconveniente.
                    </Text>
                    <Text style={{ color: '#030303', fontSize: 22, textAlign: "center", marginHorizontal: 20, marginTop: 20 }}>
                        O mapa funcionará apenas pelo emulador. (Instruções na página do projeto no GitHub)
                    </Text>
                    <Text style={{ color: '#030303', fontSize: 22, textAlign: "center", marginBottom: 20, marginHorizontal: 20, marginTop: 40 }}>
                        Para contato, envie um email para baltopetgate@gmail.com.
                    </Text>
                    <BotaoCadastrarAnimado texto="Clique aqui para testar o mapa" onPress={() => setMensagemFalha(false)} />
                </>
                :
                <>
                    <View style={styles.containerBottom}>
                        <TouchableOpacity onPress={() => setCadastrando(prev => !prev)}>
                            <View style={styles.containerCadastrando}>
                                {cadastrando ?
                                    <>
                                        <Ionicons name="close-circle" size={50} color="black" />
                                        <Text style={{ fontSize: 18, textAlign: 'justify' }}>Clique em um lugar no mapa para cadastrar um ponto</Text>
                                    </>
                                    :
                                    <>
                                        <AntDesign name="pluscircle" size={50} color={corRosaForte} />
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ fontSize: 20, textAlign: 'center' }}>Cadastre seu ponto de alimentação!</Text>
                                        </View>
                                    </>}
                            </View>
                        </TouchableOpacity>
                    </View>
                    <MapaMapView onPress={onPress} pontosAlimentacao={pontosAlimentacao} initialRegion={initialRegion.current} />
                    <Modal animationType="slide" transparent={false} visible={modalVisible}>
                        <View style={styles.modalContainer}>
                            <Text style={{ color: '#fafafa', fontSize: 18 }}>Selecione uma imagem:</Text>
                            <BotaoArquivo onPress={EscolherImagem} texto={'Escolher imagem'} />
                            {image &&
                                <>
                                    <Text style={styles.textSelectedImage}>Imagem selecionada:</Text>
                                    <Image source={{ uri: image }} style={styles.selectedImage} />
                                </>
                            }
                            <BotaoCadastrarAnimado onPress={Inserir} texto={'Confirmar'} marginBottom={10} marginTop={25} />
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Text style={{ color: '#fafafa' }}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                    <DropdownAlert alert={func => (alert = func)} />
                    <AlertPro
                        ref={alertRef}
                        onConfirm={() => alertRef.current.close()}
                        title={tituloAlert.current}
                        message={textoAlert}
                        showCancel={false}
                        textConfirm="OK"
                        customStyles={{ buttonConfirm: { backgroundColor: corRosaFraco } }}
                    />
                    {modalVisible ?
                        <StatusBar animated backgroundColor={corFundoCad} hidden={false} />
                        :
                        <StatusBar hidden />
                    }
                </>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: corFundoNavegacao,
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewCarregando: {
        width: '100%',
        height: '100%',
        backgroundColor: corFundo,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerCallout: {
        minWidth: 175,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },
    titleCallout: {
        fontSize: 15
    },
    nameCallout: {
        fontSize: 18
    },
    textCallout: {
        marginTop: 20,
        fontSize: 16,
    },
    containerBottom: {
        position: 'absolute',
        left: 10,
        bottom: 20,
        zIndex: 10,
        width: windowWidth - 10
    },
    modalContainer: {
        flex: 1,
        backgroundColor: corFundoCad,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerCadastrando: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    titulo: {
        position: 'absolute',
        top: 10,
        textAlign: 'center',
        left: 0,
        right: 0,
        fontSize: 16,
        zIndex: 10
    },
    textSelectedImage: {
        color: '#fafafa',
        fontSize: 16,
        marginTop: 15,
        marginBottom: 5
    },
    selectedImage: {
        width: 200,
        height: 200,
        borderRadius: 25
    }
});

export default CadPontoAlimento;