import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { urlAPI } from '../../constants';
import { Divider } from 'react-native-elements';
import Imagem from '../geral/Imagem';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import DesativarCampo from '../../utils/DesativarCampo';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import ModalConfirmacao from '../geral/ModalConfirmacao';
import { memo, useState } from 'react';

const Perfil_post = (props) => {
  const TB_PESSOA_ID = props.data.TB_PESSOA_ID;
  const urlImg = urlAPI + 'selpessoaimg/' + TB_PESSOA_ID;
  const [modalDesativarVisible, setModalDesativarVisible] = useState(false);
  const navigation = useNavigation();
  const tipoAnimal = props.tipo == 'animal';

  const NavegarParaPerfil = () => {
    navigation.navigate("Perfil", { id: TB_PESSOA_ID });
  }

  const Editar = () => {
    if (tipoAnimal) {
      navigation.navigate('AlterarAnimal', { id: props.itemId })
    } else {
      navigation.navigate('AlterarPostagem', { id: props.itemId })
    }
  }

  const textoConfirmacao = "Deseja " + (!props.reativar ? "desativar " : "reativar ") + (tipoAnimal ? 'esse animal?' : 'essa postagem?');
  const textoToast = tipoAnimal ? ('Animal ' + (!props.reativar ? "desativado" : "reativado")) : ('Postagem ' + (!props.reativar ? "desativada" : "reativada"));
  const aoDesativar = () => {
    props.onRefresh();
    ToastAndroid.show(textoToast, ToastAndroid.SHORT);
  }

  const BloquearPessoa = () => {
    ToastAndroid.show('A função de bloquear pessoa ainda será implementada', ToastAndroid.SHORT);
  }

  const Denunciar = () => {
    ToastAndroid.show('A função de denunciar ainda será implementada', ToastAndroid.SHORT);
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
        {!props.naoExibirOpcoes ?
          <>
            <Menu>
              <MenuTrigger>
                <View style={{ padding: 10 }}>
                  <Feather name="more-vertical" size={30} color="#B66F6F" />
                </View>
              </MenuTrigger>
              <MenuOptions optionsContainerStyle={styles.dropdownOptions}>
                <MenuOption onSelect={() => NavegarParaPerfil()}>
                  <Text style={[styles.dropdownText, { marginTop: 5 }]}>{props.pessoal ? 'Ir para seu Perfil' : 'Visualizar Perfil'}</Text>
                </MenuOption>
                <Divider width={1} color='gray' />
                {props.pessoal ?
                  <>
                    {props.podeEditar &&
                      <MenuOption onSelect={() => Editar()}>
                        <Text style={styles.dropdownText}>Editar {tipoAnimal ? 'animal' : 'postagem'}</Text>
                      </MenuOption>}
                    <Divider width={1} color='gray' />
                    {!props.reativar ?
                      <MenuOption onSelect={() => setModalDesativarVisible(true)}>
                        <Text style={[styles.dropdownText, { marginBottom: 5 }]}>Desativar {tipoAnimal ? 'animal' : 'postagem'}</Text>
                      </MenuOption>
                      :
                      <MenuOption onSelect={() => setModalDesativarVisible(true)}>
                        <Text style={[styles.dropdownText, { marginBottom: 5 }]}>Reativar {tipoAnimal ? 'animal' : 'postagem'}</Text>
                      </MenuOption>
                    }
                  </>
                  :
                  <>
                    <MenuOption onSelect={() => Denunciar()}>
                      <Text style={styles.dropdownText}>Denunciar {tipoAnimal ? 'publicação' : 'postagem'}</Text>
                    </MenuOption>
                    <Divider width={1} color='gray' />
                    <MenuOption onSelect={() => BloquearPessoa()}>
                      <Text style={[styles.dropdownText, { marginBottom: 5 }]}>Bloquear pessoa</Text>
                    </MenuOption>
                  </>
                }
              </MenuOptions>
            </Menu>
            <ModalConfirmacao texto={textoConfirmacao} press={() => DesativarCampo(props.tipo, props.itemId, aoDesativar, props.reativar)} val={modalDesativarVisible} set={setModalDesativarVisible} sim={!props.reativar ? 'Desativar' : 'Reativar'} />
          </>
          :
          <View style={{ padding: 10 }}>
            <Feather name="more-vertical" size={30} color="#B66F6F" />
          </View>
        }
      </View>
    </View>
  )
};

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
  tipo: PropTypes.string,
  itemId: PropTypes.number,
  onRefresh: PropTypes.func,
  podeEditar: PropTypes.bool,
  naoExibirOpcoes: PropTypes.bool,
  reativar: PropTypes.bool
}

export default memo(Perfil_post);