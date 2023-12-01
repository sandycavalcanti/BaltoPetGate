import { View, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import Avaliar from './Avaliar'
import Modal from 'react-native-modals'

const ModalAvaliar = (props) => {
    return (
        <Modal visible={props.val} onTouchOutside={() => props.set(false)}>
            <View style={styles.ContainerAvaliar} >
                <ScrollView style={{ flex: 1 }}>
                    <View>
                        <Avaliar TB_PESSOA_ID={props.TB_PESSOA_ID} TB_PESSOA_IDD={props.TB_PESSOA_IDD} />
                    </View>
                </ScrollView>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    ContainerAvaliar: {
        width: 320,
        minHeight: 200,
        backgroundColor: '#EFEFEF',
        borderColor: '#CF8989',
        borderWidth: 2,
        borderRadius: 6
    },
});

export default ModalAvaliar