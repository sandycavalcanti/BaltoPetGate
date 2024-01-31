import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { urlAPI } from '../../constants';
import Imagem from '../geral/Imagem';

const GrupoContatos = (props) => {
    const navigation = useNavigation();

    return (
        <>
            {props.data.length !== 0 && <>
                <Text style={[styles.categoria, { opacity: props.desativado ? 0.5 : 1 }]}>{props.titulo}</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.contact}>
                        {props.data.map(pessoa => {
                            const Animais = pessoa.Animais;
                            return (
                                <TouchableOpacity key={pessoa.TB_CHAT_ID} onPress={() => navigation.navigate('Chat', { TB_CHAT_ID: pessoa.TB_CHAT_ID, TB_PESSOA_ID: pessoa.TB_PESSOA_ID })}>
                                    <View style={styles.containerContato}>
                                        <View>
                                            <Imagem id={pessoa.TB_PESSOA_ID} existe={pessoa.TB_PESSOA_POSSUI_IMG} desativado={props.desativado} style={styles.contactImage} />
                                            {Animais.length == 1 ?
                                                <Image resizeMode='cover' source={{ uri: urlAPI + 'selanimalimg/' + Animais[0].TB_ANIMAL_ID }} style={styles.animalImage} />
                                                : Animais.length > 1 &&
                                                <View style={[styles.animalImage, { borderWidth: 0 }]}>
                                                    <Image resizeMode='cover' source={{ uri: urlAPI + 'selanimalimg/' + Animais[0].TB_ANIMAL_ID }} style={[styles.twoAnimalImage, { top: 0, left: 0 }]} />
                                                    <Image resizeMode='cover' source={{ uri: urlAPI + 'selanimalimg/' + Animais[1].TB_ANIMAL_ID }} style={[styles.twoAnimalImage, { bottom: 0, right: 0 }]} />
                                                </View>
                                            }
                                        </View>
                                        <Text style={[styles.contactName, { opacity: props.desativado ? 0.5 : 1 }]}>{pessoa.TB_PESSOA_NOME_PERFIL}</Text>
                                    </View>

                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </ScrollView>
            </>}
        </>
    )
}

const styles = StyleSheet.create({
    contact: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    categoria: {
        fontSize: 20,
        color: '#fafafa',
        marginLeft: 20,
        marginTop: 10
    },
    containerContato: {
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        marginLeft: 10,
    },
    contactImage: {
        width: 80,
        height: 80,
        borderRadius: 100,
        borderColor: 'white',
        borderWidth: 1,
    },
    contactName: {
        width: 90,
        paddingVertical: 6,
        fontSize: 18,
        color: "#697C55",
        textAlign: 'center'
    },
    animalImage: {
        width: 40,
        height: 40,
        aspectRatio: 1,
        position: 'absolute',
        bottom: -5,
        right: -5,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 100
    },
    twoAnimalImage: {
        width: 32,
        height: 32,
        aspectRatio: 1,
        position: 'absolute',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 100
    }
});
export default GrupoContatos