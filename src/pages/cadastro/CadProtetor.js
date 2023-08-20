import { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, TextInput, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const CadProtetor = ({ navigation: { navigate } }) => {
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

  const buscarEndereco = async (cep) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const endereco = response.data;
      setUf(endereco.uf);
      setCidade(endereco.localidade);
      setBairro(endereco.bairro);
      setRua(endereco.logradouro);
    } catch (error) {
      alert('CEP inválido. Certifique-se de que o CEP está correto e insira apenas números');
    }
  };

  const Cadastrar = () => {
    navigate("Pagina");
  }

  const [textoDica, setTextoDica] = useState(false);
  const mostrarDica = (fieldName) => {
    setTextoDica((prevState) => ({
      ...prevState,
      [fieldName]: true,
    }));
  };
  const ocultarDica = (fieldName) => {
    setTextoDica((prevState) => ({
      ...prevState,
      [fieldName]: false,
    }));
  };

  return (

    <ScrollView style={{ width: '100%', height: '100%', }}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Cadastre sua associação protetora!</Text>
        <View style={styles.containercampo}>
          <Text style={styles.titulocampo}>Insira seu email:*</Text>
          <TextInput onChangeText={text => setEmail(text)} placeholderTextColor={'grey'} placeholder={"Email"} style={styles.textinput} />
        </View>
        <View style={styles.containercampo}>
          <Text style={styles.titulocampo}>Insira o nome da sua associação protetora:*</Text>
          <TextInput onChangeText={text => setInstituicao(text)} placeholderTextColor={'grey'} placeholder={"Nome da associação protetora"} style={styles.textinput} />
        </View>
        <View style={styles.containercampo}>
          <Text style={styles.titulocampo}>Insira o nome do responsável pela associação protetora:*</Text>
          <TextInput onChangeText={text => setNome(text)} placeholderTextColor={'grey'} placeholder={"Nome do responsável"} style={styles.textinput} />
        </View>
        <View style={styles.containercampo}>
          <Text style={styles.titulocampo}>Insira o telefone:*</Text>
          <TextInput onChangeText={text => setTelefone1(text)} placeholderTextColor={'grey'} placeholder={"Telefone"} onFocus={() => mostrarDica('telefone')} onBlur={() => ocultarDica('telefone')} keyboardType='numeric' style={styles.textinput} />
          <TextInput onChangeText={text => setTelefone2(text)} placeholderTextColor={'grey'} placeholder={"Outro Telefone (Opcional)"} onFocus={() => mostrarDica('telefone')} onBlur={() => ocultarDica('telefone')} keyboardType='numeric' style={styles.textinput} />
          {textoDica['telefone'] && <Text style={styles.dica}>Insira o DDD e apenas números</Text>}
        </View>
        <View style={styles.containercampo}>
          <Text style={styles.titulocampo}>Insira o Whatsapp para atendimento:</Text>
          <TextInput onChangeText={text => setWhatsapp(text)} placeholderTextColor={'grey'} placeholder={"Whatsapp (Opcional)"} onFocus={() => mostrarDica('whatsapp')} onBlur={() => ocultarDica('whatsapp')} keyboardType='numeric' style={styles.textinput} />
          {textoDica['whatsapp'] && <Text style={styles.dica}>Insira o DDD e apenas números. Você pode usar o mesmo número de telefone inserido no item acima</Text>}
        </View>
        <View style={styles.containercampo}>
          <Text style={styles.titulocampo}>Crie uma senha:*</Text>
          <TextInput onChangeText={text => setSenha(text)} placeholderTextColor={'grey'} placeholder={"Senha"} onFocus={() => mostrarDica('senha')} onBlur={() => ocultarDica('senha')} style={styles.textinput} />
          {textoDica['senha'] && <Text style={styles.dica}>A senha deve possuir no mínimo 8 caracteres, um número e uma letra maíscula</Text>}
        </View>
        <View style={styles.containercampo}>
          <Text style={styles.titulocampo}>Insira a localização da sua associação protetora (Opcional):</Text>
          <TextInput onChangeText={text => setCep(text)} placeholderTextColor={'grey'} placeholder={"CEP"} onFocus={() => mostrarDica('cep')} onBlur={() => ocultarDica('cep')} keyboardType='numeric' style={styles.textinput} />
          {textoDica['cep'] && <Text style={styles.dica}>Insira apenas números</Text>}
          <TouchableOpacity onPress={() => buscarEndereco(cep)} style={styles.botaopesquisar}>
            <Text style={styles.textocadastro}>Pesquisar CEP</Text>
          </TouchableOpacity>
          <TextInput onChangeText={text => setUf(text)} value={uf} placeholderTextColor={'grey'} placeholder={"UF"} style={styles.textinput} />
          <TextInput onChangeText={text => setCidade(text)} value={cidade} placeholderTextColor={'grey'} placeholder={"Cidade"} style={styles.textinput} />
          <TextInput onChangeText={text => setBairro(text)} value={bairro} placeholderTextColor={'grey'} placeholder={"Bairro"} style={styles.textinput} />
          <TextInput onChangeText={text => setRua(text)} value={rua} placeholderTextColor={'grey'} placeholder={"Rua"} style={styles.textinput} />
          <TextInput onChangeText={text => setNumero(text)} placeholderTextColor={'grey'} placeholder={"Número"} keyboardType='numeric' style={styles.textinput} />
          <TextInput onChangeText={text => setComplemento(text)} placeholderTextColor={'grey'} placeholder={"Complemento"} style={styles.textinput} />
        </View>
        <View style={styles.containercampo}>
          <Text style={styles.titulocampo}>Insira pelo menos uma rede social:*</Text>
          <TextInput onChangeText={text => setInstagram(text)} placeholderTextColor={'grey'} placeholder={"Link do Instagram"} onFocus={() => mostrarDica('link')} onBlur={() => ocultarDica('link')} style={styles.textinput} />
          <TextInput onChangeText={text => setFacebook(text)} placeholderTextColor={'grey'} placeholder={"Link do Facebook"} onFocus={() => mostrarDica('link')} onBlur={() => ocultarDica('link')} style={styles.textinput} />
          {textoDica['link'] && <Text style={styles.dica}>Insira o link das redes sociais</Text>}

        </View>
        <TouchableOpacity onPress={Cadastrar} style={styles.botaocadastro}>
          <Text style={styles.textocadastro}> Cadastrar </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>

  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#c1ffe9',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  containercontent: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 25,
    color: '#578d97',
    marginTop: 30,
    marginBottom: 50,
  },
  textinput: {
    width: '100%',
    fontSize: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 5,
  },
  containercampo: {
    width: '80%',
    marginBottom: 15,
  },
  titulocampo: {
    fontSize: 16,
  },
  dica: {
    fontSize: 14,
    color: 'grey',
    textAlign: 'center',
  },
  botaocadastro: {
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D0FBEC',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#6AD5AF',
    marginTop: 5,
    marginBottom: 25,
  },
  textocadastro: {
    color: '#578d97',
    fontSize: 18,
  },
  botaopesquisar: {
    width: '100%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D0FBEC',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#6AD5AF',
    marginTop: 5,
    marginBottom: 15,
  },
});

export default CadProtetor