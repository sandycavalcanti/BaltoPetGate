import { TouchableOpacity, Text, View, TextInput, StyleSheet, ScrollView } from "react-native";
import { useState } from "react";
import axios from 'axios';
import CampoSimples from "../../components/cadastro/CampoSimples";
import BotaoCadastrar from "../../components/cadastro/BotaoCadastrar";
import GroupBox from "../../components/cadastro/GroupBox";
import Campo from "../../components/animal/Campo";
import ContainerCadastro from "../../components/cadastro/ContainerCadastro";

const CadFormularioDiario = ({navigation: {navigate }}) => {

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
            <GroupBox titulo='informações'>
                <CampoSimples placeholder="Data do abastecimento" set={text => setDt_abastecimento(text)} />

                <View style={styles.containerCampos}>
                    <Campo placeholder='img' keyboardtype='image' set={text => set(text)} />
                    <Campo placeholder='dataenvio' set={text => setDt_envio(text)} />
                </View>
            </GroupBox>
            <BotaoCadastrar onPress={Cadastrar} texto='Cadastrar'/>
        </ContainerCadastro>

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
    campo: {
        width: '46%',
        fontSize: 18,
        paddingHorizontal: 10,
        color: '#8EBF81',
        backgroundColor: "#fff",
        borderRadius: 15,
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,

    },
    containerCampos:{
        width: '95%',
        justifyContent:"space-around",
        flexDirection:"row",
        backgroundColor: '#fff',
        borderRadius: 15,
        alignItems: "center"
    },
    ContainerDublo:{
        width: '95%',
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    Texto:{
        color: '#447837',
        left: 20,
        fontSize: 18
    },
});

export default CadFormularioDiario;
