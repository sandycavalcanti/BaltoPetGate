import { TouchableOpacity, ActivityIndicator, Text, View, TextInput, StyleSheet, ScrollView, Image } from "react-native";
import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import GroupBox from "../../components/cadastro/GroupBox";
import Campo from "../../components/animal/Campo";
import DropdownSimples from "../../components/animal/DropdownSimples";
import RadioButton3 from "../../components/animal/Radiobutton3";
import RadioButton2 from "../../components/animal/radioButton2";
import BotaoCadastrar from "../../components/cadastro/BotaoCadastrar";
import ContainerCadastro from "../../components/cadastro/ContainerCadastro";
import { corBotaoCad, corRosaForte, corRosaFraco, urlAPI } from "../../constants";
import DecodificarToken from "../../utils/DecodificarToken";
import BotaoArquivo from "../../components/cadastro/BotaoArquivo";
import * as ImagePicker from 'expo-image-picker';
import Mensagem from "../../components/cadastro/Mensagem";
import { MultiSelect } from 'react-native-element-dropdown';
import FormData from 'form-data';
import BotaoCheckBox from "../../components/geral/BotaoCheckBox";
import CatchError from "../../utils/CatchError";
import CampoSimplesAnimado from "../../components/cadastro/CampoSimplesAnimado";
import CampoEnderecoAnimado from "../../components/cadastro/CampoEnderecoAnimado";
import BotaoCadastrarAnimado from "../../components/cadastro/BotaoCadastrarAnimado";
import AlertPro from "react-native-alert-pro";

