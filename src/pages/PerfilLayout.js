import { useState, useEffect } from "react";
import { StyleSheet, Dimensions, Text, View, SafeAreaView, Button, StatusBar, Image, ScrollView, TouchableOpacity, ToastAndroid } from "react-native";
import { Entypo, AntDesign } from '@expo/vector-icons';
import { urlAPI } from "../constants";
import { useNavigation } from '@react-navigation/native';
import Dropdown from './../components/perfil/Dropdown';
import SairDaConta from "../components/perfil/SairDaConta";
import { Alert } from 'react-native';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
let scrollY = 0;
let item1 = item2 = item3 = {};

const PerfilLayout = (props) => {
  const navigation = useNavigation();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [valorScroll, setValorScroll] = useState(0);
  scrollY = props.scrollY;

  const [imageExists, setImageExists] = useState(true);
  const urlImg = urlAPI + 'selpessoaimg/' + props.data.TB_PESSOA_ID;

  useEffect(() => {
    const checkImageExists = async () => {
      try {
        const response = await fetch(urlImg);
        if (!response.ok) {
          setImageExists(false);
        }
        console.log(response.ok, urlImg, response)
      } catch (error) {
        setImageExists(false);
      }
    };

    checkImageExists();
  }, [urlImg]);


  const MedirAltura = (event) => {
    const height = event.nativeEvent.layout.height;
    props.setPerfilHeight(height);
  };

  useEffect(() => {
    let timeoutId = null;
    let listener;
    setTimeout(() => {
      listener = scrollY.addListener((value) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          const valorScrollInteiro = Math.trunc(value.value);
          setValorScroll(valorScrollInteiro);
          if (valorScrollInteiro > 200) {
            setDropdownVisible(false);
          }
        }, 100);
      });
    }, 2500);
    return () => {
      scrollY.removeListener(listener);
    };
  }, [scrollY]);

  if (props.pessoal) {
    item1 = {
      texto: 'Alterar minhas informações',
      press: () => navigation.navigate('AlterarCad', { modoAlterar: true })
    }
    item2 = {
      texto: 'Desativar conta',
      press: () => Alert.alert(
        "Desativar o Perfil",
        "Tem certeza de que deseja desativar sua conta? Ela não poderá ser reativada.",
        [{
          text: "Não",
          style: "cancel"
        },
        {
          text: "Sim",
          onPress: async () => {
            await AsyncStorage.removeItem('token');
            await axios.put(urlAPI + 'delpessoa/' + props.data.TB_PESSOA_ID);
            navigation.navigate('Login');
          }
        }]
      )
    }
    item3 = {
      texto: 'Sair da conta',
      press: () => { setModalVisible(true); setDropdownVisible(false); }
    }
  } else {
    item1 = {
      texto: 'Denunciar perfil',
      press: () => navigation.navigate('AlterarCad', { modoAlterar: true })
    }
    item2 = {
      texto: 'Bloquear pessoa',
      press: () => navigation.navigate('AlterarCad', { modoAlterar: true })
    }
    item3 = null;
  }

  return (
    <SafeAreaView style={styles.container} onLayout={MedirAltura}>
      <View>
        <View style={styles.Oval}></View>
        <View style={styles.Fundo}></View>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="left" size={28} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)}>
            <Entypo name="dots-three-vertical" size={26} color="black" />
          </TouchableOpacity>
          <Dropdown val={dropdownVisible} set={setDropdownVisible} item1={item1} item2={item2} item3={item3} valorScroll={valorScroll} />
          <SairDaConta val={modalVisible} set={setModalVisible} />
        </View>
        <View style={styles.profileContainer}>
          {imageExists ? <Image style={styles.profileImage} source={{ uri: urlImg }} /> : <Image style={styles.profileImage} source={{ uri: 'https://via.placeholder.com/100' }} />}
          <Text style={styles.profileName}>{props.data.TB_PESSOA_NOME_PERFIL}</Text>
        </View>
        <View style={styles.buttons}>
          {props.pessoal ?
            <>
              <TouchableOpacity style={[styles.button, { width: '90%' }]} onPress={() => console.log('Iniciar sesión button pressed')}>
                <Text style={styles.buttonText}>Alterar perfil</Text>
              </TouchableOpacity>
            </>
            :
            <>
              <TouchableOpacity style={styles.button} onPress={() => console.log('Iniciar sesión button pressed')}>
                <Text style={styles.buttonText}>Seguir</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => console.log('Postadas button pressed')}>
                <Text style={styles.buttonText}>Iniciar Chat</Text>
              </TouchableOpacity>
            </>}
        </View>
        <View style={styles.content}>
          <Text style={styles.contentText}>
            {props.data.TB_PESSOA_BIO}
          </Text>
        </View>
      </View>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 10,
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
    height: 100,
    top: 270,
    backgroundColor: '#CEF7FF',
    shadowColor: '#519546',
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileContainer: {
    width: 250,
    alignItems: 'center',
    shadowColor: '#171717',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 3,
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
});

export default PerfilLayout