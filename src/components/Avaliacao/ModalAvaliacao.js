import { View, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { Modal } from "react-native-modals";
import Avaliacoes from './Avaliacoes'

const ModalAvaliacao = (props) => {
    return (
        <Modal visible={props.val} onTouchOutside={() => props.set(false)}>
            <View style={styles.ContainerAvaliacao} >
                <ScrollView style={{ flex: 1 }}>
                    <View>
                        {props.avaliacoes.Selecionar && props.avaliacoes.Selecionar.map((item, index) => <Avaliacoes key={index} data={item} />)}
                    </View>
                </ScrollView>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    ContainerAvaliacao: {
        width: 320,
        height: 500,
        backgroundColor: '#EFEFEF',
        borderColor: '#CF8989',
        borderWidth: 2,
        borderRadius: 6
    },
});

export default ModalAvaliacao