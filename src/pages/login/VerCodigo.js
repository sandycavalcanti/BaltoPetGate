import { Text, TouchableOpacity, StyleSheet, View } from 'react-native'
import ContainerCadastro from '../../components/cadastro/ContainerCadastro';
import CampoSimples from '../../components/cadastro/CampoSimples';
import BotaoCadastrar from '../../components/cadastro/BotaoCadastrar';
import { useState } from 'react';
import { corTextoBotaoCad, corTituloCad } from '../../constants';
import { useRoute } from '@react-navigation/native';
import BotaoCadastrarAnimado from '../../components/cadastro/BotaoCadastrarAnimado';

const VerCodigo = ({ navigation: { navigate } }) => {
    const route = useRoute();
    const { email } = route.params;

    const [codigo, setCodigo] = useState('');

    const Verificar = () => {
        // navigate("CriarSenha");
    }

    const Enviar = () => {

    }

    return (
        <ContainerCadastro titulo="Verificar o código">
            <View style={styles.container}>
                <Text style={styles.texto}>Enviando código para o email: {email}</Text>
                <CampoSimples set={text => setCodigo(text)} placeholder={"Código"} keyboardType='numeric' />
                <TouchableOpacity onPress={Enviar} style={styles.enviar}>
                    <Text>Enviar código novamente</Text>
                </TouchableOpacity>
                <BotaoCadastrarAnimado texto="Verificar código" onPress={Verificar} width={250} />
            </View>
        </ContainerCadastro>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        rowGap: 10,
        alignItems: 'center',
        marginTop: 50,
    },
    texto: {
        color: corTituloCad,
        fontSize: 18,
    },
    enviar: {
        color: corTextoBotaoCad,
    }
});

export default VerCodigo