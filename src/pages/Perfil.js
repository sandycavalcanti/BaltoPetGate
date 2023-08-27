import { StyleSheet, Text, View, SafeAreaView, StatusBar, Image, ScrollView, TouchableOpacity } from "react-native";
import { Entypo,AntDesign } from '@expo/vector-icons';
import Post from "../components/components_perfil/Post";
import Perfil_post from "../components/components_perfil/Perfil_post";
import DropdownButton from "../components/components_perfil/DropdownButton"; 

const Perfil = ({ navigation: { navigate } }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.Fundo} ></View>

            <StatusBar></StatusBar> 

            <View style={styles.header}>
              <AntDesign name="left" size={26} color="black" />
              <Entypo style={{justifyContent:"center"}} name="dots-three-vertical" size={26} color="black" />
            </View>
            <View>
              <Image style={styles.profileImage} source={{uri: 'https://via.placeholder.com/100'}}/>
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
          {/* <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log('Iniciar sesión button pressed')}
          >
            <Text style={styles.buttonText}>Postagens</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log('Postadas button pressed')}
          >
            <Text style={styles.buttonText}>Animais</Text>
          </TouchableOpacity>
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#C1E6CD',
  },
  Fundo:{
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 170,
    borderTopLeftRadius: 120,
    borderTopRightRadius: 120,
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
    marginLeft:35,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#093C4B',
    marginLeft:35,
    marginBottom:20
  },
  buttons: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent:'space-around'
  },
  button: {
    backgroundColor: '#A7DEC0',
    width: '47%',
    borderRadius: 5,
    justifyContent:"center",
    alignItems:'center',
    borderColor:"#448659",
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
});

export default Perfil;