import { Text, TouchableOpacity, StyleSheet, View, Alert } from 'react-native'
import ContainerCadastro from '../../components/cadastro/ContainerCadastro';
import CampoSimples from '../../components/cadastro/CampoSimples';
import BotaoCadastrar from '../../components/cadastro/BotaoCadastrar';
import { useState } from 'react';
import axios from 'axios';
import { urlAPI } from '../../constants';

const RecSenha = ({ navigation: { navigate } }) => {

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const generateCode = async () => {
    try {
      const response = await axios.post(urlAPI + 'send-code', { email });
      Alert.alert('Sucesso', 'Código gerado e enviado por email.');
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao gerar o código.');
      console.error(error)
    }
  };

  const resetPassword = async () => {
    try {
      const response = await axios.post(urlAPI + 'change-password', { email, code, newPassword });
      Alert.alert('Sucesso', 'Senha alterada com sucesso.');
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao alterar a senha.');
    }
  };

  const Enviar = () => {
    navigate("VerCodigo");
  }

  return (
    <ContainerCadastro titulo="Recuperar conta">
      <View style={styles.container}>
        <CampoSimples set={setEmail} placeholder={"Email"} keyboardType='email-address' />
        <BotaoCadastrar texto="Enviar código" onPress={generateCode} />
      </View>
    </ContainerCadastro>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    rowGap: 25,
    alignItems: 'center',
    marginTop: 50,
  }
});

export default RecSenha