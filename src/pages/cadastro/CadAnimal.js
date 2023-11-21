import { TouchableOpacity, Text, View, TextInput, StyleSheet, ScrollView, Image } from "react-native";
import { useState, useEffect } from "react";
import axios from 'axios';
import CampoSimples from "../../components/cadastro/CampoSimples";
import GroupBox from "../../components/cadastro/GroupBox";
import Campo from "../../components/animal/Campo";
import DropdownSimples from "../../components/animal/DropdownSimples";
import RadioButton3 from "../../components/animal/Radiobutton3";
import RadioButton2 from "../../components/animal/radioButton2";
import BotaoCadastrar from "../../components/cadastro/BotaoCadastrar";
import CampoEndereco from "../../components/cadastro/CampoEndereco";
import ContainerCadastro from "../../components/cadastro/ContainerCadastro";
import { urlAPI } from "../../constants";
import DecodificarToken from "../../utils/DecodificarToken";
import BotaoArquivo from "../../components/cadastro/BotaoArquivo";
import * as ImagePicker from 'expo-image-picker';
import Mensagem from "../../components/cadastro/Mensagem";
import { MultiSelect } from 'react-native-element-dropdown';
import FormData from 'form-data';
import BotaoCheckBox from "../../components/geral/BotaoCheckBox";

let TB_PESSOA_IDD;

