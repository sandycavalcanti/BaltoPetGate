import { View, Text, StyleSheet } from 'react-native';
import { corBordaBoxCad, corFundoCad, corTituloBoxCad } from '../../constants';
import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const GroupBox = (props) => {
    const text = props.titulo;
    const textRef = useRef(null);
    const [lineCount, setLineCount] = useState(1);

    useEffect(() => {
        const lineHeight = 30;

        if (textRef.current) {
            textRef.current.measure((x, y, width, height, pageX, pageY) => {
                const estimatedLineCount = Math.ceil(height / lineHeight);
                setLineCount(estimatedLineCount);
            });
        }
    }, [textRef.current]);
    
    return (
        <View style={[styles.groupBox, {alignItems: props.esquerda ? 'flex-start':'center', borderColor: props.corBorda ? props.corBorda : corBordaBoxCad, paddingTop: lineCount == 2 ? 40 : 10 }]}>
            <Text style={[styles.titulo, {textAlign: props.esquerda ? 'left':'center', left:props.esquerda ? 10:0, color: props.corTexto ? props.corTexto : corTituloBoxCad, backgroundColor: props.corFundoTexto ? props.corFundoTexto : corFundoCad, top: lineCount == 2 ? -25 : -20 }]} ref={textRef}>{text}</Text>
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
    titulo: {
        fontSize: 22,
        color: corTituloBoxCad,
        position: 'absolute',
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

GroupBox.propTypes = {
    titulo: PropTypes.string
}

export default GroupBox