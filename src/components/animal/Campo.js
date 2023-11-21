import { View, Text, TextInput, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const Campo = (props) => {
    return (
        <View>
            <TextInput onChangeText={text => props.set(text)} placeholderTextColor={"#8EBF81"}
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
        right: -10,
        top: -5,
        bottom: 0,
    },
});

Campo.propTypes = {
    placeholder: PropTypes.string,
    set: PropTypes.func,
    opcional: PropTypes.bool,
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default Campo