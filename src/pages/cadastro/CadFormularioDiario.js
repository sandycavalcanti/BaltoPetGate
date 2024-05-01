import { TouchableOpacity, Text, View, TextInput, StyleSheet, StatusBar } from "react-native";
import { useState } from "react";
import axios from 'axios';
import BotaoCadastrar from "../../components/cadastro/BotaoCadastrar";
import GroupBox from "../../components/cadastro/GroupBox";
import ContainerCadastro from "../../components/cadastro/ContainerCadastro";
import BotaoCadastrarAnimado from "../../components/cadastro/BotaoCadastrarAnimado";
import CampoSimples from "../../components/cadastro/CampoSimples";

const CadFormularioDiario = ({ navigation: { navigate } }) => {

    const [formdiario, setForm_diario] = useState('');
    const [dataabastecimento, setDt_abastecimento] = useState('');
    const [dataenvio, setDt_envio] = useState('');

    const Cadastrar = () => {
        InserirDados();
    }
    const InserirDados = async () => {
        try {
            const response = await axios.post(config.urlRootNode + 'cadformdiario', {
                TB_FORMULARIO_DIARIO_ID: formdiario,
                TB_FORMULARIO_DIARIO_DT_ABASTECIMENTO: dataabastecimento,
                TB_FORMULARIO_DIARIO_DT_ENVIO: dataenvio,
                TB_PONTO_ALIMENTACAO_ID: 1,
            });
            console.log('Cadastrado:', response.data);
        } catch (error) {
            console.error('Erro ao cadastrar:', error);
        }
    }

    return (
        <ContainerCadastro titulo='Formulário diario'>
            <GroupBox titulo='Horário do abastecimento'>
                <View style={styles.Container}>
                    <CampoSimples placeholder="00:00h" opcional styleView={styles.CampoMenor} />
                    <CampoSimples placeholder="00/00/0000" opcional styleView={styles.CampoMenor} />
                </View>
            </GroupBox>
            <BotaoCadastrar texto='Acresentar uma imagem' styleBotao={{ backgroundColor: '#EEECEC', width: '90%' }} styleTexto={{ color: '#8EBF81' }} />
            <Text style={styles.Texto}>Ao acrescentar uma imagem, você estara acrescentando uma prova, caso seu ponto seja denunciado por um usuário. </Text>
            <BotaoCadastrarAnimado onPress={Cadastrar} width={300} />
            <StatusBar animated hidden={false} backgroundColor={'#a5cbd3'} />
        </ContainerCadastro>
    );
}

const styles = StyleSheet.create({
    Container: {
        width: '70%',
        backgroundColor: '#a5cbd3',
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: 'space-evenly',
    },
    Texto: {
        color: '#521A1A',
        paddingHorizontal: 10,
        textAlign: 'center',
        fontSize: 14,
        marginTop: 15,
        marginBottom: '20%',
        alignItems: "center",
        marginVertical: 5,
    },
    CampoMenor: {
        width: '50%',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginHorizontal: 30,
    }
});

export default CadFormularioDiario;
