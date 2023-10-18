import { StyleSheet, Text, View, ToastAndroid } from 'react-native'
import { useEffect, useState } from 'react'
import { urlAPI } from '../constants';
import axios from 'axios';

const Teste = () => {

  const id = 1;

  const Desativar = async () => {
    await axios.put(urlAPI + 'deldenuncia/' + id)
      .then(response => {
        console.log('Deletado')
      }).catch(error => {
        let erro = error.response.data;
        ToastAndroid.show(erro.message, ToastAndroid.SHORT);
        console.error(erro.error, error);
      });
  }


  return (
    <View>
      <Text>{dados.TB_ANIMAL_NOME}</Text>
    </View>
  )
}

export default Teste

const styles = StyleSheet.create({})