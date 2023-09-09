import { StyleSheet, Text, View, SafeAreaView, ImageBackground, TouchableOpacity } from 'react-native';
import BotaoOpcaoCadastro from '../../components/cadastro/BotaoOpcaoCadastro';

const CadOpcao = ({ navigation: { navigate } }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.titulo}>Crie sua conta!</Text>
            <Text style={styles.subtitulo}>Qual dessas opções melhor se encaixa com você?</Text>
            <BotaoOpcaoCadastro texto="Quero adotar animais" onPress={() => navigate("CadUsuario")} />
            <BotaoOpcaoCadastro texto="Sou um veterinário" onPress={() => navigate("CadVeterinario")} />
            <BotaoOpcaoCadastro texto="Sou uma instituição" onPress={() => navigate("CadInstituicao")} />
            <BotaoOpcaoCadastro texto="Sou um protetor" onPress={() => navigate("CadProtetor")} />
            <BotaoOpcaoCadastro texto="Sou um abrigo" onPress={() => navigate("CadAbrigo")} />
            <BotaoOpcaoCadastro texto="Sou um estabelecimento" onPress={() => navigate("CadEstabelecimento")} />
        </SafeAreaView>
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
    titulo: {
        fontSize: 25,
        color: '#5D8366',
        marginVertical: 30,
    },
    subtitulo: {
        fontSize: 20,
        textAlign: 'center',
        color: '#fff',
        marginBottom: 15,
        width: '90%',
    },
    voltar: {
        color: '#578d97',
        fontSize: 18,
    }
});

export default CadOpcao;