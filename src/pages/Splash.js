import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, SafeAreaView, Image } from 'react-native';
import LottieView from 'lottie-react-native';

const Splash = ({ navigation }) => {

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 4000);
  });

  const animation = useRef(null);

  return (

    <View style={styles.Container}>
      <Image
        source={require('../../assets/img/splash.png')}
        style={styles.ImagemFundo}
      />
      <View style={styles.ContainerLogo}>
        <Image
          source={require('../../assets/img/Logo.png')}
          style={styles.Logo}
        />
      </View>
      <View style={styles.ContainerLottie}>
        <LottieView
          source={require('../../assets/animacaoCirculo.json')}
          autoPlay
          loop
          style={styles.Lottie}
        />
      </View>
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
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  ContainerLogo: {
    flex: 1,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Logo: {
    width: 250,
    height: 250,
  },
  ContainerLottie: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  Lottie: {
    width: 370,
    height: 370,
  }
});

export default Splash;