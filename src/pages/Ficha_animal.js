import { TouchableOpacity, Text, View, StyleSheet, Image, ScrollView } from "react-native";
import TextoComum from "../components/ficha/TextoComum";
import TextoMultiplo from "../components/ficha/TextoMultiplo";
import TextoMenor from "../components/ficha/TextoMenor";
import TextosOpcionais from "../components/ficha/TextosOpcionais";
import BotaoCadastrar from "../components/cadastro/BotaoCadastrar";
import { corBordaBoxCad, corFundo, urlAPI } from "../constants";
import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from "react";
import axios from "axios";

function Ficha_animal() {
    const route = useRoute();
    const { id } = route.params;
    let tipoIdade;

    const [select, setSelect] = useState([]);

    const Selecionar = async () => {
        await axios.post(urlAPI + 'selanimal/filtrar', {
            TB_ANIMAL_ID: id
        }).then((response) => {
            setSelect(response.data[0]);
        }).catch((error) => {
            ToastAndroid.show('Erro ao exibir itens ' + error.response.data.message, ToastAndroid.SHORT);
        })
    };

    useEffect(() => {
        Selecionar();
    }, [])

    if (select.TB_ANIMAL_IDADE_TIPO == 'MES' && select.TB_ANIMAL_IDADE == 1) {
        tipoIdade = 'Mês'
    } else if (select.TB_ANIMAL_IDADE_TIPO == 'ANO' && select.TB_ANIMAL_IDADE == 1) {
        tipoIdade = 'Ano'
    } else if (select.TB_ANIMAL_IDADE_TIPO == 'MES') {
        tipoIdade = 'Meses'
    } else {
        tipoIdade = 'Anos'
    }

    return (
        <ScrollView>
            <View style={styles.Container}>
                <Image style={styles.Imagem} resizeMode='cover' source={require('../../assets/img/dog.png')} />
                <View style={styles.Conjunto1}>
                    <TextoComum textoTitulo='Nome:' textoDescricao={select.TB_ANIMAL_NOME} />
                    <TextoComum textoTitulo='Porte:' textoDescricao={select.TB_ANIMAL_PORTE == 'PEQUENO' ? 'Pequeno' : select.TB_ANIMAL_PORTE == 'MEDIO' ? 'Médio' : 'Grande'} />
                </View>
                <View style={styles.Conjunto2}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <TextoComum textoTitulo={select.TB_ANIMAL_PESO} textoDescricao='Kg' />
                    </View>
                    <View style={styles.Barras}>
                        <TextoComum textoDescricao={select.TB_ANIMAL_SEXO == 'MACHO' ? 'Macho' : 'Fêmea'} />
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <TextoComum textoTitulo={select.TB_ANIMAL_IDADE} textoDescricao={tipoIdade} />
                    </View>
                </View>
                <View style={styles.Conjunto3}>
                    <TextoComum textoTitulo='Temperamento:' />
                    <TextoMultiplo textoMultiplo='Aaaaaa' />
                </View>
                <View style={styles.Conjunto3}>
                    <TextoComum textoTitulo='Situação:' />
                    <TextoMultiplo textoMultiplo='Aaaaaa' />
                </View>
                <View style={styles.Conjunto3}>
                    <TextoComum textoTitulo='Trauma:' />
                    <TextoMultiplo textoMultiplo='Aaaaaa' />
                </View>
                <View style={styles.Conjunto3}>
                    <TextoComum textoTitulo='Cuidado:' />
                    <TextoMultiplo textoMultiplo='Aaaaaa' />
                </View>
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
                    <TextoMenor textoTitulo='Cor(es):' textoDescricao='dhgfdyfgdfgdifgdfgdfgdufgd' />
                    <TextoMenor textoTitulo='Local do resgate:' textoDescricao={select.TB_ANIMAL_LOCAL_RESGATE} />
                </View>
                <View style={styles.GroupBox}>
                    <Text style={styles.Titulo}>Localização</Text>
                    <View style={styles.GroupBox2}>
                        <Text style={styles.TextoClaro}>{select.TB_ANIMAL_LOCALIZACAO_CIDADE}</Text>
                        <Text style={styles.TextoEscuro}>({select.TB_ANIMAL_LOCALIZACAO_UF})</Text>
                    </View>
                    <View style={styles.GroupBox2}>
                        <Text style={styles.TextoClaro}>{select.TB_ANIMAL_LOCALIZACAO_BAIRRO},</Text>
                    </View>
                    <View style={styles.GroupBox2}>
                        <Text style={styles.TextoClaro}>{select.TB_ANIMAL_LOCALIZACAO_RUA}</Text>
                    </View>
                </View>
                <View style={styles.ConjuntoBotao}>
                    <BotaoCadastrar texto="Adotar" />
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
        width: '100%'
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