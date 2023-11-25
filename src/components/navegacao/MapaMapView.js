import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import MapView, { Callout, Marker } from 'react-native-maps';
import { urlAPI } from '../../constants';
import Imagem from '../geral/Imagem';

const MapaMapView = (props) => {
    return (
        <MapView style={{ width: '100%', height: '100%' }} initialRegion={props.initialRegion} onPress={props.onPress ? props.onPress : null}>
            {props.pontosAlimentacao.map((coords, index) => {
                const diferencaEmMilissegundos = new Date() - new Date(coords.updatedAt);
                const diferencaEmDias = Math.floor(diferencaEmMilissegundos / (1000 * 60 * 60 * 24));
                const urlImg = urlAPI + 'selpontoalimentacaoimg/' + coords.id;
                return (
                    <Marker key={index} coordinate={coords} >
                        <Imagem url={urlImg} style={{ borderRadius: 125 }} />
                        <Callout style={styles.containerCallout}>
                            <Text style={styles.titleCallout}>Ponto de Alimentação de:</Text>
                            <Text style={styles.nameCallout}>{coords.nomePerfil}</Text>
                            <Text style={styles.textCallout}>Ativo há {diferencaEmDias} {diferencaEmDias == 1 ? 'dia' : 'dias'}</Text>
                        </Callout>
                    </Marker>
                )
            })}
        </MapView>
    )
}

const styles = StyleSheet.create({
    containerCallout: {
        minWidth: 175,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },
    titleCallout: {
        fontSize: 15
    },
    nameCallout: {
        fontSize: 18
    },
    textCallout: {
        marginTop: 20,
        fontSize: 16,
    },
});

export default MapaMapView