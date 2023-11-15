import { Text, TouchableOpacity, StyleSheet, View, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Octicons, Feather, Ionicons } from '@expo/vector-icons';
import { corFundoNavegacao } from '../../constants';
import Home from './Home';
import Explorar from './Explorar';
import Mapa from './Mapa';
import Animal from './Animal';
import HeaderExplorar from '../../components/navegacao/HeaderExplorar';

const Tab = createBottomTabNavigator();

const Menu = ({ navigation: { navigate } }) => {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Tab.Navigator screenOptions={{ tabBarStyle: styles.container, header: () => <HeaderExplorar />, tabBarShowLabel: false, title: '' }} >
                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        tabBarIcon: () => <Octicons name="home" size={30} color="white" />,
                    }} />
                <Tab.Screen
                    name="Explorar"
                    component={Explorar}
                    options={{
                        tabBarIcon: () => <Ionicons name="search-sharp" size={35} color="white" />,
                    }} />
                <Tab.Screen
                    name="Mapa"
                    component={Mapa}
                    options={{
                        tabBarIcon: () => <Feather name="map-pin" size={30} color="white" />,
                    }} />
                <Tab.Screen
                    name="Animal"
                    component={Animal}
                    options={{
                        tabBarIcon: () => <Ionicons name="paw-outline" size={33} color="white" />,
                    }} />
            </Tab.Navigator>
            <StatusBar />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: corFundoNavegacao,
        borderTopColor: 'white',
        borderTopWidth: 2,
        alignItems: 'center'
    },
});

export default Menu;