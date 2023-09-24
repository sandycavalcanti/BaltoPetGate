import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, TouchableOpacity } from 'react-native';
import { corBordaBoxCad, corPlaceholderCad } from '../../constants';

const BotaoQuantidade = (props) => {
  
  const [quantidade, setQuantidade] = useState(0);

  const aumentarQuantidade = () => {
    setQuantidade(quantidade + 1);
    props.set(quantidade + 1);
  };

  const diminuirQuantidade = () => {
    if (quantidade > 0) {
      setQuantidade(quantidade - 1);
      props.set(quantidade + 1);
    }
  };

  return (
    <View style={styles.Container}>
      <TouchableOpacity style={styles.Mais} onPress={aumentarQuantidade}>
        <Text style={styles.Texto}>+</Text>
      </TouchableOpacity>
      <Text style={styles.Texto}>{quantidade}</Text>
      <TouchableOpacity style={styles.Menos} onPress={diminuirQuantidade}>
        <Text style={styles.Texto}>-</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  Container: {
    justifyContent:'space-evenly',
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
    borderColor: corBordaBoxCad,
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    backgroundColor: '#fff'
  },
  Mais: {
    width:'40%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  Menos: {
    width:'40%',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  Texto:{
    color: corPlaceholderCad,
    fontSize: 22
  }
});
export default BotaoQuantidade;
