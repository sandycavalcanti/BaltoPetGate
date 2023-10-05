import { View, Text } from 'react-native'
import Carregando from '../components/geral/Carregando'
import axios from 'axios'
import { urlAPI } from '../constants'

const Teste = () => {
  const InserirDados = () => {
    axios.post(urlAPI + 'cadpessoa', {
      TB_TIPO_ID: 1,
      TB_PESSOA_NOME: nome,
      TB_PESSOA_NOME_PERFIL: nomePerfil,
      TB_PESSOA_EMAIL: email,
      TB_PESSOA_SENHA: senha,
    }).then(response => {
      console.log(response.data.message)
      navigation.reset({ index: 0, routes: [{ name: 'Menu' }] });
    }).catch(error => {
      let erro = error.response.data.message;
      console.error(erro)
    })
  }
  return (
    <>
      <Carregando carregando={true} />
    </>
  )
}

export default Teste