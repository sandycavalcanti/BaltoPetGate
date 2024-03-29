import { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, ToastAndroid, Image } from 'react-native'
import { corBordaBoxCad, urlAPI } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import Dropdown from '../geral/Dropdown';
import { Entypo } from '@expo/vector-icons';
import ModalConfirmacao from '../geral/ModalConfirmacao';
import Imagem from '../geral/Imagem';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const NavbarChat = (props) => {
  const navigation = useNavigation();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [modalConfirmacaoVisible, setmodalConfirmacaoVisible] = useState(false);
  const [showText, setShowText] = useState(true);
  const dados = props.dados;
  const animais = props.animais;
  const existeAnimal = animais.length !== 0;
  const nomes = animais.map(animal => animal["TB_ANIMAL.TB_ANIMAL_NOME"]).join(', ');
  const pessoaId = props.id
  const urlAnimalImg = urlAPI + 'selanimalimg/';
  const translateYText = useRef(new Animated.Value(5)).current;
  const translateYContent = useRef(new Animated.Value(50)).current;

  // Itens do modal do botão três pontos
  let item1, item2, item3, item4 = {};
  item1 = { texto: 'Visualizar perfil', press: () => navigation.navigate('Perfil', { id: pessoaId }) };
  item2 = !props.desativado ? { texto: 'Desativar conversa', press: () => { setmodalConfirmacaoVisible(true); setDropdownVisible(false) } } : null;
  item3 = { texto: 'Bloquear pessoa', press: () => BloquearPessoa() };
  item4 = { texto: 'Denunciar conversa', press: () => DenunciarConversa() };

  // Variáveis a serem passadas ao infochat (Informações da pessoa que se está conversando)
  let nomeUsuario, tipoUsuario, possuiImg;
  // TB_CHAT_INICIADO será true caso o usuário utilizando o aplicativo seja a pessoa que iniciou o chat 
  if (dados.TB_CHAT_INICIADO == true) {
    nomeUsuario = dados["TB_PESSOA_DESTINATARIO.TB_PESSOA_NOME_PERFIL"];
    tipoUsuario = dados["TB_PESSOA_DESTINATARIO.TB_TIPO_ID"];
    possuiImg = dados["TB_PESSOA_DESTINATARIO.TB_PESSOA_POSSUI_IMG"];
  } else {
    nomeUsuario = dados["TB_PESSOA_REMETENTE.TB_PESSOA_NOME_PERFIL"];
    tipoUsuario = dados["TB_PESSOA_REMETENTE.TB_TIPO_ID"];
    possuiImg = dados["TB_PESSOA_REMETENTE.TB_PESSOA_POSSUI_IMG"];
  }

  const dadosPessoa = {
    TB_PESSOA_ID: pessoaId,
    TB_PESSOA_NOME_PERFIL: nomeUsuario,
    TB_TIPO_ID: tipoUsuario,
    TB_PESSOA_POSSUI_IMG: possuiImg
  };

  const BloquearPessoa = () => {
    ToastAndroid.show('A função de bloquear pessoa ainda será implementada', ToastAndroid.SHORT);
  }

  const DenunciarConversa = () => {
    ToastAndroid.show('A função de denunciar conversa ainda será implementada', ToastAndroid.SHORT);
  }

  // Animação dica info
  useEffect(() => {
    const animateText = () => {
      Animated.timing(translateYText, {
        toValue: -50,
        duration: 800,
        useNativeDriver: true,
      }).start(() => {
        setShowText(false)
        animateContent();
      });
    };
    const animateContent = () => {
      Animated.timing(translateYContent, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    };
    if (existeAnimal) {
      setTimeout(() => {
        animateText();
      }, 2000);
    }
  }, [existeAnimal]);

  return (
    <View style={styles.container}>
      <View style={styles.containerHeaderLeft}>
        {/* Imagem do usuário */}
        <TouchableOpacity onPress={() => navigation.navigate('Perfil', { id: pessoaId })}>
          <Imagem id={pessoaId} existe={possuiImg} style={styles.profileImage} />
        </TouchableOpacity>
      </View>
      <View style={styles.containerHeaderMiddle}>
        <TouchableWithoutFeedback style={{ width: '100%', height: 50 }} onPress={() => { if (existeAnimal) navigation.navigate('InfoChat', { dadosPessoa, animais, dados }) }} >
          {existeAnimal && showText && // Dica info
            <Animated.View style={{ transform: [{ translateY: translateYText }] }}>
              <Text style={{ color: '#fafafa', fontSize: 16 }}>Clique aqui para ver as informações do chat</Text>
            </Animated.View>}
          {/* Nome do usuário e do animal caso houver */}
          <Animated.View style={{ flex: 1, transform: [{ translateY: existeAnimal ? translateYContent : 0 }] }}>
            <View style={[styles.subContainerHeaderMiddle, { alignItems: 'flex-start', justifyContent: 'center' }]}>
              <Text style={[styles.nome, { marginBottom: existeAnimal ? 0 : 5 }]} numberOfLines={1} ellipsizeMode="tail">{nomeUsuario}</Text>
            </View>
            {existeAnimal &&
              <View style={[styles.subContainerHeaderMiddle, { alignItems: 'flex-end' }]}>
                <Text style={styles.nomeAnimal} numberOfLines={1} ellipsizeMode="tail">{nomes}</Text>
              </View>
            }
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.containerHeaderRight}>
        {existeAnimal &&
          // Imagem do animal
          <>
            {animais.length == 1 ? // Um animal
              <TouchableOpacity onPress={() => navigation.navigate('Ficha', { id: animais[0].TB_ANIMAL_ID })}>
                <Image source={{ uri: urlAnimalImg + animais[0].TB_ANIMAL_ID }} style={styles.profileImage} resizeMode='cover' />
              </TouchableOpacity>
              : // Mais de um animal
              <TouchableOpacity onPress={() => navigation.navigate('InfoChat', { dadosPessoa, animais, dados })} style={{ height: 50, width: 70 }}>
                <Image source={{ uri: urlAnimalImg + animais[0].TB_ANIMAL_ID }} style={[styles.animalImage, { position: 'absolute', top: 0, left: 0 }]} resizeMode='cover' />
                <Image source={{ uri: urlAnimalImg + animais[1].TB_ANIMAL_ID }} style={[styles.animalImage, { position: 'absolute', bottom: 0, right: 0 }]} resizeMode='cover' />
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
    // justifyContent: 'space-between',
    // alignItems: 'center',
  },
  subContainerHeaderMiddle: {
    flex: 1,
    width: '100%',
    justifyContent: 'center'
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