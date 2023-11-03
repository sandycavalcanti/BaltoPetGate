import { TouchableOpacity, Text, View, TextInput, StyleSheet, ScrollView } from "react-native";
import { useState } from "react";
import axios from 'axios';
import CampoMenor from "../../components/FormDiario/CampoMenor";
import BotaoCadastrar from "../../components/cadastro/BotaoCadastrar";
import GroupBox from "../../components/cadastro/GroupBox";
import Campo from "../../components/animal/Campo";
import ContainerCadastro from "../../components/cadastro/ContainerCadastro";
import BotaoImg from "../../components/FormDiario/BotaoImg";

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
                <View  style={styles.Container}>
                    <CampoMenor placeholder="00:00h" opcional/>
                    <CampoMenor placeholder="00/00/0000" opcional/>
                </View>
            </GroupBox>
            <BotaoImg/>
            <Text style={styles.Texto}>Ao acrescentar uma imagem, você estara acrescentando uma prova, caso seu ponto seja denunciado por um usuário. </Text>
            <BotaoCadastrar onPress={Cadastrar} texto='Cadastrar'/>
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
    Texto:{
        color: '#521A1A',
        paddingHorizontal: 10,
        textAlign: 'center',
        fontSize: 14,
        marginBottom: '20%',
    },
});

export default CadFormularioDiario;
