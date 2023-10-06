import { View, Text, TouchableOpacity, TextInput, ToastAndroid } from 'react-native'
import { urlAPI } from '../constants'
import axios from 'axios'
import { useState } from 'react';

const Teste = () => {

  const [texto, setTexto] = useState('');

  const Reativar = () => {
    if (texto)
      axios.put(urlAPI + 'reativarpessoa/' + texto)
        .then((response) => {
          console.log('reativado', response.data.message)
        })
        .catch((error) => {
          let erro = error.response.data.message;
          ToastAndroid.show(erro, ToastAndroid.SHORT);
          console.error('Erro ao reativar:', error);
        });
  }

  return (
    <>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TextInput onChangeText={text => setTexto(text)} placeholder='ID da pessoa para reativar' />
        <TouchableOpacity onPress={Reativar}>
          <Text>Reativar</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

export default Teste