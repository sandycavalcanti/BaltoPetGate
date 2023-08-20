import { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, TextInput, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const CadEstabelecimento = ({ navigation: { navigate } }) => {
  // const navigation = useNavigation();  
  // const Cadastrar = () => {
  //     // Não permite que o usuário retorne a página
  //     navigation.reset({
  //     index: 0,
  //     routes: [{ name: 'Pagina' }],
  //     });
  // }
  const [email, setEmail] = useState('');
  const [instituicao, setInstituicao] = useState('');
  const [nome, setNome] = useState('');
  const [cnpj, setCnpj] = useState();
  const [telefone1, setTelefone1] = useState();
  const [telefone2, setTelefone2] = useState();
  const [whatsapp, setWhatsapp] = useState();
  const [senha, setSenha] = useState('');
  const [cep, setCep] = useState('');
  const [uf, setUf] = useState('');
  const [cidade, setCidade] = useState('');
  const [bairro, setBairro] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState();
  const [complemento, setComplemento] = useState('');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');


  return (

    <ScrollView style={{ width: '100%', height: '100%', }}>

    </ScrollView>

  )
}

export default CadEstabelecimento