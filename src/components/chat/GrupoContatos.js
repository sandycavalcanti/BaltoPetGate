import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import Contato from './Contato';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const GrupoContatos = (props) => {
    const navigation = useNavigation();

    return (
        <>
            {props.data.length !== 0 && <>
                <Text style={[styles.categoria, { opacity: props.desativado ? 0.5 : 1 }]}>{props.titulo}</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.contact}>
                        {props.data.map((pessoa) => (
                            <TouchableOpacity key={pessoa.TB_PESSOA_ID} onPress={() => navigation.navigate('Chat', { TB_CHAT_ID: pessoa.TB_CHAT_ID, TB_PESSOA_ID: pessoa.TB_PESSOA_ID })}>
                                <Contato id={pessoa.TB_PESSOA_ID} nome={pessoa.TB_PESSOA_NOME_PERFIL} desativado={props.desativado ? true : false} />
                            </TouchableOpacity>
                        ))}
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
});
export default GrupoContatos