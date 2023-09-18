import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Touchable, View, ToastAndroid, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Avatar, Button } from 'react-native-paper';
import { TouchableHighlight } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const MyTouchableHighlight = (props) => {
  const child = React.Children.only(props.children);
  return (
    <TouchableHighlight {...props}>
      {child}
    </TouchableHighlight>
  );
};

export default function App() {
  const [Pic, SetPic] = React.useState('');
  //For show toast msg
  const setToasMsg = msg => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };

  const uploadImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      setToasMsg('Permission to access camera roll is required!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      SetPic(result.base64);
    }
  };

  const removeImage = () => {
    SetPic('')
    setToasMsg('Imagem removida');
  }

  return (
    <View style={styles.centerContent}>
      <View>
        <MyTouchableHighlight
          onPress={() => uploadImage()}
          underlayColor="rgba(0,0,0,0)"
        >
          <Avatar.Image size={250} source={{ uri: 'data:image/png;base64,' + Pic }} />
        </MyTouchableHighlight>
      </View>
      <View style={[styles.centerContent, { marginTop: 25, flexDirection: 'row' }]}>
        <Button mode="contained" onPress={() => uploadImage()}>
          Upload Image
        </Button>

        <Button 
        mode="contained" 
        style={{marginLeft: 20}}
        onPress={() => removeImage()}>
          Remove Image
        </Button>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
});