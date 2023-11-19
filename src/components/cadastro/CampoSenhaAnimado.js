import React, { useEffect, useState } from 'react';
import { FontAwesome5 } from "@expo/vector-icons";
import { View, Text, StyleSheet, TouchableWithoutFeedback, Animated, Easing } from 'react-native';
import { corDicaCad, corFundoCampoCad, corPlaceholderCad, valorBordaCampoCad } from '../../constants';
import PropTypes from 'prop-types';
import { Hoshi } from 'react-native-textinput-effects';

const CampoSenhaAnimado = (props) => {
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [focus1, setFocus1] = useState(false);
    const [focus2, setFocus2] = useState(false);
    const [marginTopAnimation1] = useState(new Animated.Value(5));
    const [marginTopAnimation2] = useState(new Animated.Value(5));
    const [dicaAnimation] = useState(new Animated.Value(0));
    const [mostrarDica, setMostrarDica] = useState(false);

    const onChangeText = (text, type) => {
        const setRef = type === 1 ? props.setRef1 : props.setRef2;
        setRef.current = text;
    }

    const configureAnimation = (animation, focusState, setFocusState) => {
        useEffect(() => {
            Animated.timing(animation, {
                toValue: focusState ? 20 : 5,
                duration: 200,
                easing: Easing.ease,
                useNativeDriver: false,
            }).start();
        }, [focusState, animation]);
    };

    const configureDicaAnimation = (animation, show) => {
        useEffect(() => {
            if (show) {
                setMostrarDica(true)
            } else {
                setTimeout(() => {
                    setMostrarDica(false)
                }, 200);
            }
            Animated.timing(animation, {
                toValue: show ? 1 : 0,
                duration: 200,
                easing: Easing.ease,
                useNativeDriver: false,
            }).start();
        }, [show, animation]);
    };

    configureAnimation(marginTopAnimation1, focus1, setFocus1);
    configureAnimation(marginTopAnimation2, focus2, setFocus2);
    configureDicaAnimation(dicaAnimation, focus1);

    return (
        <View style={styles.containercampo}>
            {[1, 2].map((type) => (
                <Animated.View key={type} style={[styles.containersenha, { marginTop: type === 1 ? marginTopAnimation1 : marginTopAnimation2 }]}>
                    <View style={styles.caixacampo}>
                        <Hoshi
                            label={type === 1 ? "Senha" : "Confirmação de senha"}
                            borderColor={corPlaceholderCad}
                            borderHeight={1}
                            inputStyle={{ fontWeight: '600' }}
                            labelStyle={[styles.labelStyle, { display: (type === 1 ? props.setRef1.current : props.setRef2.current) && !(type === 1 ? focus1 : focus2) ? 'none' : 'flex', paddingHorizontal: (type === 1 ? focus1 : focus2) ? 10 : 0 }]}
                            style={{ bottom: 4, width: '78%', borderBottomColor: 'transparent', marginLeft: -5 }}
                            onChangeText={(text) => onChangeText(text, type)}
                            onFocus={() => (type === 1 ? setFocus1 : setFocus2)(true)}
                            onBlur={() => (type === 1 ? setFocus1 : setFocus2)(false)}
                            secureTextEntry={!mostrarSenha}
                        />
                        <TouchableWithoutFeedback onPress={() => setMostrarSenha(!mostrarSenha)}>
                            {mostrarSenha ? <FontAwesome5 name="eye-slash" size={25} color="grey" style={{ right: -22 }} />
                                : <FontAwesome5 name="eye" size={25} color="grey" style={{ right: -22 }} />}
                        </TouchableWithoutFeedback>
                        <Text style={styles.asterisco}>*</Text>
                    </View>
                </Animated.View>
            ))}
            {mostrarDica &&
                <Animated.Text style={[styles.dica, { opacity: dicaAnimation, transform: [{ translateY: dicaAnimation.interpolate({ inputRange: [0, 1], outputRange: [-20, 0] }) }] }]}>
                    A senha deve possuir no mínimo 8 caracteres, incluindo um número
                </Animated.Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    containercampo: {
        width: '95%',
    },
    containersenha: {
        flexDirection: "row",
        width: "100%",
        height: 40,
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: 5,
    },
    asterisco: {
        position: 'absolute',
        fontSize: 25,
        color: 'red',
        right: 10,
        bottom: 1
    },
    dica: {
        fontSize: 15,
        color: corDicaCad,
        textAlign: 'center',
        marginTop: 4,
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
    labelStyle: {
        color: corPlaceholderCad,
        fontSize: 18,
        borderRadius: 15,
        backgroundColor: corFundoCampoCad,
    },
});

CampoSenhaAnimado.propTypes = {
    setRef1: PropTypes.object,
    setRef2: PropTypes.object,
}

export default CampoSenhaAnimado;