import * as Linking from 'expo-linking'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import { Alert } from 'react-native'
import { any } from 'prop-types'

export default async function getPermissionAsync(permission) {
  const { status } = await Permissions.askAsync(permission)
  if (status !== 'granted') {
    const permissionName = permission.toLowerCase().replace('_', ' ')
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
    )

    return false
  }
  return true
}

export async function getLocationAsync(onSend) {
  if (await Location.requestForegroundPermissionsAsync()) {
    const location = await Location.getCurrentPositionAsync({})
    if (location) {
      onSend([{ location: location.coords }])
    }
  }
}

export async function pickImageAsync(onSend) {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
  });

  if (!result.canceled) {
    onSend([{ image: result.assets[0].uri }])
    return result.assets[0].uri
  }
}

export async function takePictureAsync(onSend) {
  if (await ImagePicker.requestCameraPermissionsAsync()) {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
    })

    if (!result.canceled) {
      onSend([{ image: result.uri }])
      return result.uri
    }
  }
}
