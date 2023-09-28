import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native';
import axios from 'axios';
import { urlLocal } from '../constants';

export default function App() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const Enviar = async () => {
    const formData = new global.FormData();
    formData.append(
      "image", { name: "image.jpeg", type: "image/jpg", uri: image }
    )
    console.log(formData)
    return fetch(urlLocal + 'upload', {
      method: "PUT",
      // Needs this header
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData
    }).then(response => {
      // console.log(response)
    })
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Button title="Enviar" onPress={Enviar} />
    </View>
  );
}
