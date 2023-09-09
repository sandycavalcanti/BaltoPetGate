import { useState } from 'react';
import { FontAwesome5 } from "@expo/vector-icons";
import { View, Text, TextInput, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { corDicaCad, corFundoCampoCad, corPlaceholderCad, valorBordaCampoCad } from '../../constants';

const CampoSenha = (props) => {
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [textoDica, setTextoDica] = useState(false);
    return (
        <View style={styles.containercampo}>
            <View style={styles.containersenha}>
                <View style={styles.caixacampo}>
                    <TextInput onChangeText={(text) => props.set1(text)} placeholderTextColor={corPlaceholderCad} secureTextEntry={!mostrarSenha} placeholder={"Senha"} style={styles.campo} onFocus={() => setTextoDica(true)} onBlur={() => setTextoDica(false)} />
                    <TouchableWithoutFeedback onPress={() => setMostrarSenha(!mostrarSenha)}>
                        {mostrarSenha ? (
                            <FontAwesome5 name="eye-slash" size={25} color="grey" style={{ marginRight: 30 }} />
                        ) : (
                            <FontAwesome5 name="eye" size={25} color="grey" style={{ marginRight: 30 }} />
                        )}
                    </TouchableWithoutFeedback>
                    <Text style={styles.asterisco}>*</Text>
                </View>
            </View>
            <View style={styles.containersenha}>
                <View style={styles.caixacampo}>
                    <TextInput onChangeText={(text) => props.set2(text)} placeholderTextColor={corPlaceholderCad} secureTextEntry={!mostrarSenha} placeholder={"Confirmação de senha"} style={styles.campo} />
                    <TouchableWithoutFeedback onPress={() => setMostrarSenha(!mostrarSenha)}>
                        {mostrarSenha ? (
                            <FontAwesome5 name="eye-slash" size={25} color="grey" style={{ marginRight: 30 }} />
                        ) : (
                            <FontAwesome5 name="eye" size={25} color="grey" style={{ marginRight: 30 }} />
                        )}
                    </TouchableWithoutFeedback>
                    <Text style={styles.asterisco}>*</Text>
                </View>
            </View>
            {textoDica && <Text style={styles.dica}>A senha deve possuir no mínimo 8 caracteres, um número e uma letra maíscula</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    containercampo: {
        width: '95%',
    },
    containersenha: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: 40,
        justifyContent: "flex-start",
        alignItems: "center",
        marginVertical: 5,
        columnGap: 10,
    },
    campo: {
        width: '100%',
        fontSize: 18,
        paddingHorizontal: 10,
        padding: 5,
        backgroundColor: corFundoCampoCad,
        borderRadius: valorBordaCampoCad,
        marginVertical: 5,
    },
    asterisco: {
        position: 'absolute',
        fontSize: 25,
        color: 'red',
        right: 10,
        bottom: 1
    },
    dica: {
        fontSize: 14,
        color: corDicaCad,
        textAlign: 'center',
    },
    containercamposenha: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: 45,
        margin: 10,
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 15,
        columnGap: 10,
    },
    campo: {
        flex: 1,
        fontSize: 18,
        height: "100%",
        paddingHorizontal: 10,
        padding: 5,
        backgroundColor: corFundoCampoCad,
        borderRadius: valorBordaCampoCad,
        marginVertical: 10,
    },
    caixacampo: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        borderRadius: valorBordaCampoCad,
        height: "100%",
        backgroundColor: corFundoCampoCad,
    },
    mensagem: {
        color: 'red',
    }
});

export default CampoSenha