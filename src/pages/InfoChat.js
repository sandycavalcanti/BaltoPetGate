import React from 'react'
import { View, StyleSheet, Text, ScrollView, ImageBackground} from 'react-native'
import { corTituloCad } from '../constants';
import BotaoCadastrar from '../components/cadastro/BotaoCadastrar';
import BotaoNegar from '../components/InfoChat/BotaoNegar';
import BotaoAceitar from '../components/InfoChat/BotaoAceitar';
import Questao from '../components/InfoChat/Questao';

export const InfoChat = () => {
  return (
    <View style={styles.Container}>
        <ScrollView>
            <View style={styles.InfoHead}>
                <View style={styles.ImagemCirculo}>
                </View>
                <Text style={styles.Titulo}>Nome da pessoa</Text>
            </View>
            <View style={styles.InfoPet}>
                <Text style={styles.TituloPet}>Doguinho</Text>
                <View style={styles.ImagemPet}>
                    
                </View>
            </View>
            <View  style={styles.InfoForm}>
            <Text style={styles.Titulo}>Formulario adoção</Text>
            <Questao texto='uma ótima pergunta' resposta='foi mesmo'/>
            <Questao texto='uma ótima pergunta' resposta='foi mesmo'/>
            <Questao texto='uma ótima pergunta' resposta='foi mesmo'/>
            <Questao texto='uma ótima pergunta' resposta='foi mesmo'/>
            <Questao texto='uma ótima pergunta' resposta='foi mesmo'/>
            <Questao texto='uma ótima pergunta' resposta='foi mesmo'/>
            <View style={styles.Botoes}>
                <BotaoAceitar texto='Aceitar solicitação de adoção'></BotaoAceitar>
                <BotaoNegar texto='Negar solicitação de adoção'></BotaoNegar>
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
        backgroundColor: '#D1BBB2',
    },
    InfoHead:{
        alignItems: 'center',
        width: '100%',
        flexDirection: 'column',
        display: 'flex',
        backgroundColor: '#A9DDAE',
    },
    ImagemCirculo: {
        width: 230,
        height: 230,
        borderRadius: 150,
        borderColor: '#fff',
        borderWidth: 2,
        alignItems: 'center',
        overflow: 'hidden',
        marginTop: 40
    },
    Titulo: {
        fontSize: 25,
        color: '#fff',
        marginBottom: 15,
        marginTop: 15,
    },
    InfoPet: {
        width: '100%',
        backgroundColor: "#CC8F8F",
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
        color: '#fff',
        marginRight: 20
    },
    InfoForm:{
        alignItems: 'center'
    },
    Botoes:{
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 20
    }
  });
export default InfoChat;
