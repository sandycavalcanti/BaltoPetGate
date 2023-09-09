import { Text, TouchableOpacity, StyleSheet, View } from 'react-native'
import ContainerCadastro from '../../components/cadastro/ContainerCadastro';
import CampoSimples from '../../components/cadastro/CampoSimples';
import BotaoCadastrar from '../../components/cadastro/BotaoCadastrar';
import { useState } from 'react';

const CriarSenha = ({ navigation: { navigate } }) => {

    const [senha, setSenha] = useState('');
    const [senhaConfirmacao, setsetSenhaConfirmacao] = useState('');

    const Enviar = () => {
        navigate("Pagina");
    }

    return (
        <ContainerCadastro titulo="Criar nova senha">
            <View style={styles.container}>
                <CampoSimples set={text => setSenha(text)} placeholder={"Senha nova"} keyboardType='visible-password' />
                <CampoSimples set={text => setSenhaConfirmacao(text)} placeholder={"Confirmar a senha"} keyboardType='visible-password' />
                <BotaoCadastrar texto="Mudar senha" onPress={Enviar} />
            </View>
        </ContainerCadastro>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        rowGap: 15,
        alignItems: 'center',
        marginTop: 50,
    }
});

export default CriarSenha