const CadAnimal = ({ navigation: { navigate } }) => {
    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState();
    const [idadeTipo, setIdadeTipo] = useState('');
    const [porte, setPorte] = useState('');
    const [peso, setPeso] = useState();
    const [cor, setCor] = useState('');
    const [sexo, setSexo] = useState('');
    const [especie, setEspecie] = useState('');
    const [saude, setSaude] = useState('');
    const [descricao, setDescricao] = useState('');
    const [localResgate, setLocalResgate] = useState('');
    const [castrado, setCastrado] = useState('');
    const [vermifugado, setVermifugado] = useState('');
    const [microchip, setMicrochip] = useState('');
    const [cuidadoEspecial, setCuidadoEspecial] = useState('');
    const [uf, setUf] = useState('');
    const [cidade, setCidade] = useState('');
    const [bairro, setBairro] = useState('');
    const [rua, setRua] = useState('');
    const [alerta, setAlerta] = useState(false);

    const [situacoesBanco, setSituacoesBanco] = useState([]);
    const [traumasBanco, setTraumasBanco] = useState([]);
    const [temperamentosBanco, setTemperamentosBanco] = useState([]);

    const [situacoes, setSituacoes] = useState([]);
    const [traumas, setTraumas] = useState([]);
    const [temperamentos, setTemperamentos] = useState([]);

    const [message, setMessage] = useState('');

    const Cadastrar = () => {
        InserirDados();
    }

    const PegarId = async () => {
        const decodedToken = await DecodificarToken();
        TB_PESSOA_IDD = decodedToken.TB_PESSOA_IDD;
    }

    const ListarOpcoes = async () => {
        axios.get(urlAPI + 'selsituacao')
            .then(response => {
                const dados = response.data;
                const options = dados.map(item => ({
                    label: item.TB_SITUACAO_DESCRICAO,
                    value: item.TB_SITUACAO_ID,
                }));
                setSituacoesBanco(options)
            }).catch(error => {
                console.error(error)
            });
        axios.get(urlAPI + 'seltrauma')
            .then(response => {
                const dados = response.data;
                const options = dados.map(item => ({
                    label: item.TB_TRAUMA_DESCRICAO,
                    value: item.TB_TRAUMA_ID,
                }));
                setTraumasBanco(options)
            }).catch(error => {
                console.error(error)
            });
        axios.get(urlAPI + 'seltemperamento')
            .then(response => {
                const dados = response.data;
                const options = dados.map(item => ({
                    label: item.TB_TEMPERAMENTO_TIPO,
                    value: item.TB_TEMPERAMENTO_ID,
                }));
                setTemperamentosBanco(options)
            }).catch(error => {
                console.error(error)
            });
    }

    useEffect(() => {
        PegarId();
        ListarOpcoes();
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

        formData.append('TB_PESSOA_ID', TB_PESSOA_IDD);
        formData.append('TB_ANIMAL_NOME', nome);
        formData.append('TB_ANIMAL_IDADE', idade);
        formData.append('TB_ANIMAL_IDADE_TIPO', idadeTipo);
        formData.append('TB_ANIMAL_PORTE', porte);
        formData.append('TB_ANIMAL_PESO', peso);
        formData.append('TB_ANIMAL_SEXO', sexo);
        formData.append('TB_ANIMAL_ESPECIE', especie);
        formData.append('TB_ANIMAL_SAUDE', saude);
        formData.append('TB_ANIMAL_DESCRICAO', descricao);
        formData.append('TB_ANIMAL_LOCALIZACAO_UF', uf);
        formData.append('TB_ANIMAL_LOCALIZACAO_CIDADE', cidade);
        formData.append('TB_ANIMAL_LOCALIZACAO_BAIRRO', bairro);
        formData.append('TB_ANIMAL_LOCALIZACAO_RUA', rua);
        formData.append('TB_ANIMAL_CUIDADO_ESPECIAL', cuidadoEspecial);
        formData.append('TB_ANIMAL_VERMIFUGADO', vermifugado);
        formData.append('TB_ANIMAL_CASTRADO', castrado);
        formData.append('TB_ANIMAL_MICROCHIP', microchip);
        formData.append('TB_ANIMAL_LOCAL_RESGATE', localResgate);
        formData.append('TB_ANIMAL_ALERTA', alerta);
        formData.append('img', imagem);

        await axios.post(urlAPI + 'cadanimal', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }).then(response => {
            console.log(response.data.message);
            setMessage('Cadastrado');
        }).catch(error => {
            console.error('Erro ao cadastrar:', error)
            console.error(error.response.data)
        })
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
        <ScrollView>
            <ContainerCadastro titulo='Cadastro animal'>
                <GroupBox titulo='Insira uma imagem do animal'>
                    {image && <Image style={styles.Imagem} source={{ uri: image }} />}
                    <BotaoArquivo onPress={escolherImg} />
                </GroupBox>
                <GroupBox titulo='Informações'>
                    <CampoSimples placeholder="Nome do animal" set={setNome} />

                    <View style={styles.containerCampos}>
                        <Campo placeholder="Idade" keyboardType="numeric" set={setIdade} />
                        <DropdownSimples data={TipoIdade} set={setIdadeTipo} texto='Ano(s) ou Mes(es)' />
                    </View>
                    <View style={styles.ContainerDublo}>
                        <View style={styles.campo}>
                            <DropdownSimples data={Porte} texto='Porte' set={setPorte} />
                        </View>
                        <View style={styles.campo}>
                            <Campo placeholder="Peso" keyboardType="numeric" set={setPeso} />
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
                    <CampoSimples placeholder="Minha historia" set={setDescricao} />
                    <CampoSimples placeholder="Local do resgate" set={setLocalResgate} />
                    <CampoSimples placeholder="Cuidados necessarios com o pet" set={setCuidadoEspecial} opcional />
                </GroupBox>
                <GroupBox titulo='Saúde'>
                    <RadioButton2 set={setSaude} />
                </GroupBox>
                <GroupBox titulo='Castrado'>
                    <RadioButton3 set={setCastrado} />
                </GroupBox>
                <GroupBox titulo='Vermifugado'>
                    <RadioButton3 set={setVermifugado} />
                </GroupBox>
                <GroupBox titulo='Microchipado'>
                    <RadioButton3 set={setMicrochip} />
                </GroupBox>
                <GroupBox titulo='Temperamentos'>
                    <MultiSelect
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        iconStyle={styles.iconStyle}
                        data={temperamentosBanco}
                        labelField="label"
                        valueField="value"
                        placeholder="Selecione os temperamentos"
                        value={temperamentos}
                        onChange={item => {
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
                        data={situacoesBanco}
                        labelField="label"
                        valueField="value"
                        placeholder="Selecione os temperamentos"
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
                        data={traumasBanco}
                        labelField="label"
                        valueField="value"
                        placeholder="Selecione os temperamentos"
                        value={traumas}
                        onChange={item => {
                            setTraumas(item);
                        }}
                        selectedStyle={styles.selectedStyle}
                    />
                </GroupBox>
                <GroupBox titulo='Localização'>
                    <CampoEndereco set2={setUf} set3={setCidade} set4={setBairro} set5={setRua} />
                </GroupBox>
                <BotaoCheckBox texto='Animal em estado de alerta' valor={alerta} onPress={() => setAlerta(prev => !prev)} styleTexto={{ color: '#fafafa', fontSize: 18 }} corBoxAtivado={'#AA3939'} />
                <Mensagem texto={message} />
                <BotaoCadastrar onPress={Cadastrar} texto='Cadastrar' />
            </ContainerCadastro>
        </ScrollView>
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
        left: 20,
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
        fontSize: 14,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    selectedStyle: {
        backgroundColor: '#fff',
        borderRadius: 12,
    },
});

export default CadAnimal;