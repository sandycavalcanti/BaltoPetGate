import React from 'react'
import { StyleSheet, Text, View, Image, TextInput, ScrollView, SafeAreaView } from 'react-native';

const Contato = (props) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.contactImage}
        source={{ uri: 'https://via.placeholder.com/50' }}
      />
      <Text style={styles.contactName}>{props.nome}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  contactImage: {
    width: 80,
    height: 80,
    borderRadius: 250,
    marginRight: 10,
    borderColor: 'white',
    borderWidth: 1,
  },
  contactName: {
    width: 90,
    paddingVertical: 6,
    fontSize: 18,
    marginBottom: 14,
    color: "#697C55",
    textAlign: 'center'
  },
});
export default Contato;