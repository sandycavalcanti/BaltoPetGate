import { View, Text, StyleSheet } from 'react-native';
import { corBordaBoxCad, corFundoCad, corTituloBoxCad } from '../../constants';
import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const GroupBox = (props) => {
    const text = props.titulo;
    const textRef = useRef(null);
    const [lineCount, setLineCount] = useState(1);

    useEffect(() => {
        const lineHeight = 40;

        if (textRef.current) {
            textRef.current.measure((x, y, width, height, pageX, pageY) => {
                const estimatedLineCount = Math.ceil(height / lineHeight);
                setLineCount(estimatedLineCount);
            });
        }
    }, [textRef.current]);

    return (
        <View style={[styles.groupBox, {
            alignItems: props.esquerda ? 'flex-start' : 'center',
            borderColor: props.corBorda ? props.corBorda : corBordaBoxCad,
            paddingTop: lineCount == 3 ? 70 : lineCount == 2 ? 40 : 10
        }]}>
            <View style={[styles.viewTitulo, {
                textAlign: props.esquerda ? 'left' : 'center',
                left: props.esquerda ? 10 : null,
                backgroundColor: props.corFundoTexto ? props.corFundoTexto : corFundoCad,
                top: lineCount == 2 ? -25 : -20,
            }]}>
                <Text style={[styles.titulo, {
                    textAlign: props.esquerda ? 'left' : 'center',
                    color: props.corTexto ? props.corTexto : corTituloBoxCad,
                }]} ref={textRef}>{text}</Text>
                {props.asterisco && <Text style={styles.asterisco}> *</Text>}
            </View>
            {props.children}
        </View>
    );
};

const styles = StyleSheet.create({
    groupBox: {
        justifyContent: 'center',
        width: '90%',
        paddingBottom: 10,
        borderWidth: 2,
        borderRadius: 10,
        marginVertical: 20,
        position: 'relative',
    },
    viewTitulo: {
        position: 'absolute',
        marginBottom: 10,
        paddingHorizontal: 10,
        flexDirection: 'row'
    },
    titulo: {
        fontSize: 22,
        color: corTituloBoxCad
    },
    asterisco: {
        color: 'red',
        fontSize: 22,
    }
});

GroupBox.propTypes = {
    titulo: PropTypes.string,
    esquerda: PropTypes.bool,
    corBorda: PropTypes.string,
    corTexto: PropTypes.string,
    corFundoTexto: PropTypes.string,
    asterisco: PropTypes.bool
}

export default GroupBox