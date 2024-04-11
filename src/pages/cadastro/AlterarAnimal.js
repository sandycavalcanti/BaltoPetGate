import { TouchableOpacity, ActivityIndicator, Text, View, TextInput, StyleSheet, StatusBar, Image } from "react-native";
import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import GroupBox from "../../components/cadastro/GroupBox";
import Campo from "../../components/animal/Campo";
import DropdownSimples from "../../components/animal/DropdownSimples";
import RadioButton3 from "../../components/animal/Radiobutton3";
import RadioButton2 from "../../components/animal/radioButton2";
import ContainerCadastro from "../../components/cadastro/ContainerCadastro";
import { corBotaoCad, corRosaForte, corRosaFraco, urlAPI } from "../../constants";
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

const AlterarAnimal = ({ navigation }) => {
    const route = useRoute();
    const { id } = route.params;
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
        const camposCadastro = { nome: nome.current, idade: idade.current, idadeTipo: idadeTipo.current, porte: porte.current, peso: peso.current, especie: especie.current, sexo: sexo.current, descricao: descricao.current, localResgate: localResgate.current, cuidadoEspecial: cuidadoEspecial.current, saude: saude.current, castrado: castrado.current, vermifugado: vermifugado.current, microchip: microchip.current, uf: uf.current, cidade: cidade.current, bairro: bairro.current, rua: rua.current }

        const mensagemErro = ValidarCamposAnimal(camposObrigatorios, camposCadastro);

        if (!mensagemErro) {
            InserirDados();
        } else {
            setTextoAlert(mensagemErro);
            alertRef.current.open();
        }
    }

    const SelecionarDados = async () => {
        await Promise.all([
            axios.post(urlAPI + 'selanimal/filtrar', {
                TB_ANIMAL_ID: id,
            }).then(response => {
                const dados = response.data[0];
                nome.current = dados.TB_ANIMAL_NOME;
                idade.current = dados.TB_ANIMAL_IDADE;
                idadeTipo.current = dados.TB_ANIMAL_IDADE_TIPO;
                porte.current = dados.TB_ANIMAL_PORTE
                peso.current = dados.TB_ANIMAL_PESO;
                sexo.current = dados.TB_ANIMAL_SEXO;
                especie.current = dados.TB_ANIMAL_ESPECIE;
                descricao.current = dados.TB_ANIMAL_DESCRICAO;
                localResgate.current = dados.TB_ANIMAL_LOCAL_RESGATE;
                cuidadoEspecial.current = dados.TB_ANIMAL_CUIDADO_ESPECIAL;
                castrado.current = dados.TB_ANIMAL_CASTRADO;
                vermifugado.current = dados.TB_ANIMAL_VERMIFUGADO;
                microchip.current = dados.TB_ANIMAL_MICROCHIP;
                saude.current = dados.TB_ANIMAL_SAUDE;
                uf.current = dados.TB_ANIMAL_LOCALIZACAO_UF;
                cidade.current = dados.TB_ANIMAL_LOCALIZACAO_CIDADE;
                bairro.current = dados.TB_ANIMAL_LOCALIZACAO_BAIRRO;
                rua.current = dados.TB_ANIMAL_LOCALIZACAO_RUA;
                alerta.current = dados.TB_ANIMAL_ALERTA;
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
            axios.post(urlAPI + 'selsituacoes/filtrar', { TB_ANIMAL_ID: id })
                .then(response => {
                    const dados = response.data;
                    const options = dados.map(item =>
                        item.TB_SITUACAO_ID
                    );
                    setSituacoes(options);
                }).catch(CatchError),
            axios.post(urlAPI + 'seltraumas/filtrar', { TB_ANIMAL_ID: id })
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
        const formData = new FormData();
        if (image) {
            const imagem = {
                uri: image,
                type: 'image/jpeg',
                name: 'image.jpg',
            };
            formData.append('img', imagem);
        }

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

        await axios.put(urlAPI + 'altanimal/' + id, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }).then(response => {
            setMessage({ color: '#fafafa', text: response.data.message });
            setTimeout(() => {
                navigation.goBack();
            }, 1000);
        }).catch(CatchError);
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
                        {image ? <Image style={styles.Imagem} source={{ uri: image }} resizeMode="cover" /> : <Image style={styles.Imagem} source={{ uri: urlAPI + "selanimalimg/" + id }} resizeMode="cover" />}
                        <BotaoArquivo onPress={escolherImagem} texto='Trocar imagem' />
                    </GroupBox>
                    <GroupBox titulo='Informações'>
                        <CampoSimplesAnimado placeholder="Nome do animal" setRef={nome} val={nome.current} />
                        <View style={styles.containerCampos}>
                            <Campo styleView={{ flex: 0.8 }} placeholder="Idade" keyboardType="numeric" setRef={idade} maxLength={2} defaultValue={idade.current.toString()} />
                            <DropdownSimples data={TipoIdade} setRef={idadeTipo} texto='Ano(s) ou Mes(es)' val={idadeTipo.current} />
                        </View>
                        <View style={styles.ContainerDublo}>
                            <View style={styles.campo}>
                                <DropdownSimples data={Porte} texto='Porte' setRef={porte} val={porte.current} />
                            </View>
                            <View style={styles.campo}>
                                <Campo styleView={{ flex: 0.9 }} placeholder="Peso" keyboardType="numeric" setRef={peso} maxLength={4} defaultValue={peso.current.toString()} />
                                <Text style={styles.Texto}>Kg</Text>
                            </View>
                        </View>
                        <View style={styles.containerCampos}>
                            <DropdownSimples data={Especie} texto='Especie' setRef={especie} val={especie.current} />
                            <DropdownSimples data={Sexo} texto='Sexo' setRef={sexo} val={sexo.current} />
                        </View>
                    </GroupBox>
                    <GroupBox titulo='Descrição'>
                        <CampoSimplesAnimado placeholder="Minha historia" setRef={descricao} val={descricao.current} multiline />
                        <CampoSimplesAnimado placeholder="Local do resgate" setRef={localResgate} val={localResgate.current} multiline />
                        <CampoSimplesAnimado placeholder="Cuidados necessarios com o pet" setRef={cuidadoEspecial} opcional val={cuidadoEspecial.current} multiline />
                    </GroupBox>
                    <GroupBox titulo='Saúde' asterisco>
                        <RadioButton2 setRef={saude} val={saude.current} />
                    </GroupBox>
                    <GroupBox titulo='Castrado' asterisco>
                        <RadioButton3 setRef={castrado} val={castrado.current} />
                    </GroupBox>
                    <GroupBox titulo='Vermifugado' asterisco>
                        <RadioButton3 setRef={vermifugado} val={vermifugado.current} />
                    </GroupBox>
                    <GroupBox titulo='Microchipado' asterisco>
                        <RadioButton3 setRef={microchip} val={microchip.current} />
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
                            placeholder="Alterar os temperamentos"
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
                            placeholder="Alterar as situações"
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
                            placeholder="Alterar os traumas"
                            value={traumas}
                            onChange={item => setTraumas(item)}
                            selectedStyle={styles.selectedStyle}
                        />
                    </GroupBox>
                    <GroupBox titulo='Localização'>
                        <CampoEnderecoAnimado setRef1={cep} setRef2={uf} setRef3={cidade} setRef4={bairro} setRef5={rua} removerTitulo val2={uf.current} val3={cidade.current} val4={bairro.current} val5={rua.current} cepOpcional />
                    </GroupBox>
                    <BotaoCheckBox texto='Animal em estado de alerta' setRef={alerta} styleTexto={{ color: '#fafafa', fontSize: 18 }} corBoxAtivado={'#AA3939'} jaativado={alerta.current} />
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
            <StatusBar animated hidden={false} backgroundColor={'#a5cbd3'} />
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