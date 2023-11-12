import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
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
                        {props.data.map((pessoa) => {
                            const urlImg = urlAPI + 'selpessoaimg/' + pessoa.TB_PESSOA_ID;

                            return (
                                <TouchableOpacity key={pessoa.TB_PESSOA_ID} onPress={() => navigation.navigate('Chat', { TB_CHAT_ID: pessoa.TB_CHAT_ID, TB_PESSOA_ID: pessoa.TB_PESSOA_ID })}>
                                    <View style={styles.containerContato}>
                                        <Imagem url={urlImg} desativado={props.desativado} style={styles.contactImage} />
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
        borderRadius: 250,
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
});
export default GrupoContatos