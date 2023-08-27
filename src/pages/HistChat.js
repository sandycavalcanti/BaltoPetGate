import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, ScrollView } from 'react-native';

const HisChat = ({ navigation: { navigate } }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>CHAT</Text>
      </View>
      <ScrollView>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
        />
      </View>
      <View style={styles.contacts}>
        <View style={styles.contact}>
        <Text style={styles.categoria}>Usuários</Text>
        <View style={{alignItems:"center", marginLeft:20}}>
          <Image
            style={styles.contactImage}
            source={{uri: 'https://via.placeholder.com/50'}}
          />
          <Text style={styles.contactName}>Julia Solza</Text>
        </View>
        </View>
        <View style={styles.contact}>
        <Text style={styles.categoria}>Protetores/ONGs/Abrigos</Text>
        <View style={{alignItems:"center", marginLeft:20}}>
          <Image
            style={styles.contactImage}
            source={{uri: 'https://via.placeholder.com/50'}}
          />
          <Text style={styles.contactName}>Marcio Santos</Text>
          </View>
        </View>
        <View style={styles.contact}>
        <Text style={styles.categoria}>Veterinários</Text>
        <View style={{alignItems:"center", marginLeft:20}}>
          <Image
            style={styles.contactImage}
            source={{uri: 'https://via.placeholder.com/50'}}
          />
          <Text style={styles.contactName}>Jasmile</Text>
          </View>
        </View>
        <View style={styles.contact}>
        <Text style={styles.categoria}>Casas de Ração</Text>
        <View style={{alignItems:"center", marginLeft:20}}>
          <Image
            style={styles.contactImage}
            source={{uri: 'https://via.placeholder.com/50'}}
          />
          <Text style={styles.contactName}>Julia de Raza</Text>
          </View>
        </View>
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#add8e6',
},
header: {
  backgroundColor: '#add8e6',
  padding: 10,
},
title: {
  fontSize: 20,
  fontWeight: 'bold',
  textAlign: 'center',
  color: "#FF0184",
  marginTop:20
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
  marginBottom:14,
  color:"#697C55", 
  
},
categoria: {
  fontSize: 18,
  color:"white",
  marginLeft:25
}
});
export default HisChat;
