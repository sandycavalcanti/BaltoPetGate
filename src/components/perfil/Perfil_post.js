import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { urlAPI } from '../../constants';
import ModalDropdown from 'react-native-modal-dropdown';
import { Divider } from 'react-native-elements';
import Imagem from '../geral/Imagem';

const Perfil_post = (props) => {
  const TB_PESSOA_ID = props.data.TB_PESSOA_ID;
  const urlImg = urlAPI + 'selpessoaimg/' + TB_PESSOA_ID;
  const dropdownOptions = ['Visualizar perfil', 'Denunciar publicação', 'Bloquear pessoa'];

  const NavegarParaPerfil = () => {
    props.navigate("Perfil", { id: TB_PESSOA_ID });
  }

  const onSelect = (index, value) => {
    if (index == 0) {
      NavegarParaPerfil()
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
    borderColor: '#ccc',
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

export default Perfil_post;