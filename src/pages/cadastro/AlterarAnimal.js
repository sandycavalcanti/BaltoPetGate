import { TouchableOpacity, Text, View, TextInput, StyleSheet, ScrollView, Image, ToastAndroid, ActivityIndicator } from "react-native";
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
import { corRosaForte, urlAPI } from "../../constants";
import DecodificarToken from "../../utils/DecodificarToken";
import BotaoArquivo from "../../components/cadastro/BotaoArquivo";
import * as ImagePicker from 'expo-image-picker';
import Mensagem from "../../components/cadastro/Mensagem";
import { MultiSelect } from 'react-native-element-dropdown';
import { useRoute } from "@react-navigation/native";
import FormData from 'form-data';
import BotaoCheckBox from "../../components/geral/BotaoCheckBox";
import Imagem from "../../components/geral/Imagem";

let TB_PESSOA_IDD;

const AlterarAnimal = ({ navigation: { navigate } }) => {
    const route = useRoute();
    const { id } = route.params;
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
    const [carregando, setCarregando] = useState(true);
    const controller = new AbortController();

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
        axios.get(urlAPI + 'selsituacoes/filtrar', { TB_ANIMAL_ID: id })
            .then(response => {
                const dados = response.data;
                const options = dados.map(
                    item.TB_SITUACAO.TB_SITUACAO_DESCRICAO
                );
                setSituacoes(options)
            }).catch(error => {
                if (error.response && error.response.status != 404) {
                    console.error(error)
                }
            });
        axios.get(urlAPI + 'seltraumas/filtrar', { TB_ANIMAL_ID: id })
            .then(response => {
                const dados = response.data;
                const options = dados.map(
                    item.TB_TRAUMA.TB_TRAUMA_DESCRICAO
                );
                setTraumas(options)
            }).catch(error => {
                if (error.response && error.response.status != 404) {
                    console.error(error)
                }
            });
        axios.post(urlAPI + 'seltemperamentos/filtrar', { TB_ANIMAL_ID: id })
            .then(response => {
                const dados = response.data;
                const options = dados.map(item =>
                    item.TB_TEMPERAMENTO.TB_TEMPERAMENTO_TIPO
                );
                setTemperamentos(options)
            }).catch(error => {
                if (error.response && error.response.status != 404) {
                    console.error(error)
                }
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
    const [dadosanimal, setDadosanimal] = useState({});

    useEffect(() => {
        const Selecionar = async () => {
            axios.post(urlAPI + 'selanimal/filtrar', {
                TB_ANIMAL_ID: id,
            }).then(response => {
                setDadosanimal(response.data[0]);
                setCarregando(false)
            }).catch(error => {
                let erro = error.response.data;
                ToastAndroid.show(erro.message, ToastAndroid.SHORT);
                console.error('Erro ao selecionar:', erro.error);
            });
        };
        Selecionar();
    }, []);

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
                {carregando ? <View style={{ flex: 1 }}><ActivityIndicator size="large" color={corRosaForte} /></View> :
                    <>
                        <GroupBox titulo='Insira uma imagem do animal'>
                            {image ? <Image style={styles.Imagem} source={{ uri: image }} /> : <Imagem style={styles.Imagem} url={urlAPI + "selanimalimg/" + id} />}
                            <BotaoArquivo onPress={escolherImg} />
                        </GroupBox>
                        <GroupBox titulo='Informações'>
                            <CampoSimples placeholder="Nome do animal" set={setNome} defaultValue={dadosanimal.TB_ANIMAL_NOME} />

                            <View style={styles.containerCampos}>
                                <Campo placeholder="Idade" keyboardType="numeric" set={setIdade} defaultValue={dadosanimal.TB_ANIMAL_IDADE.toString()} />
                                <DropdownSimples data={TipoIdade} set={setIdadeTipo} texto='Ano(s) ou Mes(es)' val={dadosanimal.TB_ANIMAL_IDADE_TIPO} />
                            </View>
                            <View style={styles.ContainerDublo}>
                                <View style={styles.campo}>
                                    <DropdownSimples data={Porte} texto='Porte' set={setPorte} val={dadosanimal.TB_ANIMAL_PORTE} />
                                </View>
                                <View style={styles.campo}>
                                    <Campo placeholder="Peso" keyboardType="numeric" set={setPeso} defaultValue={dadosanimal.TB_ANIMAL_PESO.toString()} />
                                    <Text style={styles.Texto}>Kg</Text>
                                </View>
                            </View>
                            <View style={styles.containerCampos}>
                                <DropdownSimples data={Especie} texto='Especie' set={setEspecie} val={dadosanimal.TB_ANIMAL_ESPECIE} />
                                <DropdownSimples data={Sexo} texto='Sexo' set={setSexo} val={dadosanimal.TB_ANIMAL_SEXO} />
                            </View>
                        </GroupBox>

                        <GroupBox titulo='Descrição'>
                            {/* <CampoSimples placeholder="Cor(es)" set={setCor} /> */}
                            <CampoSimples placeholder="Minha historia" set={setDescricao} defaultValue={dadosanimal.TB_ANIMAL_DESCRICAO} />
                            <CampoSimples placeholder="Local do resgate" set={setLocalResgate} defaultValue={dadosanimal.TB_ANIMAL_LOCAL_RESGATE} />
                            <CampoSimples placeholder="Cuidados necessarios com o pet" set={setCuidadoEspecial} opcional defaultValue={dadosanimal.TB_ANIMAL_CUIDADO_ESPECIAL} />
                        </GroupBox>
                        <GroupBox titulo='Saúde'>
                            <RadioButton2 set={setSaude} val={dadosanimal.TB_ANIMAL_SAUDE} />
                        </GroupBox>
                        <GroupBox titulo='Castrado'>
                            <RadioButton3 set={setCastrado} val={dadosanimal.TB_ANIMAL_CASTRADO} />
                        </GroupBox>
                        <GroupBox titulo='Vermifugado'>
                            <RadioButton3 set={setVermifugado} val={dadosanimal.TB_ANIMAL_VERMIFUGADO} />
                        </GroupBox>
                        <GroupBox titulo='Microchipado'>
                            <RadioButton3 set={setMicrochip} val={dadosanimal.TB_ANIMAL_MICROCHIP} />
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
                            <CampoEndereco set2={setUf} set3={setCidade} set4={setBairro} set5={setRua} val2={dadosanimal.TB_ANIMAL_LOCALIZACAO_UF} val3={dadosanimal.TB_ANIMAL_LOCALIZACAO_CIDADE} val4={dadosanimal.TB_ANIMAL_LOCALIZACAO_BAIRRO} val5={dadosanimal.TB_ANIMAL_LOCALIZACAO_RUA} />
                        </GroupBox>
                        <BotaoCheckBox texto='Animal em estado de alerta' valor={alerta} onPress={() => setAlerta(prev => !prev)} styleTexto={{ color: '#fafafa', fontSize: 18 }} corBoxAtivado={'#AA3939'} jaativado={dadosanimal.TB_ANIMAL_ALERTA} />
                        <Mensagem texto={message} />
                        <BotaoCadastrar onPress={Cadastrar} texto='Cadastrar' />
                    </>
                }
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

export default AlterarAnimal;