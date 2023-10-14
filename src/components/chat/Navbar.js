import { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { corBordaBoxCad, urlAPI } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import Dropdown from '../perfil/Dropdown';
import { Entypo } from '@expo/vector-icons';
import ChecarImagem from '../../utils/ChecarImagem';

let item1 = item2 = item3 = item4 = {};

export function Navbar(props) {
  const navigation = useNavigation();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [imageExists, setImageExists] = useState(true);
  const [imageAnimalExists, setImageAnimalExists] = useState(true);
  const dados = props.dados;
  const animalId = dados.TB_ANIMAL_ID;
  const animalNome = dados.TB_ANIMAL_NOME;
  const urlImg = urlAPI + 'selpessoaimg/' + props.id;
  const urlAnimalImg = urlAPI + 'selanimalimg/' + animalId;

  useEffect(() => {
    ChecarImagem(urlImg, setImageExists);
    ChecarImagem(urlAnimalImg, setImageAnimalExists);
  }, [urlImg, urlAnimalImg]);

  item1 = {
    texto: 'Visualizar perfil',
    press: () => navigation.navigate('Perfil', { id: props.id })
  }
  item2 = {
    texto: 'Desativar conversa',
    press: () => { }
  }
  item3 = {
    texto: 'Bloquear pessoa',
    press: () => { }
  }
  item4 = {
    texto: 'Denunciar pessoa',
    press: () => { }
  }

  const nomeUsuario = dados.TB_CHAT_INICIADO == true ? dados["TB_PESSOA_DESTINATARIO.TB_PESSOA_NOME_PERFIL"] : dados["TB_PESSOA_REMETENTE.TB_PESSOA_NOME_PERFIL"];

  return (
    <View style={styles.container}>
      <View style={styles.containerHeaderLeft}>
        <TouchableOpacity onPress={() => navigation.navigate('Perfil', { id: props.id })}>
          {imageExists ? <Image style={styles.profileImage} source={{ uri: urlImg }} /> : <Image style={styles.profileImage} source={{ uri: 'https://via.placeholder.com/100' }} />}
        </TouchableOpacity>
      </View>
      <View style={styles.containerHeaderMiddle}>
        <View style={[styles.subContainerHeaderMiddle, { alignItems: 'flex-start', justifyContent: 'center' }]}>
          <Text style={[styles.nome, { marginTop: animalId ? 5 : 0 }]}>{nomeUsuario}</Text>
        </View>
        {animalId &&
          <View style={[styles.subContainerHeaderMiddle, { alignItems: 'flex-end' }]}>
            <Text style={styles.nomeAnimal}>{animalNome}</Text>
          </View>
        }
      </View>
      <View style={styles.containerHeaderRight}>
        {animalId &&
          <>
            <TouchableOpacity onPress={() => navigation.navigate('Ficha', { id: animalId })}>
              {imageAnimalExists ? <Image style={styles.animalImage} source={{ uri: urlAnimalImg }} /> : <Image style={styles.animalImage} source={{ uri: 'https://via.placeholder.com/100' }} />}
            </TouchableOpacity>
          </>}
        <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)} style={{ marginRight: 10 }}>
          <Entypo name="dots-three-vertical" size={26} color={corBordaBoxCad} />
        </TouchableOpacity>
      </View>
      <Dropdown val={dropdownVisible} set={setDropdownVisible} item1={item1} item2={item2} item3={item3} item4={item4} valorScroll={-16} valorDireita={10} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#A9DDAE',
    borderBottomWidth: 1,
    borderColor: '#fff',
  },
  containerHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerHeaderMiddle: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subContainerHeaderMiddle: {
    flex: 1,
    width: '100%'
  },
  nome: {
    color: '#fff',
    fontSize: 20,
  },
  nomeAnimal: {
    color: '#AA5A5A',
    fontSize: 18,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginVertical: 5,
    borderColor: '#fff',
    borderWidth: 1,
    marginHorizontal: 10
  },
  animalImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginVertical: 5,
    borderColor: '#fff',
    borderWidth: 1,
    marginRight: 8,
    marginLeft: 3
  }
});