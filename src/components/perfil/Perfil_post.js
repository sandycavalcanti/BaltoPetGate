import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { urlAPI } from '../../constants';
import { Divider } from 'react-native-elements';
import Imagem from '../geral/Imagem';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import DesativarCampo from '../../utils/DesativarCampo';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

const Perfil_post = (props) => {
  const TB_PESSOA_ID = props.data.TB_PESSOA_ID;
  const urlImg = urlAPI + 'selpessoaimg/' + TB_PESSOA_ID;
  const navigation = useNavigation();

  const NavegarParaPerfil = () => {
    navigation.navigate("Perfil", { id: TB_PESSOA_ID });
  }

  const Editar = () => {
    if (props.tipo == 'animal') {
      navigation.navigate('AlterarAnimal', { id: props.itemId })
    } else {
      navigation.navigate('AlterarPostagem', { id: props.itemId })
    }
  }

  return (
    <View style={styles.Container}>
      <TouchableOpacity onPress={NavegarParaPerfil}>
        <View style={styles.ImagemCirculo}>
          <Imagem url={urlImg} style={styles.Imagem} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={NavegarParaPerfil}>
        <View style={styles.ContainerTexto}>
          <Text style={styles.Texto}>{props.data.TB_PESSOA.TB_PESSOA_NOME_PERFIL}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.ContainerIcon}>
        <Menu>
          <MenuTrigger>
            <View style={{ padding: 10 }}>
              <Feather name="more-vertical" size={30} color="#B66F6F" />
            </View>
          </MenuTrigger>
          <MenuOptions optionsContainerStyle={styles.dropdownOptions}>
            <MenuOption onSelect={() => NavegarParaPerfil()}>
              <Text style={[styles.dropdownText, { marginTop: 5 }]}>Visualizar Perfil</Text>
            </MenuOption>
            <Divider width={1} color='gray' />
            {props.pessoal ?
              <>
                <MenuOption onSelect={() => Editar()}>
                  <Text style={styles.dropdownText}>Editar</Text>
                </MenuOption>
                <Divider width={1} color='gray' />
                <MenuOption onSelect={() => DesativarCampo(props.tipo, props.itemId)}>
                  <Text style={[styles.dropdownText, { marginBottom: 5 }]}>Desativar</Text>
                </MenuOption>
              </>
              :
              <>
                <MenuOption onSelect={() => console.log('Denunciar publicação')}>
                  <Text style={styles.dropdownText}>Denunciar publicação</Text>
                </MenuOption>
                <Divider width={1} color='gray' />
                <MenuOption onSelect={() => console.log('Bloquear')}>
                  <Text style={[styles.dropdownText, { marginBottom: 5 }]}>Bloquear pessoa</Text>
                </MenuOption>
              </>
            }
          </MenuOptions>
        </Menu>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    backgroundColor: '#B2EDC5',
    borderColor: 'white',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  ImagemCirculo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: '#fff',
    borderWidth: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  ContainerTexto: {
    height: 'auto',
    width: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Texto: {
    color: '#fff',
    fontSize: 20
  },
  ContainerIcon: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  dropdownOptions: {
    marginTop: 50,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 4,
  },
  dropdownText: {
    fontSize: 16,
    paddingLeft: 10,
    paddingRight: 20,
    color: '#000',
    paddingVertical: 5
  },
  Imagem: {
    width: 'auto',
    height: 50,
    aspectRatio: 1,
  }
});

Perfil_post.propTypes = {
  data: PropTypes.object,
  pessoal: PropTypes.bool,
  tipo: PropTypes.string
}

export default Perfil_post;