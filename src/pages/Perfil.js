import { useState, useEffect } from "react";
import { StyleSheet, Dimensions, Text, View, SafeAreaView, StatusBar, Image, ScrollView, TouchableOpacity, Modal } from "react-native";
import { Entypo, AntDesign } from '@expo/vector-icons';
import axios from "axios";
import { urlAPI } from "../constants";
import { Divider } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Perfil = ({ navigate, TB_PESSOA_IDD, setPerfilHeight }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [select, setSelect] = useState([]);

  useEffect(() => {
    if (TB_PESSOA_IDD) {
      axios.post(urlAPI + 'selpessoa/filtrar', {
        TB_PESSOA_ID: TB_PESSOA_IDD,
      }).then((response) => {
        setSelect(response.data[0]);
      }).catch((error) => {
        setSelect(error.response.data.message);
      });
    }
  }, [TB_PESSOA_IDD]);

  const MedirAltura = (event) => {
    const height = event.nativeEvent.layout.height;
    setPerfilHeight(height);
  };

  const SairDaConta = async () => {
    await AsyncStorage.removeItem('token');
    navigate('Login');
  }

  const Dropdown = () => {
    return (
      <Modal visible={dropdownVisible} transparent={true} animationType="none" onRequestClose={() => setDropdownVisible(false)}>
        <TouchableOpacity style={styles.dropdownBackdrop} onPress={() => setDropdownVisible(false)}>
          <View style={[styles.dropdown, { top: 70, right: 25 }]}>
            <TouchableOpacity style={styles.dropdownButton}>
              <Text style={styles.textDropdownButton} onPress={() => navigate('CompletarCad')}>Alterar minhas informações</Text>
            </TouchableOpacity>
            <Divider width={1} color="black" />
            <TouchableOpacity style={styles.dropdownButton}>
              <Text style={styles.textDropdownButton}>Desativar conta</Text>
            </TouchableOpacity>
            <Divider width={1} color="black" />
            <TouchableOpacity style={styles.dropdownButton} onPress={SairDaConta}>
              <Text style={styles.textDropdownButton}>Sair da conta</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    )
  }

  return (
    <SafeAreaView style={styles.container} onLayout={MedirAltura}>
      <View>
        <View style={styles.Oval}></View>
        <View style={styles.Fundo}></View>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigate("Home")}>
            <AntDesign name="left" size={28} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)}>
            <Entypo name="dots-three-vertical" size={26} color="black" />
          </TouchableOpacity>
          <Dropdown />
        </View>
        <View style={styles.profileContainer}>
          <Image style={styles.profileImage} source={{ uri: 'https://via.placeholder.com/200' }} />
          <Text style={styles.profileName}>{select.TB_PESSOA_NOME_PERFIL}</Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={() => console.log('Iniciar sesión button pressed')}>
            <Text style={styles.buttonText}>Seguir</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => console.log('Postadas button pressed')}>
            <Text style={styles.buttonText}>Iniciar Chat</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Text style={styles.contentText}>
            ASDASDASDSAMDOJNASDJ
            asdwiooooooooooooooooooooooj
            INASIUDNASINAUIAJNDSJANDJAKSNKSAJNDKJANSDKJANSDKASNDKJASNKJASNDKJANSDKJASNDKJASNDKJ
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 10,
    height: '100%',
    backgroundColor: '#C1E6CD',
  },
  Oval: {
    position: 'absolute',
    width: windowWidth / 2,
    height: windowWidth / 2,
    top: 170,
    left: windowWidth / 4,
    borderRadius: 120,
    backgroundColor: '#CEF7FF',
    transform: [{ scaleX: 2 }],
  },
  Fundo: {
    position: 'absolute',
    width: '100%',
    height: 140,
    top: 270,
    backgroundColor: '#CEF7FF',
    shadowColor: '#519546',
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  profileContainer: {
    width: 250,
    alignItems: 'center',
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#093C4B',
    textAlign: 'center',
    marginRight: 5,
    marginBottom: 20
  },
  buttons: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-around'
  },
  button: {
    backgroundColor: '#A7DEC0',
    width: '47%',
    borderRadius: 5,
    justifyContent: "center",
    alignItems: 'center',
    borderColor: "#448659",
    borderWidth: 1,
    padding: 5
  },
  buttonText: {
    color: '#448659',
    fontSize: 16
  },
  content: {
    padding: 20,
    backgroundColor: '#CEF7FF',
  },
  contentText: {
    fontSize: 15,
    color: '#093C4B',
    textAlign: 'justify',
  },
  dropdown: {
    position: 'absolute',
    top: 40,
    right: 25,
    backgroundColor: 'white',
    borderColor: '#B18888',
    borderWidth: 1,
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 5,
  },
  dropdownButton: {
    paddingVertical: 10,
    width: 225,
  },
  dropdownBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textDropdownButton: {
    marginLeft: 10,
    fontSize: 15,
  }
});

export default Perfil