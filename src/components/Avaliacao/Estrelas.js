import { AntDesign } from '@expo/vector-icons'
import { View, TouchableOpacity, StyleSheet } from 'react-native'

const Estrelas = (props) => {
    const Nota = Math.round(props.avaliacoes.media)
    const possuiAvaliacoes = Object.keys(props.avaliacoes).length !== 0;
    return (
        <>
            {possuiAvaliacoes ?
                <TouchableOpacity onPress={() => props.set(true)}>
                    <View style={styles.ratingContainer}>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <AntDesign key={index} name={index < Nota ? 'star' : 'staro'} size={18} color={index < Nota ? 'gold' : 'gray'} />
                        ))}
                    </View>
                </TouchableOpacity>
                :
                <View style={styles.ratingContainer}>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <AntDesign key={index} name={'star'} size={18} color={'#ddd'} />
                    ))}
                </View>
            }
        </>
    )
}

const styles = StyleSheet.create({
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
});


export default Estrelas