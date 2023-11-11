import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { corBordaBoxCad, urlAPI } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import Dropdown from '../geral/Dropdown';
import { Entypo } from '@expo/vector-icons';
import ModalConfirmacao from '../geral/ModalConfirmacao';
import Imagem from '../geral/Imagem';

let item1 = item2 = item3 = item4 = {};

const NavbarChat = (props) => {
  const navigation = useNavigation();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [modalConfirmacaoVisible, setmodalConfirmacaoVisible] = useState(false);
  const dados = props.dados;
  const animais = props.animais;
  const existeAnimal = animais.length !== 0;
  const nomes = animais.map(animal => animal["TB_ANIMAL.TB_ANIMAL_NOME"]).join(', ');
  const pessoaId = props.id
  const animalId = 3;
  const urlPessoaImg = urlAPI + 'selpessoaimg/';
  const urlAnimalImg = urlAPI + 'selanimalimg/';

  item1 = {
    texto: 'Visualizar perfil',
    press: () => navigation.navigate('Perfil', { id: pessoaId })
  }
  if (!props.desativado) {
    item2 = {
      texto: 'Desativar conversa',
      press: () => { setmodalConfirmacaoVisible(true); setDropdownVisible(false) }
    }
  } else {
    item2 = null
  }
  item3 = {
    texto: 'Bloquear pessoa',
    press: () => { }
  }
  item4 = {
    texto: 'Denunciar conversa',
    press: () => { }
  }

  const nomeUsuario = dados.TB_CHAT_INICIADO == true ? dados["TB_PESSOA_DESTINATARIO.TB_PESSOA_NOME_PERFIL"] : dados["TB_PESSOA_REMETENTE.TB_PESSOA_NOME_PERFIL"];

  return (
    <View style={styles.container}>
      <View style={styles.containerHeaderLeft}>
        <TouchableOpacity onPress={() => navigation.navigate('Perfil', { id: pessoaId })}>
          <Imagem url={urlPessoaImg + pessoaId} style={styles.profileImage} />
        </TouchableOpacity>
      </View>
      <View style={styles.containerHeaderMiddle}>
        <View style={[styles.subContainerHeaderMiddle, { alignItems: 'flex-start', justifyContent: 'center' }]}>
          <Text style={[styles.nome, { marginTop: existeAnimal ? 5 : 0 }]} numberOfLines={1} ellipsizeMode="tail">{nomeUsuario}</Text>
        </View>
        {existeAnimal &&
          <View style={[styles.subContainerHeaderMiddle, { alignItems: 'flex-end' }]}>
            <Text style={styles.nomeAnimal} numberOfLines={1} ellipsizeMode="tail">{nomes}</Text>
          </View>
        }
      </View>
      <View style={styles.containerHeaderRight}>
        {existeAnimal &&
          <>
            {animais.length == 1 ?
              <TouchableOpacity onPress={() => navigation.navigate('Ficha', { id: animalId })}>
                <Imagem url={urlAnimalImg + animais[0].TB_ANIMAL_ID} style={styles.profileImage} />
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={() => navigation.navigate('Ficha', { id: animalId })} style={{ height: 50, width: 70 }}>
                <Imagem url={urlAnimalImg + animais[0].TB_ANIMAL_ID} style={[styles.animalImage, { position: 'absolute', top: 0, left: 0 }]} />
                <Imagem url={urlAnimalImg + animais[1].TB_ANIMAL_ID} style={[styles.animalImage, { position: 'absolute', bottom: 0, right: 0 }]} />
                {animais.length > 2 && <Text style={{ position: 'absolute', top: 0, right: 0, fontSize: 18, color: '#fff' }}>+{animais.length - 2}</Text>}
              </TouchableOpacity>}
          </>}
        <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)} style={{ marginRight: 10 }}>
          <Entypo name="dots-three-vertical" size={26} color={corBordaBoxCad} />
        </TouchableOpacity>
      </View>
      <Dropdown val={dropdownVisible} set={setDropdownVisible} item1={item1} item2={item2} item3={item3} item4={item4} valorScroll={-16} valorDireita={10} />
      <ModalConfirmacao texto="Deseja desativar essa conversa?" subtexto="As mensagens nesse chat não serão mais acessíveis" val={modalConfirmacaoVisible} set={setmodalConfirmacaoVisible} sim='Desativar' press={props.DesativarChat} />
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
    width: 40,
    height: 40,
    borderRadius: 100,
    borderColor: '#fff',
    borderWidth: 1,
    marginRight: 8,
    marginLeft: 3
  }
});

export default NavbarChat