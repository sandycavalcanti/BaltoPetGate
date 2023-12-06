import { TouchableOpacity, Text, View, StyleSheet, Dimensions, Image, ScrollView, ActivityIndicator, ToastAndroid } from "react-native";
import TextoComum from "../components/ficha/TextoComum";
import TextoMultiplo from "../components/ficha/TextoMultiplo";
import TextoMenor from "../components/ficha/TextoMenor";
import TextosOpcionais from "../components/ficha/TextosOpcionais";
import { corBordaBoxCad, corFundo, corRosaForte, urlAPI } from "../constants";
import { useRoute } from '@react-navigation/native';
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import DecodificarToken from "../utils/DecodificarToken";
import FormatarTextoBanco from "../utils/FormatarTextoBanco";
import IniciarChat from "../utils/IniciarChat";
import CatchError from "../utils/CatchError";
import BotaoCadastrarAnimado from "../components/cadastro/BotaoCadastrarAnimado";
import Lightbox from 'react-native-lightbox-v2'
import { Feather } from "@expo/vector-icons";

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

const Ficha_animal = ({ navigation: { navigate } }) => {
    const route = useRoute();
    const { id } = route.params;
    const TB_TIPO_IDD = useRef(null);
    const TB_PESSOA_IDD = useRef(null);
    const TB_PESSOA_ID = useRef(null);
    const tipoIdade = useRef('');
    const select = useRef([]);
    const temperamento = useRef([]);
    const situacao = useRef([]);
    const trauma = useRef([]);
    const pessoal = useRef(false);
    const urlImg = urlAPI + 'selanimalimg/' + id;
    const [carregando, setCarregando] = useState(true);
    const controller = new AbortController();

    const Selecionar = async () => {
        await PegarId();
        await Promise.all([
            axios.post(urlAPI + 'selanimal/filtrar', {
                TB_ANIMAL_ID: id
            }, { signal: controller.signal }).then((response) => {
                const dados = response.data[0];
                select.current = dados;
                TB_PESSOA_ID.current = dados.TB_PESSOA_ID;
                if (dados.TB_ANIMAL_IDADE_TIPO == 'MES' && dados.TB_ANIMAL_IDADE == 1) {
                    tipoIdade.current = 'Mês'
                } else if (dados.TB_ANIMAL_IDADE_TIPO == 'ANO' && dados.TB_ANIMAL_IDADE == 1) {
                    tipoIdade.current = 'Ano'
                } else if (dados.TB_ANIMAL_IDADE_TIPO == 'MES') {
                    tipoIdade.current = 'Meses'
                } else if (dados.TB_ANIMAL_IDADE_TIPO == 'ANO') {
                    tipoIdade.current = 'Anos'
                }
                pessoal.current = TB_PESSOA_ID.current == TB_PESSOA_IDD.current
            }).catch(CatchError),
            axios.get(urlAPI + 'seltemperamentos/' + id, { signal: controller.signal }).then(response => {
                temperamento.current = response.data;
            }).catch(CatchError),
            axios.get(urlAPI + 'selsituacoes/' + id, { signal: controller.signal }).then(response => {
                situacao.current = response.data;
            }).catch(CatchError),
            axios.get(urlAPI + 'seltraumas/' + id, { signal: controller.signal }).then(response => {
                trauma.current = response.data;
            }).catch(CatchError),
        ]);
        setCarregando(false);
    }

    const PegarId = async () => {
        const decodedToken = await DecodificarToken();
        TB_PESSOA_IDD.current = decodedToken.TB_PESSOA_IDD;
        TB_TIPO_IDD.current = decodedToken.TB_TIPO_IDD;
    }

    useEffect(() => {
        Selecionar();
        return (() => {
            controller.abort();
        })
    }, [])

    // Função botão, se o usuário for um usuário comum, navegar para AlterarCad, se não, iniciar o chat direto
    const TenhoInteresse = () => {
        if (TB_TIPO_IDD.current == 2 || TB_TIPO_IDD.current == 3 || TB_TIPO_IDD.current == 4) {
            IniciarChat(TB_PESSOA_IDD.current, TB_PESSOA_ID.current, navigate, id);
        } else {
            navigate('AlterarCad', { modoAlterar: false, TB_PESSOA_ID: TB_PESSOA_ID.current, TB_ANIMAL_ID: id });
        }
    }

    return (
        <ScrollView>
            <View style={styles.Container}>
                <Lightbox activeProps={{ style: styles.imageActive }}>
                    <Image style={styles.Imagem} resizeMode='cover' source={{ uri: urlImg }} />
                </Lightbox>
                {carregando ?
                    <ActivityIndicator size="large" color={corBordaBoxCad} style={{ marginTop: 20 }} />
                    :
                    <>
                        {/* Nome e porte */}
                        <View style={styles.Conjunto1}>
                            <TextoComum textoTitulo='Nome:' textoDescricao={select.current.TB_ANIMAL_NOME} />
                            <TextoComum textoTitulo='Porte:' textoDescricao={FormatarTextoBanco(select.current.TB_ANIMAL_PORTE)} />
                        </View>
                        {/* Caixa informações */}
                        <View style={styles.Conjunto2}>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <TextoComum textoTitulo={select.current.TB_ANIMAL_PESO} textoDescricao='Kg' />
                            </View>
                            <View style={styles.Barras}>
                                <TextoComum textoDescricao={FormatarTextoBanco(select.current.TB_ANIMAL_SEXO)} />
                            </View>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <TextoComum textoTitulo={select.current.TB_ANIMAL_IDADE} textoDescricao={tipoIdade.current} />
                            </View>
                        </View>
                        {/* Itens associativos */}
                        {temperamento.current.length !== 0 &&
                            <View style={styles.Conjunto3}>
                                <TextoComum textoTitulo='Temperamento:' />
                                {temperamento.current.map((item, index) => {
                                    return (
                                        <TextoMultiplo key={index} textoMultiplo={item.TB_TEMPERAMENTO.TB_TEMPERAMENTO_TIPO} />
                                    )
                                })}
                            </View>
                        }
                        {situacao.current.length !== 0 &&
                            <View style={styles.Conjunto3}>
                                <TextoComum textoTitulo='Situação:' />
                                {situacao.current.map((item, index) => {
                                    return (
                                        <TextoMultiplo key={index} textoMultiplo={item.TB_SITUACAO.TB_SITUACAO_DESCRICAO} />
                                    )
                                })}
                            </View>
                        }
                        {trauma.current.length !== 0 &&
                            <View style={styles.Conjunto3}>
                                <TextoComum textoTitulo='Trauma:' />
                                {trauma.current.map((item, index) => {
                                    return (
                                        <TextoMultiplo key={index} textoMultiplo={item.TB_TRAUMA.TB_TRAUMA_DESCRICAO} />
                                    )
                                })}
                            </View>
                        }
                        {select.current.TB_ANIMAL_CUIDADO_ESPECIAL &&
                            <View style={styles.Conjunto3}>
                                <TextoComum textoTitulo='Cuidado:' />
                                <TextoMultiplo textoMultiplo={select.current.TB_ANIMAL_CUIDADO_ESPECIAL} />
                            </View>}
                        {/* Chips rosas */}
                        <View style={styles.Conjunto4}>
                            {select.current.TB_ANIMAL_CASTRADO == 'SIM' &&
                                <TextosOpcionais textosOpcionais='Castrado(a)' />}
                            {select.current.TB_ANIMAL_VERMIFUGADO == 'SIM' &&
                                <TextosOpcionais textosOpcionais='Vermifugado(a)' />}
                            {select.current.TB_ANIMAL_MICROCHIP == 'SIM' &&
                                <TextosOpcionais textosOpcionais='Microchipado(a)' />}
                        </View>
                        {/* Descrição */}
                        <View style={styles.GroupBox}>
                            <Text style={styles.Titulo}>Descrição</Text>
                            <TextoMenor textoDescricao={select.current.TB_ANIMAL_DESCRICAO} />
                            <TextoMenor textoTitulo='Local do resgate:' textoDescricao={select.current.TB_ANIMAL_LOCAL_RESGATE} />
                        </View>
                        {/* Localização */}
                        <View style={styles.GroupBox}>
                            <Text style={styles.Titulo}>Localização</Text>
                            <View style={styles.GroupBox2}>
                                <Text style={styles.TextoClaro}>{select.current.TB_ANIMAL_LOCALIZACAO_CIDADE}</Text>
                                <Text style={styles.TextoEscuro}>{select.current.TB_ANIMAL_LOCALIZACAO_UF}</Text>
                            </View>
                            <View style={styles.GroupBox2}>
                                <Text style={styles.TextoClaro}>{select.current.TB_ANIMAL_LOCALIZACAO_BAIRRO},</Text>
                            </View>
                            <View style={styles.GroupBox2}>
                                {select.current.TB_ANIMAL_LOCALIZACAO_RUA &&
                                    <Text style={styles.TextoClaro}>{select.current.TB_ANIMAL_LOCALIZACAO_RUA}</Text>}
                            </View>
                        </View>
                        {select.current.TB_ANIMAL_ALERTA &&
                            <View style={styles.containerAlerta}>
                                <Feather name="alert-triangle" size={24} color={corRosaForte} />
                                <Text style={styles.textAlerta}>Animal em alerta</Text>
                            </View>}
                        <View style={styles.ConjuntoBotao}>
                            {!pessoal.current ?
                                <BotaoCadastrarAnimado onPress={TenhoInteresse} texto="Tenho interesse" width={300} />
                                :
                                <BotaoCadastrarAnimado onPress={() => navigate('AlterarAnimal', { id })} texto="Editar" width={300} />
                            }
                        </View>
                    </>
                }
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: corFundo,
        minHeight: windowHeight
    },
    Conjunto1: {
        justifyContent: "space-between",
        flexDirection: "row",
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10
    },
    Conjunto2: {
        borderColor: corBordaBoxCad,
        borderWidth: 2,
        borderRadius: 20,
        justifyContent: "space-around",
        flexDirection: "row",
        margin: 12
    },
    Conjunto3: {
        marginTop: 2,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 10,
        paddingRight: 10,
        flexWrap: "wrap"
    },
    Conjunto4: {
        marginTop: 2,
        justifyContent: "space-evenly",
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        marginLeft: 4,
        marginRight: 4,
        flexWrap: "wrap"
    },
    GroupBox: {
        margin: '2%',
        padding: 10,
        borderWidth: 2,
        borderColor: corBordaBoxCad,
        borderRadius: 10,
        marginVertical: 20,
        position: 'relative',
    },
    Titulo: {
        marginLeft: '8%',
        fontSize: 20,
        color: "#096D82",
        position: 'absolute',
        top: -17,
        marginBottom: 16,
        paddingLeft: 10,
        backgroundColor: corFundo,
    },
    Barras: {
        flex: 1,
        borderLeftWidth: 2,
        alignItems: "center",
        borderRightWidth: 2,
        borderColor: corBordaBoxCad
    },
    Imagem: {
        width: windowWidth,
        height: windowWidth,
        borderColor: '#fff',
        borderWidth: 3,
    },
    GroupBox2: {
        margin: '1%',
        marginHorizontal: '2%',
        flexDirection: "row",
        flexWrap: "wrap"
    },
    TextoClaro: {
        color: '#299FB8',
        fontSize: 18,
        marginRight: 7,
        marginLeft: 7
    },
    TextoEscuro: {
        color: '#096D82',
        fontSize: 18,
        paddingRight: 5
    },
    ConjuntoBotao: {
        alignItems: "center"
    },
    imageActive: {
        width: windowWidth,
        height: windowWidth,
        resizeMode: 'contain',
    },
    containerAlerta: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        columnGap: 10,
        marginBottom: 10,
    },
    textAlerta: {
        fontSize: 18,
        color: corRosaForte
    }
});

export default Ficha_animal;