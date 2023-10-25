import { View, Text, ToastAndroid } from 'react-native'
import React from 'react'
import DecodificarToken from '../utils/DecodificarToken';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { urlAPI } from '../constants';

let TB_PESSOA_IDD;

const Teste = () => {

  const PegarId = async () => {
    const decodedToken = await DecodificarToken();
    TB_PESSOA_IDD = decodedToken.TB_PESSOA_IDD;
  }

  useEffect(() => {

    PegarId()
    const Selecionar = async () => {
      axios.get(urlAPI + 'selpessoa/' + TB_PESSOA_IDD)
        .then(response => {
          setDados(response.data[0]);
          console.log(response.data)
        })
        .catch(error => {
          let erro = error.response.data;
          ToastAndroid.show(erro.message, ToastAndroid.SHORT);
          console.error('Erro ao selecionar:', erro.error);
        });
    };
    Selecionar();
  }, []);
  

  const [dados, setDados] = useState([]);

  return (
    <View>
      <Text>{dados.TB_PESSOA_NOME_PERFIL}</Text>
      <Text>{dados.TB_PESSOA_NOME}</Text>
      <Text>{dados.TB_TIPO_ID}</Text>
    </View>
  )
}

export default Teste