import * as Linking from 'expo-linking';
import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import MapView from 'react-native-maps';

const CustomView = ({ currentMessage, containerStyle, mapViewStyle }) => {
  const openMapAsync = async () => {
    const { location = {} } = currentMessage;

    const url = Platform.select({
      ios: `http://maps.apple.com/?ll=${location.latitude},${location.longitude}`,
      default: `http://maps.google.com/?q=${location.latitude},${location.longitude}`,
    });

    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        return Linking.openURL(url);
      }
      alert('Falha ao abrir o mapa.');
    } catch ({ message }) {
      alert(message);
    }
  };

  if (currentMessage.location) {
    return (
      <TouchableOpacity style={[styles.container, containerStyle]} onPress={openMapAsync}>
        <MapView
          style={[styles.mapView, mapViewStyle]}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          scrollEnabled={false}
          zoomEnabled={false}
        />
      </TouchableOpacity>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  container: {

  },
  mapView: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
  },
});

export default CustomView;