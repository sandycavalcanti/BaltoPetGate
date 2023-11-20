import { Text, TouchableOpacity, StyleSheet, View, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Octicons, Feather, Ionicons } from '@expo/vector-icons';
import { corFundoNavegacao } from '../../constants';
import Home from './Home';
import Explorar from './Explorar';
import Mapa from './Mapa';
import Animal from './Animal';
import HistChat from '../HistChat';
import HeaderExplorar from '../../components/navegacao/HeaderExplorar';

const Tab = createBottomTabNavigator();

const Menu = ({ navigation: { navigate } }) => {

    const CustomChatButton = () => {
        return (
            <TouchableOpacity onPress={() => navigate('HistChat')} style={styles.chatButton}>
                <Ionicons name="chatbubble-ellipses-outline" size={35} color={'#eee'} />
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Tab.Navigator screenOptions={{ tabBarStyle: styles.container, tabBarHideOnKeyboard: true, header: () => <HeaderExplorar />, tabBarShowLabel: false, title: '' }} >
                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        tabBarIcon: props => <Octicons name="home" size={30} color={props.focused ? '#fff' : '#eee'} />,
                    }} />
                <Tab.Screen
                    name="Explorar"
                    component={Explorar}
                    options={{
                        tabBarIcon: props => <Ionicons name="search-sharp" size={35} color={props.focused ? '#fff' : '#eee'} />,
                    }} />
                <Tab.Screen
                    name="HistChat"
                    component={HistChat}
                    options={{
                        tabBarButton: CustomChatButton,
                    }} />
                <Tab.Screen
                    name="Mapa"
                    component={Mapa}
                    options={{
                        tabBarIcon: props => <Feather name="map-pin" size={30} color={props.focused ? '#fff' : '#eee'} />,
                    }} />
                <Tab.Screen
                    name="Animal"
                    component={Animal}
                    options={{
                        tabBarIcon: props => <Ionicons name="paw-outline" size={33} color={props.focused ? '#fff' : '#eee'} />,
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
    chatButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Menu;