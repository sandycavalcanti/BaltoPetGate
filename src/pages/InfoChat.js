import { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, TextInput, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import axios from 'axios';
import Contato from '../components/HistChat/Contato'
import { corBordaBoxCad, corTituloCad, urlAPI } from '../constants';
import { AntDesign } from '@expo/vector-icons';
import { ImageBackground } from 'react-native';

const InfoChat = ({ navigation: { navigate } }) => {
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View>
            <View  style={styles.imagem}>
                
            </View>
            <Text style={styles.titulo}>Janete adasjidh</Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#A9DDE8',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  imagem: {
    height: 150,
    width: 150,
    marginTop: 50,
  },
  titulo: {
    fontSize: 25,
    color: corTituloCad,
    marginBottom: 15,
    marginTop: 5,
  },
});

export default InfoChat;
