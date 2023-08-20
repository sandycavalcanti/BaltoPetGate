import React, { useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Image } from 'react-native';

const TelaSplash = ({ navigation }) => {

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 4000);
  }, []);

  return (

    <View style={styles.Container}>
      {/* <Image style={styles.ImagemFundo} resizeMode="contain" source={require('../../../assets/img/Splash_cima.png')} /> */}
      <Image style={styles.Imagem} resizeMode='contain' source={require('../../../assets/img/Logo.png')} />
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#82C9D3',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  ImagemFundo: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  Imagem: {
    width: '50%',
    height: '50%'
  }
});



export default TelaSplash;
