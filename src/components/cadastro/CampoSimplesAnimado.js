import { View, Text, TextInput, StyleSheet, Animated, Easing } from 'react-native';
import { corFundoCampoCad, corPlaceholderCad, valorBordaCampoCad } from '../../constants';
import PropTypes from 'prop-types';
import { Hoshi } from 'react-native-textinput-effects';
import { useState, useEffect, useRef } from 'react';

const CampoSimplesAnimado = (props) => {
    const [focus, setFocus] = useState(false);
    const [marginTopAnimation] = useState(new Animated.Value(5));

    useEffect(() => {
        Animated.timing(marginTopAnimation, {
            toValue: focus ? 20 : 5,
            duration: 200,
            easing: Easing.ease,
            useNativeDriver: false,
        }).start();
    }, [focus, marginTopAnimation]);

    const onChangeText = (text) => {
        props.setRef.current = text;
    }

    const exibirLabel = ((props.setRef.current || props.val) && !focus);
    
    return (
        <Animated.View style={[styles.containercampo, { height: (props.multiline && !exibirLabel && focus) ? 60 : 35, marginTop: marginTopAnimation }]}>
            <Hoshi
                label={props.placeholder}
                borderColor={corPlaceholderCad}
                borderHeight={1}
                inputStyle={{ fontWeight: '600' }}
                labelStyle={[styles.labelStyle, { display: exibirLabel ? 'none' : 'flex', paddingHorizontal: focus ? 10 : 0, bottom: props.multiline && exibirLabel ? 15 : 0 }]}
                style={[styles.inputContainer, { width: !props.opcional ? '90%' : '94%' }]}
                onChangeText={onChangeText}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                keyboardType={props.keyboardType}
                defaultValue={props.val?.toString()}
                multiline={props.multiline}
                autoCapitalize={props.autoCapitalize ? props.autoCapitalize : 'none'}
            />
            {!props.opcional && <Text style={styles.asterisco}>*</Text>}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    containercampo: {
        width: '95%',
        borderRadius: valorBordaCampoCad,
        backgroundColor: corFundoCampoCad,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: "center",
        marginBottom: 5
    },
    labelStyle: {
        color: corPlaceholderCad,
        fontSize: 18,
        borderRadius: 15,
        backgroundColor: corFundoCampoCad,
    },
    asterisco: {
        position: 'absolute',
        fontSize: 25,
        color: 'red',
        right: 10,
    },
    inputContainer: {
        borderBottomColor: 'transparent',
        marginLeft: -5,
        bottom: 4,
    }
});

CampoSimplesAnimado.propTypes = {
    setRef: PropTypes.object,
    val: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    opcional: PropTypes.bool,
    placeholder: PropTypes.string,
    keyboardType: PropTypes.string,
    multiline: PropTypes.bool,
    autoCapitalize: PropTypes.string
};

export default CampoSimplesAnimado;
