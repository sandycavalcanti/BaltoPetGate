import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, ScrollView } from 'react-native';
import { corFundo } from '../constants';

const HisChat = ({ navigation: { navigate } }) => {
  return (
    <ScrollView>
      <View style={styles.container}>

        <View style={styles.groupBox}>
          <Text style={styles.titulo}>Chat</Text>
          <View style={styles.searchBar}>
            <TextInput style={styles.searchInput} placeholder="Search"/>
          </View>
          <View style={styles.contacts}>
            <View style={styles.contact}>
              <Text style={styles.categoria}>Usuários</Text>
              <View style={{ alignItems: "center", marginLeft: 20 }}>
                <Image
                  style={styles.contactImage}
                  source={{ uri: 'https://via.placeholder.com/50' }}
                />
                <Text style={styles.contactName}>Julia Solza</Text>
              </View>
            </View>
            <View style={styles.contact}>
              <Text style={styles.categoria}>Protetores/ONGs/Abrigos</Text>
              <View style={{ alignItems: "center", marginLeft: 20 }}>
                <Image
                  style={styles.contactImage}
                  source={{ uri: 'https://via.placeholder.com/50' }}
                />
                <Text style={styles.contactName}>Marcio Santos</Text>
              </View>
            </View>
            <View style={styles.contact}>
              <Text style={styles.categoria}>Veterinários</Text>
              <View style={{ alignItems: "center", marginLeft: 20 }}>
                <Image
                  style={styles.contactImage}
                  source={{ uri: 'https://via.placeholder.com/50' }}
                />
                <Text style={styles.contactName}>Jasmile</Text>
              </View>
            </View>
            <View style={styles.contact}>
              <Text style={styles.categoria}>Casas de Ração</Text>
              <View style={{ alignItems: "center", marginLeft: 20 }}>
                <Image
                  style={styles.contactImage}
                  source={{ uri: 'https://via.placeholder.com/50' }}
                />
                <Text style={styles.contactName}>Julia de Raza</Text>
              </View>
            </View>
          </View>

        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: corFundo,
    justifyContent:'center',
    alignItems: 'center',
    flex: 1
  },
  searchBar: {
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  contacts: {
    flex: 1,
    padding: 10,

  },
  contact: {
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  contactImage: {
    width: 80,
    height: 80,
    borderRadius: 250,
    marginRight: 10,

  },
  contactName: {
    fontSize: 18,
    marginBottom: 14,
    color: "#697C55",

  },
  categoria: {
    fontSize: 18,
    color: "white",
    marginLeft: 25
  },
  groupBox: {
    width: '90%',
    paddingTop: 20,
    paddingBottom: 10,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 10,
    marginVertical: 30,
    position: 'relative',
  },
  titulo: {
    fontSize: 22,
    color: '#fff',
    position: 'absolute',
    top: -25,
    marginBottom: 10,
    marginLeft: 30,
    paddingHorizontal: 5,
    fontSize: 30,
    backgroundColor: corFundo,
  },
});
export default HisChat;
