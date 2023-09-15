import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator, ImageBackground, TouchableOpacity, TextInput, TouchableWithoutFeedback, ToastAndroid } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { urlAPI, corBotaoCad, corFundoCad, corFundoCampoCad, corPlaceholderCad, corTextoBotaoCad, corBordaBoxCad } from "../../constants";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";


import JWT from 'expo-jwt';
import { chaveToken } from "../../constants";


const Login = ({ navigation: { navigate } }) => {
    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [carregando, setCarregando] = useState(false);

    const Logar = () => {
        if (!email || !senha) {
            alert("Insira seu email e senha.");
        } else {
            Autenticar();
        }
    };

    const Autenticar = async () => {
        await axios.post(urlAPI + 'login', {
            TB_PESSOA_EMAIL: email,
            TB_PESSOA_SENHA: senha,
        }).then(async (response) => {
            setCarregando(true);
            const TokenUsuario = response.data.token;
            await AsyncStorage.removeItem('token');
            await AsyncStorage.setItem('token', TokenUsuario);
            setTimeout(() => {
                navigation.reset({ index: 0, routes: [{ name: 'Menu' }] });
            }, 1500);
        }).catch(error => {
            let erro = error.response.data.message;
            ToastAndroid.show(erro, ToastAndroid.SHORT);
            setMensagem(erro);
        })
    };

    const [mostrarSenha, setMostrarSenha] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                style={styles.imagem}
                resizeMode="contain"
                source={require("../../../assets/img/Logo.png")}
            />
            {mensagem && <Text style={styles.mensagem}>{mensagem}</Text>}
            <View style={styles.containercampo}>
                {/* <FontAwesome5 name="user" size={25} /> */}
                <TextInput
                    onChangeText={(text) => setEmail(text)}
                    placeholderTextColor={corPlaceholderCad}
                    placeholder={"Email"}
                    style={styles.campo}
                />
            </View>
            <View style={styles.containersenha}>
                <View style={styles.containercamposenha}>
                    {/* <FontAwesome5 name="lock" size={25} /> */}
                    <View style={styles.caixacampo}>
                        <TextInput
                            onChangeText={(text) => setSenha(text)}
                            placeholderTextColor={corPlaceholderCad}
                            secureTextEntry={!mostrarSenha}
                            placeholder={"Senha"}
                            style={styles.campo}
                        />
                        <TouchableWithoutFeedback
                            onPress={() => setMostrarSenha(!mostrarSenha)}
                        >
                            {mostrarSenha ? (
                                <FontAwesome5 name="eye-slash" size={25} color="grey" style={{ marginRight: 15 }} />
                            ) : (
                                <FontAwesome5 name="eye" size={25} color="grey" style={{ marginRight: 15 }} />
                            )}
                        </TouchableWithoutFeedback>
                    </View>
                </View>

                <TouchableOpacity onPress={() => navigate("RecSenha")} style={{ alignSelf: "flex-end" }} >
                    <Text style={styles.esqueceu}>Esqueci minha senha</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={Logar} style={styles.botaologin}>
                <Text style={styles.textologin}> Entrar </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate("CadOpcao")}>
                <Text style={styles.textocad}> Não tenho uma conta</Text>
            </TouchableOpacity>

            {carregando &&
                <View style={styles.carregandoContainer}>
                    <View style={styles.carregando}>
                        <ActivityIndicator size="large" color={corBordaBoxCad} />
                    </View>
                </View>}

            <TouchableOpacity onPress={async () => {
                const TokenUsuario = await AsyncStorage.getItem('token');
                if (TokenUsuario == null) {
                    await AsyncStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUQl9QRVNTT0FfSUREIjoxNSwiVEJfVElQT19JREQiOjEsImlhdCI6MTY5NDcxMjMwMywiZXhwIjoxNjk5ODk2MzAzfQ.9fxNd1tW70-m3LXUVDD7nnb4IgH0cyoMgX78rhVtfaE');
                    setTimeout(() => {
                        navigation.reset({ index: 0, routes: [{ name: 'Menu' }] });
                    }, 1500);
                }
                navigate("Menu")
            }}>
                <Text>PULAR</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: corFundoCad,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
    },
    imagem: {
        height: 200,
        width: 200,
        marginBottom: 15,
    },
    botaologin: {
        width: "40%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: corBotaoCad,
        borderRadius: 15,
        marginTop: 30,
        marginBottom: 10,
        elevation: 5,
    },
    esqueceu: {
        color: "grey",
        fontSize: 16,
        alignSelf: "flex-end",
    },
    textologin: {
        color: corTextoBotaoCad,
        fontSize: 20,
    },
    textocad: {
        color: "#578d97",
        fontSize: 18,
    },
    containercampo: {
        display: "flex",
        flexDirection: "row",
        width: "90%",
        height: 45,
        margin: 10,
        justifyContent: "flex-start",
        alignItems: "center",
        marginVertical: 15,
        columnGap: 10,
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
        borderRadius: 20,
        marginVertical: 10,
    },
    caixacampo: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        borderRadius: 20,
        height: "100%",
        backgroundColor: corFundoCampoCad,
    },
    containersenha: {
        width: "90%",
        alignItems: "center",
        justifyContent: "center",
    },
    mensagem: {
        color: 'red',
    },
    carregandoContainer: {
        flex: 1,
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    carregando: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 75,
        height: 75,
        borderRadius: 100,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    }
});

export default Login;