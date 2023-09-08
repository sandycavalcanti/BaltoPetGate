import { useState } from "react";
import { StyleSheet, Dimensions, Text, View, SafeAreaView, StatusBar, Image, ScrollView, TouchableOpacity, Modal } from "react-native";
import { Entypo, AntDesign } from '@expo/vector-icons';
import Post from "../components/components_perfil/Post";
import Perfil_post from "../components/components_perfil/Perfil_post";
import DropdownButton from "../components/components_perfil/DropdownButton";
import { Divider } from "react-native-elements";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Perfil = ({ navigate }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.Oval} ></View>
        <View style={styles.Fundo} ></View>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigate("Home")}>
            <AntDesign name="left" size={28} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)}>
            <Entypo name="dots-three-vertical" size={26} color="black" />
          </TouchableOpacity>
          <Modal visible={dropdownVisible} transparent={true} animationType="none" onRequestClose={() => setDropdownVisible(false)}>
            <TouchableOpacity style={styles.dropdownBackdrop} onPress={() => setDropdownVisible(false)}>
              <View style={[styles.dropdown, { top: 70, right: 25 }]}>
                <TouchableOpacity style={styles.dropdownButton}>
                  <Text style={styles.textDropdownButton}>Alterar minhas informações</Text>
                </TouchableOpacity>
                <Divider width={1} color="black" />
                <TouchableOpacity style={styles.dropdownButton}>
                  <Text style={styles.textDropdownButton}>Desativar conta</Text>
                </TouchableOpacity>
                <Divider width={1} color="black" />
                <TouchableOpacity style={styles.dropdownButton}>
                  <Text style={styles.textDropdownButton}>Sair da conta</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Modal>
        </View>
        <View>
          <Image style={styles.profileImage} source={{ uri: 'https://via.placeholder.com/100' }} />
          <Text style={styles.profileName}> Vanesa Juliana (NOME)</Text>
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, magna vel lacinia tincidunt, velit velit bibendum velit, vel tincidunt justo quam vel nisl. Vivamus euismod, diam vel lacinia tincidunt, velit velit bibendum velit, vel tincidunt justo quam vel nisl.
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
    // height: '100%',
    backgroundColor: '#C1E6CD',
  },
  Oval: {
    position: 'absolute',
    width: windowWidth / 2,
    // height: '100%',
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
    // height: '100%',
    height: 240,
    top: 270,
    backgroundColor: '#CEF7FF',
    shadowColor: '#519546',
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 10,
    marginLeft: 35,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#093C4B',
    marginLeft: 35,
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

export default Perfil;