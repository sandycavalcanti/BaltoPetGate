import { Text, TouchableOpacity, StyleSheet, View } from 'react-native'
import ContainerCadastro from '../../components/cadastro/ContainerCadastro';
import CampoSimples from '../../components/cadastro/CampoSimples';
import BotaoCadastrar from '../../components/cadastro/BotaoCadastrar';
import { useState } from 'react';

const RecSenha = ({ navigation: { navigate } }) => {

  const [email, setEmail] = useState('');

  const Enviar = () => {
    navigate("VerCodigo");
  }

  return (
    <ContainerCadastro titulo="Recuperar conta">
      <View style={styles.container}>
        <CampoSimples set={text => setEmail(text)} placeholder={"Email"} keyboardType='email-address' />
        <BotaoCadastrar texto="Enviar código" onPress={Enviar} />
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