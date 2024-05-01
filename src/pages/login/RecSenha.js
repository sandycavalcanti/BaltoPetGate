import { Text, ToastAndroid, StyleSheet, View } from 'react-native'
import ContainerCadastro from '../../components/cadastro/ContainerCadastro';
import CampoSimples from '../../components/cadastro/CampoSimples';
import { useRef, useState } from 'react';
import BotaoCadastrarAnimado from '../../components/cadastro/BotaoCadastrarAnimado';
import AlertPro from 'react-native-alert-pro';
import { corRosaFraco } from '../../constants';
import ValidarCamposCad from '../../utils/ValidarCamposCad';

const RecSenha = ({ navigation: { navigate } }) => {
  const email = useRef('');
  const alertRef = useRef(null);
  const [textoAlert, setTextoAlert] = useState("Insira seu email");

  const Enviar = () => {
    ToastAndroid.show('Essa funcionalidade ainda será adicionada', ToastAndroid.SHORT);
    // if (email.current) {
    //   const ValidarEmail = ValidarCamposCad([], { email: email.current })
    //   if (ValidarEmail) {
    //     setTextoAlert('Email inválido');
    //     alertRef.current.open();
    //   } else {
    //     navigate("VerCodigo", { email: email.current });
    //   }
    // } else {
    //   setTextoAlert("Insira seu email");
    //   alertRef.current.open();
    // }
  }

  return (
    <ContainerCadastro titulo="Recuperar conta">

      {/* <View style={styles.container}>
        <Text style={styles.text}>Insira seu email para recuperação de senha:</Text>
        <CampoSimples set={text => email.current = text} placeholder={"Email"} keyboardType='email-address' />
        <BotaoCadastrarAnimado texto="Enviar código" onPress={Enviar} width={250} />
      </View>
      <AlertPro
        ref={alertRef}
        onConfirm={() => alertRef.current.close()}
        title={textoAlert}
        showCancel={false}
        textConfirm="OK"
        customStyles={{ buttonConfirm: { backgroundColor: corRosaFraco } }}
      /> */}

      <Text style={{ color: '#fafafa', fontSize: 25, textAlign: 'center', marginTop: 120 }}>Essa funcionalidade ainda será implementada</Text>
    </ContainerCadastro>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    rowGap: 25,
    alignItems: 'center',
    marginTop: 50,
  },
  text: {
    color: '#fafafa',
    fontSize: 18,
    textAlign: 'center'
  }
});

export default RecSenha