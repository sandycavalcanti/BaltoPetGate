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
import CheckBoxComponent from "../../components/cadastro/CheckBoxComponent";
import ContainerCadastro from "../../components/cadastro/ContainerCadastro";
import { urlAPI } from "../../constants";
import DecodificarToken from "../../utils/DecodificarToken";
import BotaoArquivo from "../../components/cadastro/BotaoArquivo";
import * as ImagePicker from 'expo-image-picker';
import { Avatar } from 'react-native-paper';
import Mensagem from "./Mensagem";

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

    const Cadastrar = () => {
        InserirDados();
    }

    const PegarId = async () => {
        const decodedToken = await DecodificarToken();
        TB_PESSOA_IDD = decodedToken.TB_PESSOA_IDD;
    }

    useEffect(() => {
        PegarId();
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
    const [message, setMessage] = useState('');

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
                    <CampoSimples placeholder="Cor(es)" set={setCor} />
                    <CampoSimples placeholder="Minha historia" set={setDescricao} />
                    <CampoSimples placeholder="Local do resgate" set={setLocalResgate} />
                    <CampoSimples placeholder="Cuidados necessarios com o pet" set={setCuidadoEspecial} />
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
                <GroupBox titulo='Localização'>
                    <CampoEndereco set2={setUf} set3={setCidade} set4={setBairro} set5={setRua} />
                </GroupBox>
                <CheckBoxComponent texto='Animal em estado de alerta' set={setAlerta} />
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
        marginTop: 20
    }
});

export default CadAnimal;