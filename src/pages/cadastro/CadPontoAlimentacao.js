import { TouchableOpacity, Text, View, TextInput, StyleSheet, ScrollView } from "react-native";
import { useState } from "react";
import axios from 'axios';
import BotaoCadastrar from "../../components/cadastro/BotaoCadastrar";
import GroupBox from "../../components/cadastro/GroupBox";
import Campo from "../../components/animal/Campo";
import ContainerCadastro from "../../components/cadastro/ContainerCadastro"

const CadPontoAlimento = ({ navigation: {navigate} }) => {

    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [status, setStatus] = useState('');

    const Cadastrar = () => {
        InserirDados();
    }

    const InserirDados = async () => {
        try {
            const response = await axios.post( 'cadpontoalimento', {
                TB_PESSOA_ID: 1,
                TB_PONTO_ALIMENTACAO_LATIUDE: latitude,
                TB_PONTO_ALIMENTACAO_LONGITUDE: longitude
    });
    console.log('Cadastrado:', response.data);
    } catch (error) {
        console.error('Erro ao cadastrar:', error);
    }
}

return (
        <ContainerCadastro titulo='Cadastre seu  ponto de alimentação'>
            <GroupBox titulo='informações'>
                <View style={styles.containerCampos}>
                    <Campo placeholder='latitude' set={text => setLatitude(text)} />
                    <Campo placeholder='longitude' set={text => setLongitude(text)} />
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

export default CadPontoAlimento;