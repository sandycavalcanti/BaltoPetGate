import { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import DropDownBotao from "../components/components_cadastro/DropDownBotao";
import axios from 'axios';
import { urlAPI } from '../constants';
import { corFundoCad } from "../constants";

function Home({ navigation: { navigate } }) {

  let id = 4;
  const AlterarDados = async () => {
    try {
      const response = await axios.put(urlAPI + 'altpessoa/' + id, {
        TB_PESSOA_NOME: 'dados.nome',
        TB_PESSOA_NOME_PERFIL: 'dados.nomePerfil',
        TB_PESSOA_EMAIL: 'dados.email',
        TB_PESSOA_SENHA: ' dados.senha',
        TB_PESSOA_CEP: '06501120',
        TB_PESSOA_UF: 'SP',
        TB_PESSOA_CIDADE: 'dados.cidade',
        TB_PESSOA_BAIRRO: 'dados.bairro',
        TB_PESSOA_RUA: 'dados.rua',
        TB_PESSOA_NUMERO: 12,
        TB_PESSOA_COMPLEMENTO: 'dados.complemento',
        TB_PESSOA_CPF: '23091919328',
        TB_PESSOA_WHATSAPP: 1231321,
        TB_PESSOA_INSTAGRAM: 'dados.instagram',
        TB_PESSOA_FACEBOOK: 'dados.facebook',
        TB_PESSOA_TELEFONE1: 123123213,
        TB_PESSOA_TELEFONE2: 12313231,
        TB_PESSOA_ANIMAL_CASA: 'CASA',
        TB_PESSOA_ANIMAL_FAMILIA: true,
        TB_PESSOA_ANIMAL_RUA: false,
        TB_PESSOA_ANIMAL_QUANTIDADE: 12,
        TB_PESSOA_CRMV: '123122',
        TB_PESSOA_CNPJ: '12345678901234',
        TB_PESSOA_PIX: 'dados.pix',
        TB_PESSOA_LINK: 'dados.link',
      });
      console.log('Alterado:', response.data.message);
    } catch (error) {
      console.error('Erro ao alterar:', error);
    }
  };

  
  const [select, setSelect] = useState();
  const Selecionar = async () => {
    try {
      await axios.post(urlAPI + 'selanimal/filtrar', {
        TB_ANIMAL_PESO: 2.7
      })
        .then((response) => {
          setSelect(response.data);
        }).catch((error) => {
          let erro = error.response.data.message;
          console.error('Erro ao selecionar:', erro);
        })
    } catch (error) {
      ToastAndroid.show('Email ou senha inválidos', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      {/* <DropDownBotao/> */}
      <TouchableOpacity onPress={() => navigate('Login')}><Text>Login</Text></TouchableOpacity>
      <TouchableOpacity onPress={Selecionar}><Text>Selecionar</Text></TouchableOpacity>
      {select && select.map((user, index) => (
        <View key={index} style={{ marginVertical: 10, alignItems: 'center' }}>
          <Text>{`Nome: ${user.TB_ANIMAL_NOME}`}</Text>
          <Text>{`Email: ${user.TB_ANIMAL_PESO}`}</Text>
          {/* Outros campos a serem exibidos */}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: corFundoCad,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
});

export default Home;