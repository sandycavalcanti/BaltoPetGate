import { View, StyleSheet, SafeAreaView, Image } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { corBordaBoxCad, corFundo } from '../../constants';
import PropTypes from 'prop-types';

const Carregando = (props) => {

    return (
        <>
            {props.carregando &&
                <View style={styles.Container}>
                    <Image source={require('../../../assets/img/splash.png')} style={styles.ImagemFundo} />
                    <View style={styles.ContainerContent}>
                        <ActivityIndicator size="large" color={corBordaBoxCad} />
                    </View>
                </View>}
        </>
    );
};

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: corFundo,
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        zIndex: 30,
    },
    ImagemFundo: {
        flex: 1,
        resizeMode: 'cover',
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    ContainerContent: {
        flex: 1,
        zIndex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

Carregando.propTypes = {
    carregando: PropTypes.bool
}

export default Carregando;