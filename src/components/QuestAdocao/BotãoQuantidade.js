import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const QuantidadePasseios = () => {
  const [quantidade, setQuantidade] = useState(0);

  const aumentarQuantidade = () => {
    setQuantidade(quantidade + 1);
  };

  const diminuirQuantidade = () => {
    if (quantidade > 0) {
      setQuantidade(quantidade - 1);
    }
  };

  return (
    <View>
      <Text>Quantidade de Passeios: {quantidade}</Text>
      <TouchableOpacity onPress={aumentarQuantidade}>
        <Text>+</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={diminuirQuantidade}>
        <Text>-</Text>
      </TouchableOpacity>
    </View>
  );
};

export default QuantidadePasseios;
