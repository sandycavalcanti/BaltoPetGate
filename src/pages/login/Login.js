import { StyleSheet, Text, View, ActivityIndicator, ImageBackground, TouchableOpacity, Pressable, KeyboardAvoidingView, StatusBar } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRef, useState } from "react";
import { urlAPI, corFundoCad, corFundoCampoCad, corPlaceholderCad, corBordaBoxCad, corRosaFraco } from "../../constants";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AlertPro from "react-native-alert-pro";
import BotaoCadastrarAnimado from "../../components/cadastro/BotaoCadastrarAnimado";
import { Sae } from "react-native-textinput-effects";
import OcticonsIcon from "react-native-vector-icons/Octicons";
import ValidarCamposCad from "../../utils/ValidarCamposCad";
import CatchError from "../../utils/CatchError";
import Mensagem from "../../components/cadastro/Mensagem";

const corPlaceholderAtivo = '#fff'

const Login = () => {
    const navigation = useNavigation();
    const email = useRef('');
    const senha = useRef('');
    const [mensagem, setMensagem] = useState({});
    const [carregando, setCarregando] = useState(false);
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [colorEmail, setColorEmail] = useState(corPlaceholderCad);
    const [colorSenha, setColorSenha] = useState(corPlaceholderCad);
    const numeroTentativas = useRef(0);
    const alertRef = useRef(null);
    const [textoAlert, setTextoAlert] = useState('');
    const [desativado, setDesativado] = useState(false);

    const Logar = () => {
        setMensagem({ color: '#fafafa', text: 'Verificando...' })
        const mensagem = VerificarCampos();
        if (mensagem) { // Se houver algum campo inválido
            setTextoAlert(mensagem);
            alertRef.current.open();
            setMensagem(null);
        } else {
            if (numeroTentativas.current >= 10) { // Bloquear tentativas caso houverem 10
                numeroTentativas.current = 0;
                setDesativado(true);
                alert("Muitas tentativas realizadas, espere por 30 segundos");
                setTimeout(() => {
                    setDesativado(false);
                }, 30000);
                return;
            }
            numeroTentativas.current += 1;
            Autenticar();
        }
    };

    const VerificarCampos = () => {
        if (!email.current && !senha.current) {
            return 'Email e senha não informados';
        }
        let mensagem = '';
        if (!email.current) {
            mensagem += 'Email não informado';
        } else {
            const ValidarEmail = ValidarCamposCad([], { email: email.current })
            if (ValidarEmail) {
                mensagem += 'Email inválido\n';
            }
        }
        if (!senha.current) {
            mensagem += 'Senha não informada';
        }
        return mensagem;
    }

    const Autenticar = async () => {
        await axios.post(urlAPI + 'login', {
            TB_PESSOA_EMAIL: email.current,
            TB_PESSOA_SENHA: senha.current,
        }).then(async response => {
            setMensagem({ color: '#fafafa', text: 'Login realizado!' })
            setCarregando(true);
            const TokenUsuario = response.data.token;
            await AsyncStorage.setItem('token', TokenUsuario);
            navigation.reset({ index: 0, routes: [{ name: 'Menu' }] });
        }).catch(error => CatchError(error, false, () => setMensagem({ color: 'red', text: 'Houve um erro' }), () => setMensagem({ color: 'red', text: error.response.data.message })));
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior='padding'>
            <ImageBackground style={styles.imagem} resizeMode="contain" source={require("../../../assets/img/Logo.png")} />
            <Mensagem mensagem={mensagem} style={{ marginBottom: 20, fontSize: 16 }} />
            <View style={styles.containercampo}>
                <Sae
                    label={"Email"}
                    iconClass={OcticonsIcon}
                    iconName={"pencil"}
                    iconColor={"#ccc"}
                    iconSize={25}
                    onFocus={() => setColorEmail(corPlaceholderAtivo)}
                    onEndEditing={() => { if (!email.current) setColorEmail(corPlaceholderCad) }}
                    labelStyle={{ color: colorEmail, fontWeight: colorEmail == corPlaceholderCad ? 'normal' : 'bold', fontSize: 20, paddingBottom: 5 }}
                    inputStyle={styles.inputStyle}
                    style={{ width: '95%', marginBottom: 30, marginHorizontal: 10 }}
                    onChangeText={text => email.current = text}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
            </View>
            <View style={styles.containersenha}>
                <View style={styles.caixacampo}>
                    <Sae
                        label={"Senha"}
                        iconClass={OcticonsIcon}
                        iconName={"pencil"}
                        iconColor={"#ccc"}
                        iconSize={25}
                        onFocus={() => setColorSenha(corPlaceholderAtivo)}
                        onEndEditing={() => { if (!senha.current) setColorSenha(corPlaceholderCad) }}
                        labelStyle={{ color: colorSenha, fontWeight: colorSenha == corPlaceholderCad ? 'normal' : 'bold', fontSize: 20, paddingBottom: 5 }}
                        inputStyle={styles.inputStyle}
                        style={{ flex: 1, marginBottom: 30, marginHorizontal: 10 }}
                        onChangeText={text => senha.current = text}
                        secureTextEntry={!mostrarSenha}
                        onSubmitEditing={Logar}
                        autoCapitalize="none"
                    />
                    <Pressable onPress={() => setMostrarSenha(prev => !prev)}>
                        {mostrarSenha ?
                            <FontAwesome5 name="eye-slash" size={25} color="grey" style={{ marginRight: 15 }} />
                            :
                            <FontAwesome5 name="eye" size={25} color="grey" style={{ marginRight: 15 }} />
                        }
                    </Pressable>
                </View>

                <TouchableOpacity onPress={() => navigation.navigate("RecSenha")} style={{ alignSelf: "flex-end" }} >
                    <Text style={styles.esqueceu}>Esqueci minha senha</Text>
                </TouchableOpacity>

            </View>

            <BotaoCadastrarAnimado onPress={Logar} texto={'Entrar'} marginBottom={5} disabled={desativado} />
            <TouchableOpacity onPress={() => navigation.navigate("CadOpcao")}>
                <Text style={styles.textocad}>Não tenho uma conta</Text>
            </TouchableOpacity>
            <AlertPro
                ref={alertRef}
                onConfirm={() => alertRef.current.close()}
                title="Insira seu email e senha."
                message={textoAlert}
                showCancel={false}
                textConfirm="OK"
                customStyles={{ buttonConfirm: { backgroundColor: corRosaFraco } }}
            />
            {carregando &&
                <View style={styles.carregandoContainer}>
                    <View style={styles.carregando}>
                        <ActivityIndicator size="large" color={corBordaBoxCad} />
                    </View>
                </View>}
            <StatusBar animated hidden={false} backgroundColor={corFundoCad} />
        </KeyboardAvoidingView>
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
    esqueceu: {
        color: "grey",
        fontSize: 16,
        alignSelf: "flex-end",
    },
    textocad: {
        marginTop: 10,
        color: "#578d97",
        fontSize: 18,
    },
    containercampo: {
        backgroundColor: corFundoCampoCad,
        height: 45,
        borderRadius: 20,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containersenha: {
        width: "90%",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 20
    },
    caixacampo: {
        width: "100%",
        height: 45,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        borderRadius: 20,
        backgroundColor: corFundoCampoCad,
        marginTop: 15,
        marginBottom: 10,
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
    inputStyle: {
        color: '#000',
        fontSize: 18
    },
    mensagem: {
        color: 'red',
        marginBottom: 15
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