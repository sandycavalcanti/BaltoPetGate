import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { getLocationAsync, pickImageAsync, takePictureAsync } from './mediaUtils';
import { AntDesign } from '@expo/vector-icons';

const CustomActions = ({ renderIcon, iconTextStyle, containerStyle, wrapperStyle, onSend }) => {
  const { showActionSheetWithOptions } = useActionSheet();

  const onActionsPress = useCallback(() => {
    const options = [
      'Enviar Imagem',
      'Tirar Foto',
      'Enviar Localização',
      'Cancelar',
    ];
    const cancelButtonIndex = options.length - 1;
    showActionSheetWithOptions(
      { options, cancelButtonIndex },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            pickImageAsync(onSend);
            return;
          case 1:
            takePictureAsync(onSend);
            return;
          case 2:
            getLocationAsync(onSend);
            return;
        }
      }
    );
  }, [showActionSheetWithOptions]);

  const renderIconComponent = useCallback(() => {
    if (renderIcon) {
      return renderIcon();
    }
    return (
      <AntDesign name="plussquareo" size={35} color="#fafafa" style={wrapperStyle} />
    );
  }, []);

  return (
    <TouchableOpacity style={[styles.container, containerStyle]} onPress={onActionsPress}>
      <>{renderIconComponent()}</>
    </TouchableOpacity>
  );
};

export default CustomActions;

const styles = StyleSheet.create({
  container: {
    width: 35,
    height: 35,
    marginLeft: 10,
    marginBottom: 7,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});

CustomActions.defaultProps = {
  onSend: () => { },
  options: {},
  renderIcon: null,
  containerStyle: {},
  wrapperStyle: {},
  iconTextStyle: {},
};
