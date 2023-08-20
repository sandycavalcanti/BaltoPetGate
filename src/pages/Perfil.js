import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView } from "react-native";
import { Entypo } from '@expo/vector-icons';

const Perfil = ({ navigation: { navigate } }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.titleBar}>
          <Entypo name="chevron-thin-left" size={24} color="red" />
          <Entypo name="dots-three-vertical" size={24} color="red" />
        </View>

        <View styles={{ alignSelf: "center" }}>
          <View styles={styles.profileImage}>
            <Image source={require('../../assets/img/Logo.png')} style={styles.image} resizeMode="center"></Image>
          </View>
        </View>

        <View style={styles.infoConatiner}>
          <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>Vanessa Juliana</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "fff",

  },
  text: {
    // fontFamily: "HelveticaNeue",
    color: "#52575d"
  },
  image: {
    flex: 1,
    width: 150,
    height: 150
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 16
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden"
  },
  infoConatiner: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 16
  }
});

export default Perfil;