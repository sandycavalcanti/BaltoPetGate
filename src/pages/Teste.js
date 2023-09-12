import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';

const App = () => {

    return (
        <ScrollView >
            <View style={{ height: 1000, backgroundColor: '#f0f', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 30 }}>TESSTTE</Text>
            </View>
            {/* Adicione o conteúdo da sua página aqui */}
        </ScrollView>
    );
};

export default App;
