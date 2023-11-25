import { View, Text, TextInput, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const Campo = (props) => {
    const onChangeText = (text) => {
        if (props.setRef) {
            props.setRef.current = text;
        } else {
            props.set(text);
        }
    }
    return (
        <View style={[props.styleView]}>
            <TextInput onChangeText={onChangeText} placeholderTextColor={"#8EBF81"}
                style={styles.campo} {...props} />
            {!props.opcional && <Text style={styles.asterisco}>*</Text>}
        </View>
    )
}
const styles = StyleSheet.create({
    campo: {
        flex: 1,
        fontSize: 18,
        paddingHorizontal: 10,
    },
    asterisco: {
        position: 'absolute',
        fontSize: 25,
        color: 'red',
        right: 5,
        bottom: 0,
    },
});

Campo.propTypes = {
    placeholder: PropTypes.string,
    set: PropTypes.func,
    setRef: PropTypes.object,
    opcional: PropTypes.bool,
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    styleView: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}

export default Campo