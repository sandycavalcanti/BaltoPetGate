import { TouchableOpacity, Text, View, StyleSheet, Dimensions, Image, ScrollView } from "react-native";
import TextoComum from "../components/ficha/TextoComum";
import TextoMultiplo from "../components/ficha/TextoMultiplo";
import TextoMenor from "../components/ficha/TextoMenor";
import TextosOpcionais from "../components/ficha/TextosOpcionais";
import BotaoCadastrar from "../components/cadastro/BotaoCadastrar";
import { corBordaBoxCad, corFundo, urlAPI } from "../constants";
import { useRoute } from '@react-navigation/native';
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import DecodificarToken from "../utils/DecodificarToken";

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

function Ficha_animal({ navigation: { navigate } }) {
    const route = useRoute();
    const { id } = route.params;
    const TB_TIPO_IDD = useRef(null)
    const tipoIdade = useRef('')

    const [select, setSelect] = useState([]);
    const [temperamento, setTemperamento] = useState([]);
    const [trauma, setTrauma] = useState([]);
    const [situacao, setSituacao] = useState([]);

    const Selecionar = async () => {
        await axios.post(urlAPI + 'selanimal/filtrar', {
            TB_ANIMAL_ID: id
        }).then((response) => {
            const dados = response.data[0];
            setSelect(dados);
            if (dados.TB_ANIMAL_IDADE_TIPO == 'MES' && dados.TB_ANIMAL_IDADE == 1) {
                tipoIdade.current = 'Mês'
            } else if (dados.TB_ANIMAL_IDADE_TIPO == 'ANO' && dados.TB_ANIMAL_IDADE == 1) {
                tipoIdade.current = 'Ano'
            } else if (dados.TB_ANIMAL_IDADE_TIPO == 'MES') {
                tipoIdade.current = 'Meses'
            } else if (dados.TB_ANIMAL_IDADE_TIPO == 'ANO') {
                tipoIdade.current = 'Anos'
            }
        }).catch((error) => {
            ToastAndroid.show('Erro ao exibir itens ' + error.response.data.message, ToastAndroid.SHORT);
        })
    };

    const Multiplo = () => {
        axios.get(urlAPI + 'seltemperamentos/' + id
        ).then((response) => {
            setTemperamento(response.data)
        }).catch((error) => {
            if (error.response.status !== 404) {
                let erro = error.response.data;
                ToastAndroid.show(erro.message, ToastAndroid.SHORT);
                console.error('Erro ao selecionar:', erro.error, error);
            }
        });
        axios.get(urlAPI + 'selsituacoes/' + id
        ).then((response) => {
            setSituacao(response.data)
        }).catch((error) => {
            if (error.response.status !== 404) {
                let erro = error.response.data;
                ToastAndroid.show(erro.message, ToastAndroid.SHORT);
                console.error('Erro ao selecionar:', erro.error, error);
            }
        });
        axios.get(urlAPI + 'seltraumas/' + id
        ).then((response) => {
            setTrauma(response.data)
        }).catch((error) => {
            if (error.response.status !== 404) {
                let erro = error.response.data;
                ToastAndroid.show(erro.message, ToastAndroid.SHORT);
                console.error('Erro ao selecionar:', erro.error, error);
            }
        });
    }

    const PegarTipoId = async () => {
        const decodedToken = await DecodificarToken();
        TB_TIPO_IDD.current = decodedToken.TB_TIPO_IDD;
    }

    useEffect(() => {
        Selecionar();
        Multiplo();
        PegarTipoId();
    }, [])

    const urlImg = urlAPI + 'selanimalimg/' + id;

    const TenhoInteresse = () => {
        if (TB_TIPO_IDD.current != 2 || TB_TIPO_IDD.current != 3 || TB_TIPO_IDD.current != 4) {
            navigate('QuestionarioAdocao');
        } else {
            // Iniciar chat
        }
    }

    return (
        <ScrollView>
            <View style={styles.Container}>
                <Image style={styles.Imagem} resizeMode='cover' source={{ uri: urlImg }} />
                <View style={styles.Conjunto1}>
                    <TextoComum textoTitulo='Nome:' textoDescricao={select.TB_ANIMAL_NOME} />
                    <TextoComum textoTitulo='Porte:' textoDescricao={select.TB_ANIMAL_PORTE == 'PEQUENO' ? 'Pequeno' : select.TB_ANIMAL_PORTE == 'MEDIO' ? 'Médio' : 'Grande'} />
                </View>
                <View style={styles.Conjunto2}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <TextoComum textoTitulo={select.TB_ANIMAL_PESO} textoDescricao='Kg' />
                    </View>
                    <View style={styles.Barras}>
                        <TextoComum textoDescricao={select.TB_ANIMAL_SEXO == 'FEMEA' ? 'Fêmea' : 'Macho'} />
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <TextoComum textoTitulo={select.TB_ANIMAL_IDADE} textoDescricao={tipoIdade.current} />
                    </View>
                </View>
                {temperamento.length !== 0 &&
                    <View style={styles.Conjunto3}>
                        <TextoComum textoTitulo='Temperamento:' />
                        {temperamento.map((item, index) => {
                            return (
                                <TextoMultiplo key={index} textoMultiplo={item.TB_TEMPERAMENTO.TB_TEMPERAMENTO_TIPO} />
                            )
                        })}
                    </View>
                }
                {situacao.length !== 0 &&
                    <View style={styles.Conjunto3}>
                        <TextoComum textoTitulo='Situação:' />
                        {situacao.map((item, index) => {
                            return (
                                <TextoMultiplo key={index} textoMultiplo={item.TB_SITUACAO.TB_SITUACAO_DESCRICAO} />
                            )
                        })}
                    </View>
                }
                {trauma.length !== 0 &&
                    <View style={styles.Conjunto3}>
                        <TextoComum textoTitulo='Trauma:' />
                        {trauma.map((item, index) => {
                            return (
                                <TextoMultiplo key={index} textoMultiplo={item.TB_TRAUMA.TB_TRAUMA_DESCRICAO} />
                            )
                        })}
                    </View>
                }
                {select.TB_ANIMAL_CUIDADO_ESPECIAL &&
                    <View style={styles.Conjunto3}>
                        <TextoComum textoTitulo='Cuidado:' />
                        <TextoMultiplo textoMultiplo={select.TB_ANIMAL_CUIDADO_ESPECIAL} />
                    </View>}
                <View style={styles.Conjunto4}>
                    {select.TB_ANIMAL_CASTRADO == 'SIM' &&
                        <TextosOpcionais textosOpcionais='Castrado(a)' />}
                    {select.TB_ANIMAL_VERMIFUGADO == 'SIM' &&
                        <TextosOpcionais textosOpcionais='Vermifugado(a)' />}
                    {select.TB_ANIMAL_MICROCHIP == 'SIM' &&
                        <TextosOpcionais textosOpcionais='Microchipado(a)' />}
                </View>
                <View style={styles.GroupBox}>
                    <Text style={styles.Titulo}>Descrição</Text>
                    <TextoMenor textoDescricao={select.TB_ANIMAL_DESCRICAO} />
                    {/* <TextoMenor textoTitulo='Cor(es):' textoDescricao='dhgfdyfgdfgdifgdfgdfgdufgd' /> */}
                    <TextoMenor textoTitulo='Local do resgate:' textoDescricao={select.TB_ANIMAL_LOCAL_RESGATE} />
                </View>
                <View style={styles.GroupBox}>
                    <Text style={styles.Titulo}>Localização</Text>
                    <View style={styles.GroupBox2}>
                        <Text style={styles.TextoClaro}>{select.TB_ANIMAL_LOCALIZACAO_CIDADE}</Text>
                        <Text style={styles.TextoEscuro}>{select.TB_ANIMAL_LOCALIZACAO_UF}</Text>
                    </View>
                    <View style={styles.GroupBox2}>
                        <Text style={styles.TextoClaro}>{select.TB_ANIMAL_LOCALIZACAO_BAIRRO},</Text>
                    </View>
                    <View style={styles.GroupBox2}>
                        {select.TB_ANIMAL_LOCALIZACAO_RUA &&
                            <Text style={styles.TextoClaro}>{select.TB_ANIMAL_LOCALIZACAO_RUA}</Text>}
                    </View>
                </View>
                <View style={styles.ConjuntoBotao}>
                    <BotaoCadastrar onPress={TenhoInteresse} texto="Adotar" />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: corFundo
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
    }

});

export default Ficha_animal;