import { TouchableOpacity, ActivityIndicator, Text, View, TextInput, StyleSheet, ScrollView, Image } from "react-native";
import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import GroupBox from "../../components/cadastro/GroupBox";
import Campo from "../../components/animal/Campo";
import DropdownSimples from "../../components/animal/DropdownSimples";
import RadioButton3 from "../../components/animal/Radiobutton3";
import RadioButton2 from "../../components/animal/radioButton2";
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
import VerificarTamanhoImagem from "../../utils/VerificarTamanhoImagem";
import ValidarCamposAnimal from "../../utils/ValidarCamposAnimal";
import { useRoute } from "@react-navigation/native";
import Imagem from "../../components/geral/Imagem";

const AlterarAnimal = ({ navigation }) => {
    const route = useRoute();
    const { id } = route.params;
    const TB_PESSOA_IDD = useRef(null);
    const nome = useRef('');
    const idade = useRef();
    const idadeTipo = useRef('');
    const porte = useRef('');
    const peso = useRef();
    const sexo = useRef('');
    const especie = useRef('');
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
    const alerta = useRef(false);

    const [dadosanimal, setDadosanimal] = useState({});
    const situacoesBanco = useRef([]);
    const traumasBanco = useRef([]);
    const temperamentosBanco = useRef([]);
    const [situacoes, setSituacoes] = useState([]);
    const [traumas, setTraumas] = useState([]);
    const [temperamentos, setTemperamentos] = useState([]);

    const [carregando, setCarregando] = useState(true);
    const [message, setMessage] = useState({});
    const [image, setImage] = useState(null);
    const alertRef = useRef(null);
    const [textoAlert, setTextoAlert] = useState('');
    const controller = new AbortController();

    const Cadastrar = () => {
        const camposObrigatorios = [nome.current, idade.current, idadeTipo.current, porte.current, peso.current, especie.current, sexo.current, descricao.current, localResgate.current, saude.current, saude.current, castrado.current, vermifugado.current, microchip.current, uf.current, cidade.current, bairro.current];
        const camposCadastro = { nome: nome.current, idade: idade.current, idadeTipo: idadeTipo.current, porte: porte.current, peso: peso.current, especie: especie.current, sexo: sexo.current, descricao: descricao.current, localResgate: localResgate.current, cuidadoEspecial: cuidadoEspecial.current, saude: saude.current, castrado: castrado.current, vermifugado: vermifugado.current, microchip: microchip.current, temperamentos, situacoes, traumas, uf: uf.current, cidade: cidade.current, bairro: bairro.current, rua: rua.current }

        const mensagemErro = ValidarCamposAnimal(camposObrigatorios, camposCadastro);

        if (!mensagemErro) {
            InserirDados();
        } else {
            setTextoAlert(mensagemErro);
            alertRef.current.open();
        }
    }

    const PegarId = async () => {
        const decodedToken = await DecodificarToken();
        TB_PESSOA_IDD.current = decodedToken.TB_PESSOA_IDD;
    }

    const SelecionarDados = async () => {
        await Promise.all([
            axios.post(urlAPI + 'selanimal/filtrar', {
                TB_ANIMAL_ID: id,
            }).then(response => {
                setDadosanimal(response.data[0]);
                setCarregando(false)
            }).catch(CatchError),
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
            axios.get(urlAPI + 'selsituacoes/filtrar', { TB_ANIMAL_ID: id })
                .then(response => {
                    const dados = response.data;
                    const options = dados.map(item =>
                        item.TB_SITUACAO_ID
                    );
                    setSituacoes(options);
                }).catch(CatchError),
            axios.get(urlAPI + 'seltraumas/filtrar', { TB_ANIMAL_ID: id })
                .then(response => {
                    const dados = response.data;
                    const options = dados.map(item =>
                        item.TB_TRAUMA_ID
                    );
                    setTraumas(options);
                }).catch(CatchError),
            axios.post(urlAPI + 'seltemperamentos/filtrar', { TB_ANIMAL_ID: id })
                .then(response => {
                    const dados = response.data;
                    const options = dados.map(item =>
                        item.TB_TEMPERAMENTO_ID
                    );
                    setTemperamentos(options);
                }).catch(CatchError),
        ]);
        setCarregando(false);
    }

    useEffect(() => {
        PegarId();
        SelecionarDados();
        return (() => {
            controller.abort();
        })
    }, []);

    // Opções dropdown
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
        if (image) {
            const formData = new FormData();
            const imagem = {
                uri: image,
                type: 'image/jpeg',
                name: 'image.jpg',
            };

            formData.append('TB_PESSOA_ID', TB_PESSOA_IDD.current);
            formData.append('TB_ANIMAL_NOME', nome.current);
            formData.append('TB_ANIMAL_IDADE', idade.current);
            formData.append('TB_ANIMAL_IDADE_TIPO', idadeTipo.current);
            formData.append('TB_ANIMAL_PORTE', porte.current);
            formData.append('TB_ANIMAL_PESO', peso.current);
            formData.append('TB_ANIMAL_SEXO', sexo.current);
            formData.append('TB_ANIMAL_ESPECIE', especie.current);
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
            formData.append('TB_ANIMAL_ALERTA', alerta.current);
            formData.append('TEMPERAMENTOS', temperamentos);
            formData.append('SITUACOES', situacoes);
            formData.append('TRAUMAS', traumas);
            formData.append('img', imagem);

            await axios.put(urlAPI + 'altanimal/' + id, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            }).then(response => {
                setMessage({ color: '#fafafa', text: response.data.message });
                setTimeout(() => {
                    navigation.goBack();
                }, 1000);
            }).catch(CatchError);
        } else {
            setTextoAlert('Insira uma imagem');
            alertRef.current.open();
        }
    };

    const escolherImagem = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            const mensagemArquivo = await VerificarTamanhoImagem(result);
            if (mensagemArquivo) {
                setTextoAlert(mensagemArquivo);
                alertRef.current.open();
                return
            }
            setImage(result.assets[0].uri);
        }
    };


    return (
        <ContainerCadastro titulo='Alterar informações do animal'>
            {carregando ? <View style={{ flex: 1 }}><ActivityIndicator size="large" color={corRosaForte} /></View> :
                <>
                    <GroupBox titulo='Imagem do animal'>
                        {image ? <Image style={styles.Imagem} source={{ uri: image }} /> : <Imagem style={styles.Imagem} url={urlAPI + "selanimalimg/" + id} />}
                        <BotaoArquivo onPress={escolherImagem} texto={image ? 'Trocar imagem' : null} />
                    </GroupBox>
                    <GroupBox titulo='Informações'>
                        <CampoSimplesAnimado placeholder="Nome do animal" setRef={nome} val={dadosanimal.TB_ANIMAL_NOME} />
                        <View style={styles.containerCampos}>
                            <Campo styleView={{ flex: 0.8 }} placeholder="Idade" keyboardType="numeric" setRef={idade} maxLength={2} defaultValue={dadosanimal.TB_ANIMAL_IDADE.toString()} />
                            <DropdownSimples data={TipoIdade} setRef={idadeTipo} texto='Ano(s) ou Mes(es)' val={dadosanimal.TB_ANIMAL_IDADE_TIPO} />
                        </View>
                        <View style={styles.ContainerDublo}>
                            <View style={styles.campo}>
                                <DropdownSimples data={Porte} texto='Porte' setRef={porte} val={dadosanimal.TB_ANIMAL_PORTE} />
                            </View>
                            <View style={styles.campo}>
                                <Campo styleView={{ flex: 0.9 }} placeholder="Peso" keyboardType="numeric" setRef={peso} maxLength={4} defaultValue={dadosanimal.TB_ANIMAL_PESO.toString()} />
                                <Text style={styles.Texto}>Kg</Text>
                            </View>
                        </View>
                        <View style={styles.containerCampos}>
                            <DropdownSimples data={Especie} texto='Especie' setRef={especie} val={dadosanimal.TB_ANIMAL_ESPECIE} />
                            <DropdownSimples data={Sexo} texto='Sexo' setRef={sexo} val={dadosanimal.TB_ANIMAL_SEXO} />
                        </View>
                    </GroupBox>
                    <GroupBox titulo='Descrição'>
                        <CampoSimplesAnimado placeholder="Minha historia" setRef={descricao} val={dadosanimal.TB_ANIMAL_DESCRICAO} />
                        <CampoSimplesAnimado placeholder="Local do resgate" setRef={localResgate} val={dadosanimal.TB_ANIMAL_LOCAL_RESGATE} />
                        <CampoSimplesAnimado placeholder="Cuidados necessarios com o pet" setRef={cuidadoEspecial} opcional val={dadosanimal.TB_ANIMAL_CUIDADO_ESPECIAL} />
                    </GroupBox>
                    <GroupBox titulo='Saúde *'>
                        <RadioButton2 setRef={saude} val={dadosanimal.TB_ANIMAL_SAUDE} />
                    </GroupBox>
                    <GroupBox titulo='Castrado *'>
                        <RadioButton3 setRef={castrado} val={dadosanimal.TB_ANIMAL_CASTRADO} />
                    </GroupBox>
                    <GroupBox titulo='Vermifugado *'>
                        <RadioButton3 setRef={vermifugado} val={dadosanimal.TB_ANIMAL_VERMIFUGADO} />
                    </GroupBox>
                    <GroupBox titulo='Microchipado *'>
                        <RadioButton3 setRef={microchip} val={dadosanimal.TB_ANIMAL_MICROCHIP} />
                    </GroupBox>
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
                            onChange={item => setTemperamentos(item)}
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
                            onChange={item => setSituacoes(item)}
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
                            onChange={item => setTraumas(item)}
                            selectedStyle={styles.selectedStyle}
                        />
                    </GroupBox>
                    <GroupBox titulo='Localização'>
                        <CampoEnderecoAnimado setRef1={cep} setRef2={uf} setRef3={cidade} setRef4={bairro} setRef5={rua} removerTitulo val2={dadosanimal.TB_ANIMAL_LOCALIZACAO_UF} val3={dadosanimal.TB_ANIMAL_LOCALIZACAO_CIDADE} val4={dadosanimal.TB_ANIMAL_LOCALIZACAO_BAIRRO} val5={dadosanimal.TB_ANIMAL_LOCALIZACAO_RUA} />
                    </GroupBox>
                    <BotaoCheckBox texto='Animal em estado de alerta' setRef={alerta} styleTexto={{ color: '#fafafa', fontSize: 18 }} corBoxAtivado={'#AA3939'} jaativado={dadosanimal.TB_ANIMAL_ALERTA} />
                    <Mensagem mensagem={message} />
                    <BotaoCadastrarAnimado onPress={Cadastrar} texto='Editar' />
                    <AlertPro
                        ref={alertRef}
                        onConfirm={() => alertRef.current.close()}
                        title="Campos inválidos"
                        message={textoAlert}
                        showCancel={false}
                        textConfirm="OK"
                        customStyles={{ buttonConfirm: { backgroundColor: corBotaoCad }, message: { textAlign: 'left' } }}
                    />
                </>
            }
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

export default AlterarAnimal;