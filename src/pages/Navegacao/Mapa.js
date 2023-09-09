import { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Button } from 'react-native';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject, watchPositionAsync, LocationAccuracy } from 'expo-location';

export default function Mapa() {
  const [location, setLocation] = useState(null);
  const [redMarkerCoords, setRedMarkerCoords] = useState(null);
  const [orangeMarkersCoords, setOrangeMarkersCoords] = useState([]);

  async function requestLocationPermissions() {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
      setRedMarkerCoords(currentPosition.coords);
      console.log("LOCALIZAÇÃO ATUAL =>", currentPosition);
    }
  }

  useEffect(() => {
    requestLocationPermissions();
  }, []);

  useEffect(() => {
    watchPositionAsync({
      accuracy: LocationAccuracy.Highest,
      timeInterval: 1000,
      distanceInterval: 1,
    }, (response) => {
      console.log("NOVA LOCALIZAÇÃO!", response);
      setLocation(response);
    });
  }, []);

  return (
    <View style={styles.container}>
      {location &&
        <MapView
          style={{ width: '100%', height: '100%' }}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
          }}>
          <Marker
            coordinate={redMarkerCoords}
          />
          {orangeMarkersCoords.map((coords, index) => (
            <Marker
              key={index}
              coordinate={coords}
              pinColor='orange'
            />
          ))}
        </MapView>
      }
      <View style={styles.buttonContainer}>
        <Button
          title="Adicionar marcador laranja"
          onPress={() => setOrangeMarkersCoords([...orangeMarkersCoords, redMarkerCoords])}
        />
        <Button
          title="Mover marcador vermelho"
          onPress={() => setRedMarkerCoords({
            latitude: redMarkerCoords.latitude + 0.001,
            longitude: redMarkerCoords.longitude + 0.001,
          })}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
});
