import { MaterialIcons } from '@expo/vector-icons'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { getLocationAsync, pickImageAsync, takePictureAsync } from './mediaUtils'

const Button = ({ onPress, size = 30, color = 'rgba(0,0,0,0.5)', ...props }) => (
  <TouchableOpacity onPress={onPress}>
    <MaterialIcons size={size} color={color} {...props} />
  </TouchableOpacity>
)

const AccessoryBar = ({ onSend, isTyping }) => (
  <View style={styles.container}>
    <Button onPress={() => pickImageAsync(onSend)} name='photo' />
    <Button onPress={() => takePictureAsync(onSend)} name='camera' />
    <Button onPress={() => getLocationAsync(onSend)} name='my-location' />
    <Button onPress={isTyping} name='chat' />
  </View>
)

const styles = StyleSheet.create({
  container: {
    height: 44,
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0,0,0,0.3)',
  },
})

export default AccessoryBar