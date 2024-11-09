import * as Linking from 'expo-linking'
import * as Location from 'expo-location'
import * as ImagePicker from 'expo-image-picker'
import { Alert } from 'react-native'
import VerificarTamanhoImagem from '../../utils/VerificarTamanhoImagem'

export async function getPermissionAsync(permission) {
  let permissionStatus;

  switch (permission) {
    case 'location':
      permissionStatus = await Location.requestForegroundPermissionsAsync();
      break;
    case 'camera':
      permissionStatus = await ImagePicker.requestCameraPermissionsAsync();
      break;
    case 'mediaLibrary':
      permissionStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      break;
    default:
      throw new Error('Permission type not supported');
  }

  if (permissionStatus.status !== 'granted') {
    const permissionName = permission.toLowerCase().replace('_', ' ');
    Alert.alert(
      'Sem sucesso.',
      `Por favor, permita ${permissionName}.`,
      [
        {
          text: "Ok",
          onPress: () => Linking.openURL('app-settings:'),
        },
        { text: 'Cancelar', onPress: () => { }, style: 'cancel' },
      ],
      { cancelable: true },
    );

    return false;
  }
  return true;
}

export async function getLocationAsync(onSend) {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status === 'granted') {
    const location = await Location.getCurrentPositionAsync({});
    if (location) {
      onSend([{ location: location.coords }]);
    }
  }
}

export async function pickImageAsync(onSend, setTextoAlert, alertRef) {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
  });

  if (!result.canceled) {
    const mensagemArquivo = await VerificarTamanhoImagem(result);
    if (mensagemArquivo) {
      setTextoAlert(mensagemArquivo);
      alertRef.current.open();
      return;
    }
    onSend([{ image: result.assets[0].uri }]);
    return result.assets[0].uri;
  }
}

export async function takePictureAsync(onSend) {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  if (status === 'granted') {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
    });

    if (!result.canceled) {
      onSend([{ image: result.uri }]);
      return result.uri;
    }
  }
}
