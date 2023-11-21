import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { urlAPI } from '../../constants';
import ModalDropdown from 'react-native-modal-dropdown';
import { Divider } from 'react-native-elements';
import Imagem from '../geral/Imagem';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

const Perfil_post = (props) => {
  const TB_PESSOA_ID = props.data.TB_PESSOA_ID;
  const urlImg = urlAPI + 'selpessoaimg/' + TB_PESSOA_ID;
  const navigation = useNavigation();
  let dropdownOptions = [];

  if (props.pessoal) {
    dropdownOptions = ['Visualizar perfil', 'Editar', 'Desativar'];
  } else {
    dropdownOptions = ['Visualizar perfil', 'Denunciar publicação', 'Bloquear pessoa'];
  }
  const NavegarParaPerfil = () => {
    navigation.navigate("Perfil", { id: TB_PESSOA_ID });
  }

  const onSelect = (index, value) => {
    if (index == 0) {
      NavegarParaPerfil()
    } else if (index == 1) {
      if (tipo == 'animal') {

      } else {

      }
    } else if (index == 2) {
      if (tipo == 'animal') {

      } else {

      }
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
        <ModalDropdown options={dropdownOptions} defaultIndex={null} onSelect={onSelect} renderSeparator={() => <Divider width={1} color='gray' />} dropdownStyle={styles.dropdownOptions} dropdownTextStyle={{ fontSize: 16, paddingLeft: 10, paddingRight: 20, color: '#000' }}>
          <View style={styles.dropdownHeader}>
            <Feather name="more-vertical" size={30} color="#B66F6F" />
          </View>
        </ModalDropdown>
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
  dropdownHeader: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 4,
  },
  dropdownOptions: {
    height: 140,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 4,
    marginTop: -20,
    paddingTop: 5,
    zIndex: 10,
  },
  Imagem: {
    width: 'auto',
    height: 50,
    aspectRatio: 1,
  },
});

Perfil_post.propTypes = {
  data: PropTypes.object,
  pessoal: PropTypes.bool,
  tipo: PropTypes.string
}

export default Perfil_post;