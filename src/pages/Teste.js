import { View, Text,TextInput } from 'react-native'
import React, { useState } from 'react'

const Teste = () => {
  const Formatar = (texto) => {
    return texto.replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
      .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
  }

const [valor, setValor] = useState('');

  return (
    <View>
      <TextInput onChangeText={text => setValor(Formatar(text))} value={valor}/>
      <Text>{valor}</Text>
    </View>
  )
}

export default Teste