const CadAnimal = ({ navigation: { navigate } }) => {
    const TB_PESSOA_IDD = useRef(null);
    const nome = useRef('');
    const idade = useRef();
    const [idadeTipo, setIdadeTipo] = useState('');
    const [porte, setPorte] = useState('');
    const peso = useRef();
    const [cor, setCor] = useState('');
    const [sexo, setSexo] = useState('');
    const [especie, setEspecie] = useState('');
    const descricao = useRef('');
    const localResgate = useRef('');
    const cuidadoEspecial = useRef('');
    const castrado = useRef('');
    const vermifugado = useRef('');
    const microchip = useRef('');
    const saude = useRef();

    const cep = useRef('');
    const uf = useRef('');
    const cidade = useRef('');
    const bairro = useRef('');
    const rua = useRef('');
    const [alerta, setAlerta] = useState(false);

    const situacoesBanco = useRef([]);
    const traumasBanco = useRef([]);
    const temperamentosBanco = useRef([]);

    const [situacoes, setSituacoes] = useState([]);
    const [traumas, setTraumas] = useState([]);
    const [temperamentos, setTemperamentos] = useState([]);

    const [carregando, setCarregando] = useState(true);
    const [message, setMessage] = useState('');
    const alertRef = useRef(null);
    const [textoAlert, setTextoAlert] = useState('');
    const controller = new AbortController();

    const Cadastrar = () => {
        InserirDados();
    }

    const PegarId = async () => {
        const decodedToken = await DecodificarToken();
        TB_PESSOA_IDD.current = decodedToken.TB_PESSOA_IDD;
    }

    const ListarOpcoes = async () => {
        await Promise.all([
            axios.get(urlAPI + 'selsituacao', { signal: controller.signal })
                .then(response => {
                    const dados = response.data;
                    const options = dados.map(item => ({
                        label: item.TB_SITUACAO_DESCRICAO,
                        value: item.TB_SITUACAO_ID,
                    }));
                    situacoesBanco.current = options;
                }).catch(CatchError),
            axios.get(urlAPI + 'seltrauma', { signal: controller.signal })
                .then(response => {
                    const dados = response.data;
                    const options = dados.map(item => ({
                        label: item.TB_TRAUMA_DESCRICAO,
                        value: item.TB_TRAUMA_ID,
                    }));
                    traumasBanco.current = options;
                }).catch(CatchError),
            axios.get(urlAPI + 'seltemperamento', { signal: controller.signal })
                .then(response => {
                    const dados = response.data;
                    const options = dados.map(item => ({
                        label: item.TB_TEMPERAMENTO_TIPO,
                        value: item.TB_TEMPERAMENTO_ID,
                    }));
                    temperamentosBanco.current = options;
                }).catch(CatchError),
        ]);
        setCarregando(false);
    }

    useEffect(() => {
        PegarId();
        ListarOpcoes();
        return (() => {
            controller.abort();
        })
    }, []);

    const TipoIdade = [
        { label: 'Ano(s)', value: 'ANO' },
        { label: 'Mes(es)', value: 'MES' }
    ];
    const Porte = [
        { label: 'Pequeno', value: 'PEQUENO' },
        { label: 'Médio', value: 'MEDIO' },
        { label: 'Grande', value: 'GRANDE' }
    ];
    const Especie = [
        { label: 'Cachorro', value: 'CACHORRO' },
        { label: 'Gato', value: 'GATO' }
    ];
    const Sexo = [
        { label: 'Fêmea', value: 'FEMEA' },
        { label: 'Macho', value: 'MACHO' }
    ];

    const InserirDados = async () => {
        const formData = new FormData();
        let imagem = {
            uri: image,
            type: 'image/jpeg',
            name: 'image.jpg',
        };

        formData.append('TB_PESSOA_ID', TB_PESSOA_IDD.current);
        formData.append('TB_ANIMAL_NOME', nome.current);
        formData.append('TB_ANIMAL_IDADE', idade.current);
        formData.append('TB_ANIMAL_IDADE_TIPO', idadeTipo);
        formData.append('TB_ANIMAL_PORTE', porte);
        formData.append('TB_ANIMAL_PESO', peso.current);
        formData.append('TB_ANIMAL_SEXO', sexo);
        formData.append('TB_ANIMAL_ESPECIE', especie);
        formData.append('TB_ANIMAL_SAUDE', saude.current);
        formData.append('TB_ANIMAL_DESCRICAO', descricao.current);
        formData.append('TB_ANIMAL_LOCALIZACAO_UF', uf.current);
        formData.append('TB_ANIMAL_LOCALIZACAO_CIDADE', cidade.current);
        formData.append('TB_ANIMAL_LOCALIZACAO_BAIRRO', bairro.current);
        formData.append('TB_ANIMAL_LOCALIZACAO_RUA', rua.current);
        formData.append('TB_ANIMAL_CUIDADO_ESPECIAL', cuidadoEspecial.current);
        formData.append('TB_ANIMAL_VERMIFUGADO', vermifugado.current);
        formData.append('TB_ANIMAL_CASTRADO', castrado.current);
        formData.append('TB_ANIMAL_MICROCHIP', microchip.current);
        formData.append('TB_ANIMAL_LOCAL_RESGATE', localResgate.current);
        formData.append('TB_ANIMAL_ALERTA', alerta);
        formData.append('TEMPERAMENTOS', temperamentos);
        formData.append('SITUACOES', situacoes);
        formData.append('TRAUMAS', traumas);
        formData.append('img', imagem);

        await axios.post(urlAPI + 'cadanimal', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }).then(response => {
            setTextoAlert(response.data.message);
            alertRef.current.open();
            setMessage('Cadastrado');
        }).catch(CatchError)
    };

    const [image, setImage] = useState(null);

    const escolherImg = async () => {
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


    return (
        <ContainerCadastro titulo='Cadastro animal'>
            <GroupBox titulo='Insira uma imagem do animal'>
                {image && <Image style={styles.Imagem} source={{ uri: image }} />}
                <BotaoArquivo onPress={escolherImg} texto={image ? 'Trocar imagem' : null} />
            </GroupBox>
            <GroupBox titulo='Informações'>
                <CampoSimplesAnimado placeholder="Nome do animal" setRef={nome} />
                <View style={styles.containerCampos}>
                    <Campo styleView={{ flex: 0.8 }} placeholder="Idade" keyboardType="numeric" setRef={idade} />
                    <DropdownSimples data={TipoIdade} set={setIdadeTipo} texto='Ano(s) ou Mes(es)' />
                </View>
                <View style={styles.ContainerDublo}>
                    <View style={styles.campo}>
                        <DropdownSimples data={Porte} texto='Porte' set={setPorte} />
                    </View>
                    <View style={styles.campo}>
                        <Campo styleView={{ flex: 0.9 }} placeholder="Peso" keyboardType="numeric" setRef={peso} />
                        <Text style={styles.Texto}>Kg</Text>
                    </View>
                </View>
                <View style={styles.containerCampos}>
                    <DropdownSimples data={Especie} texto='Especie' set={setEspecie} />
                    <DropdownSimples data={Sexo} texto='Sexo' set={setSexo} />
                </View>
            </GroupBox>

            <GroupBox titulo='Descrição'>
                {/* <CampoSimples placeholder="Cor(es)" set={setCor} /> */}
                <CampoSimplesAnimado placeholder="Minha historia" setRef={descricao} />
                <CampoSimplesAnimado placeholder="Local do resgate" setRef={localResgate} />
                <CampoSimplesAnimado placeholder="Cuidados necessarios com o pet" setRef={cuidadoEspecial} opcional />
            </GroupBox>
            <GroupBox titulo='Saúde'>
                <RadioButton2 setRef={saude} />
            </GroupBox>
            <GroupBox titulo='Castrado'>
                <RadioButton3 setRef={castrado} />
            </GroupBox>
            <GroupBox titulo='Vermifugado'>
                <RadioButton3 setRef={vermifugado} />
            </GroupBox>
            <GroupBox titulo='Microchipado'>
                <RadioButton3 setRef={microchip} />
            </GroupBox>
            {carregando ?
                <View style={{ marginVertical: 10 }}>
                    <ActivityIndicator size='large' color={corRosaForte} />
                </View>
                :
                <>
                    <GroupBox titulo='Temperamentos'>
                        <MultiSelect
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            iconStyle={styles.iconStyle}
                            data={temperamentosBanco.current}
                            labelField="label"
                            valueField="value"
                            placeholder="Selecione os temperamentos"
                            value={temperamentos}
                            onChange={item => {
                                console.log(item)
                                setTemperamentos(item);
                            }}
                            selectedStyle={styles.selectedStyle}
                        />
                    </GroupBox>
                    <GroupBox titulo='Situações'>
                        <MultiSelect
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            iconStyle={styles.iconStyle}
                            data={situacoesBanco.current}
                            labelField="label"
                            valueField="value"
                            placeholder="Selecione as situações"
                            value={situacoes}
                            onChange={item => {
                                setSituacoes(item);
                            }}
                            selectedStyle={styles.selectedStyle}
                        />
                    </GroupBox>
                    <GroupBox titulo='Traumas (Opcional)'>
                        <MultiSelect
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            iconStyle={styles.iconStyle}
                            data={traumasBanco.current}
                            labelField="label"
                            valueField="value"
                            placeholder="Selecione os traumas"
                            value={traumas}
                            onChange={item => {
                                setTraumas(item);
                            }}
                            selectedStyle={styles.selectedStyle}
                        />
                    </GroupBox>
                </>
            }
            <GroupBox titulo='Localização'>
                <CampoEnderecoAnimado setRef1={cep} setRef2={uf} setRef3={cidade} setRef4={bairro} setRef5={rua} />
            </GroupBox>
            <BotaoCheckBox texto='Animal em estado de alerta' valor={alerta} onPress={() => setAlerta(prev => !prev)} styleTexto={{ color: '#fafafa', fontSize: 18 }} corBoxAtivado={'#AA3939'} />
            <Mensagem texto={message} />
            <BotaoCadastrarAnimado onPress={Cadastrar} texto='Cadastrar' />
            <AlertPro
                ref={alertRef}
                onConfirm={() => alertRef.current.close()}
                title="Cadastrado!"
                message={textoAlert}
                showCancel={false}
                textConfirm="OK"
                customStyles={{ buttonConfirm: { backgroundColor: corBotaoCad }, message: { textAlign: 'left' } }}
            />
        </ContainerCadastro>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#a5cbd3',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    campo: {
        width: '46%',
        fontSize: 18,
        paddingHorizontal: 10,
        color: '#8EBF81',
        backgroundColor: "#fff",
        borderRadius: 15,
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
    },
    containerCampos: {
        width: '95%',
        justifyContent: "space-between",
        flexDirection: "row",
        backgroundColor: '#fff',
        borderRadius: 15,
        alignItems: "center"
    },
    ContainerDublo: {
        width: '95%',
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    Texto: {
        color: '#447837',
        right: 0,
        fontSize: 18
    },
    Imagem: {
        width: 250,
        height: 250,
        marginTop: 20,
        borderWidth: 2,
        borderColor: '#fafafa',
    },
    dropdown: {
        height: 40,
        backgroundColor: '#fff',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        width: '95%',
        borderRadius: 25,
        paddingLeft: 10,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        color: '#fafafa',
        fontSize: 14,
        textAlign: 'center'
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    selectedStyle: {
        backgroundColor: corRosaFraco,
        borderRadius: 12,
    },
});

export default CadAnimal;