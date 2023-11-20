import { StyleSheet, Text, SafeAreaView } from 'react-native';
import BotaoOpcaoCadastro from '../../components/cadastro/BotaoOpcaoCadastro';

const CadOpcao = ({ navigation: { navigate } }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.titulo}>Crie sua conta!</Text>
            <Text style={styles.subtitulo}>Qual dessas opções melhor se encaixa com você?</Text>
            <BotaoOpcaoCadastro texto="Quero adotar animais" onPress={() => navigate("CadConta", { tipo: 1 })} />
            <BotaoOpcaoCadastro texto="Sou um veterinário" onPress={() => navigate("CadConta", { tipo: 2 })} />
            <BotaoOpcaoCadastro texto="Sou uma instituição" onPress={() => navigate("CadConta", { tipo: 3 })} />
            <BotaoOpcaoCadastro texto="Sou um protetor" onPress={() => navigate("CadConta", { tipo: 4 })} />
            <BotaoOpcaoCadastro texto="Sou um abrigo" onPress={() => navigate("CadConta", { tipo: 5 })} />
            <BotaoOpcaoCadastro texto="Sou um estabelecimento" onPress={() => navigate("CadConta", { tipo: 6 })} />
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
});

export default CadOpcao;