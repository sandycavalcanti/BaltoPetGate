import React from 'react'
import { View, StyleSheet, Text, ScrollView} from 'react-native'
import { corTituloCad } from '../constants';

export const InfoChat = () => {
  return (
    <View style={styles.Container}>
        <ScrollView>
            <View style={styles.InfoHead}>
                <View style={styles.ImagemCirculo}>
                    {/* <Image /> */}
                </View>
                <Text style={styles.Titulo}>Nome da pessoa</Text>
            </View>
            <View style={styles.InfoPet}>
                <Text style={styles.TituloPet}>Doguinho</Text>
                <View style={styles.ImagemPet}></View>
            </View>
            <View  style={styles.InfoForm}>
            <Text style={styles.Titulo}>Formulario adoção</Text>
            <View style={styles.Questao}>
                <Text style={styles.Pergunta}>Toda a familia esta ciente e apoia a adoção?</Text>
                <View style={styles.Resposta}>
                    <Text>Resposta</Text>
                </View>
            </View><View style={styles.Questao}>
                <Text style={styles.Pergunta}>Toda a familia esta ciente e apoia a adoção?</Text>
                <View style={styles.Resposta}>
                    <Text>Resposta</Text>
                </View>
            </View><View style={styles.Questao}>
                <Text style={styles.Pergunta}>Toda a familia esta ciente e apoia a adoção?</Text>
                <View style={styles.Resposta}>
                    <Text>Resposta</Text>
                </View>
            </View><View style={styles.Questao}>
                <Text style={styles.Pergunta}>Toda a familia esta ciente e apoia a adoção?</Text>
                <View style={styles.Resposta}>
                    <Text>Resposta</Text>
                </View>
            </View>
            </View>
        </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
    Container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#B2EDC5',
    },
    InfoHead:{
        alignItems: 'center',
        width: '100%',
        flexDirection: 'column',
        display: 'flex',
    },
    ImagemCirculo: {
        width: 230,
        height: 230,
        borderRadius: 150,
        borderColor: '#fff',
        borderWidth: 1,
        alignItems: 'center',
        overflow: 'hidden',
        marginTop: 40
    },
    Titulo: {
        fontSize: 25,
        color: corTituloCad,
        marginBottom: 15,
        marginTop: 15,
    },
    InfoPet: {
        width: '100%',
        backgroundColor: '#B2EDC5',
        borderColor: 'white',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5,
      },
    ImagemPet: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderColor: '#fff',
        borderWidth: 1,
        alignItems: 'center',
        overflow: 'hidden',
        margin: 2
      },
      TituloPet: {
        fontSize: 20,
        color: corTituloCad,
        marginRight: 20
    },
    InfoForm:{
        alignItems: 'center'
    },
    Questao:{
        width: '100%',
        alignItems: 'center',
        borderColor: '#fff',
        borderBottomWidth: 1,
        padding:20
    },
    Pergunta:{
        fontSize:19,
        textAlign: 'center'
    },
    Resposta:{
        backgroundColor: "#fff",
        paddingHorizontal: 30,
        paddingVertical: 10,
        marginTop: 15,
        borderRadius: 15
    }
  });
export default InfoChat;