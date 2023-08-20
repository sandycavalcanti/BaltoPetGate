import { TouchableOpacity, Text, View, StyleSheet, Image, ScrollView } from "react-native";
import TextoComum from "../components/components_ficha/TextoComum";
import TextoMultiplo from "../components/components_ficha/TextoMultiplo";
import TextoMenor from "../components/components_ficha/TextoMenor";
import TextosOpcionais from "../components/components_ficha/TextosOpcionais";
import BotaoCadastrar from "../components/components_cadastro/BotaoCadastrar";
import { corBordaBoxCad, corFundo } from "../constants";

function Ficha_animal() {

    return (
        <ScrollView>
            <View style={styles.Container}>
                <Image style={styles.Imagem} resizeMode='cover' source={require('../../assets/img/dog.png')} />
                <View style={styles.Conjunto1}>
                    <TextoComum textoTitulo='Nome:' textoDescricao='Nilsinho' />
                    <TextoComum textoTitulo='Porte:' textoDescricao='Médio' />
                </View>
                <View style={styles.Conjunto2}>
                    <TextoComum textoTitulo='12' textoDescricao='Kg' />
                    <View style={styles.Barras}>
                        <TextoComum textoDescricao='Macho' />
                    </View>
                    <TextoComum textoTitulo='2' textoDescricao='Ano(s)' />
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
                    <TextosOpcionais textosOpcionais='Castrado(a)' />
                    <TextosOpcionais textosOpcionais='Vermifugado(a)' />
                    <TextosOpcionais textosOpcionais='Microchipado(a)' />
                </View>
                <View style={styles.GroupBox}>
                    <Text style={styles.Titulo}>Descrição</Text>
                    <TextoMenor textoDescricao='Duis sed lacinia nisi, nec condimentum tellus. Mauris bibendum orci at malesuada tincidunt. Vivamus id finibus augue, non hendrerit risus. Etiam in nunc egestas, sagittis ex ac, dictum ex. Curabitur et pulvinar augue. Mauris nec porttitor felis. Aliquam in eros sed nunc pellentesque posuere...' />
                    <TextoMenor textoTitulo='Cor(es):' textoDescricao='dhgfdyfgdfgdifgdfgdfgdufgd' />
                    <TextoMenor textoTitulo='Local do resgate:' textoDescricao='Médio' />
                </View>
                <View style={styles.GroupBox}>
                    <Text style={styles.Titulo}>Localização</Text>
                    <View style={styles.GroupBox2}>
                        <Text style={styles.TextoClaro}>São Miguel do Gostoso</Text>
                        <Text style={styles.TextoEscuro}>SP</Text>
                    </View>
                    <View style={styles.GroupBox2}>
                        <Text style={styles.TextoClaro}>São Miguel do Gostoso</Text>
                        <Text style={styles.TextoEscuro}>,</Text>
                        <Text style={styles.TextoClaro}>São Miguel do Gostosok,k,k,j</Text>
                    </View>
                </View>
                <View style={styles.ConjuntoBotao}>
                    <BotaoCadastrar />
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
        justifyContent: "space-between",
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
        flex: 0.5,
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
        fontSize: 16,
        marginRight: 7,
        marginLeft: 7
    },
    TextoEscuro: {
        color: '#096D82',
        fontSize: 16,
        paddingRight: 5
    },
    ConjuntoBotao: {
        alignItems: "center"
    }

});

export default Ficha_animal;