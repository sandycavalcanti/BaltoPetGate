import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, TouchableOpacity } from 'react-native';
import { corBordaBoxCad, corPlaceholderCad } from '../../constants';
import PropTypes from 'prop-types';

const BotaoQuantidade = (props) => {
  const defaultNumber = props.defaultValue ? props.defaultValue : 0;
  const [quantidade, setQuantidade] = useState(defaultNumber);

  const aumentarQuantidade = () => {
    if (!props.limite || quantidade < props.limite) {
      const novaQuantidade = quantidade + 1;
      setQuantidade(novaQuantidade);
      if (props.setRef) {
        props.setRef.current = novaQuantidade;
      } else {
        props.set(novaQuantidade);
      }
    }

  };

  const diminuirQuantidade = () => {
    if (quantidade > 0) {
      const novaQuantidade = quantidade - 1;
      setQuantidade(novaQuantidade);
      if (props.setRef) {
        props.setRef.current = novaQuantidade;
      } else {
        props.set(novaQuantidade);
      }
    }
  };

  return (
    <View style={styles.Container}>
      <TouchableOpacity style={styles.Menos} onPress={diminuirQuantidade}>
        <Text style={styles.Texto}>-</Text>
      </TouchableOpacity>
      <Text style={styles.Texto}>{quantidade}</Text>
      <TouchableOpacity style={styles.Mais} onPress={aumentarQuantidade}>
        <Text style={styles.Texto}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    justifyContent: 'space-evenly',
    display: 'flex',
    flexDirection: 'row',
    width: '80%',
    borderColor: corBordaBoxCad,
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#fff'
  },
  Mais: {
    width: '40%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  Menos: {
    width: '40%',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  Texto: {
    color: corPlaceholderCad,
    fontSize: 22
  }
});

BotaoQuantidade.propTypes = {
  set: PropTypes.func,
  setRef: PropTypes.object,
  limite: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default BotaoQuantidade;