import { Text, TouchableOpacity, StyleSheet, View, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Octicons, Feather, Ionicons } from '@expo/vector-icons';
import { corFundoNavegacao } from '../../constants';
import Home from '../Home';
import Explorar from '../Explorar';
import Mapa from '../Mapa';
import Animal from '../Animal';

const Tab = createBottomTabNavigator();

const Navegacao = ({ navigation: { navigate } }) => {

    const HeaderExplorar = () => {
        return (
            <View style={styles.headerEsquerda}>
                <TouchableOpacity style={styles.Botao} onPress={() => navigate('PerfilAbaScroll')}>
                    <Octicons name="person" size={35} color="white" />
                </TouchableOpacity>
                <View style={styles.barraPesquisa}>
                    <MaterialIcons style={styles.IconePesquisa} name="search" size={25} color="#097396" />
                    <TextInput placeholder='Pesquisar' style={styles.campo} />
                </View>
                <TouchableOpacity style={styles.Botao} onPress={() => navigate("CadastroAnimal")}>
                    <Octicons name="diff-added" size={30} color="white" />
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Tab.Navigator screenOptions={{ tabBarStyle: styles.container }}>
                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        tabBarIcon: () => <Octicons name="home" size={30} color="white" />,
                        tabBarShowLabel: false,
                        title: '',
                        header: () => <HeaderExplorar />
                    }}
                />
                <Tab.Screen
                    name="Explorar"
                    component={Explorar}
                    options={{
                        tabBarIcon: () => <Ionicons name="search-sharp" size={35} color="white" />,
                        tabBarShowLabel: false,
                        title: '',
                        header: () => <HeaderExplorar />
                    }}
                />
                <Tab.Screen
                    name="Mapa"
                    component={Mapa}
                    options={{
                        tabBarIcon: () => <Feather name="map-pin" size={30} color="white" />,
                        tabBarShowLabel: false,
                        title: '',
                        header: () => <HeaderExplorar />
                    }}
                />
                <Tab.Screen
                    name="Animal"
                    component={Animal}
                    options={{
                        tabBarIcon: () => <Ionicons name="paw-outline" size={33} color="white" />,
                        tabBarShowLabel: false,
                        title: '',
                        header: () => <HeaderExplorar />
                    }}
                />
            </Tab.Navigator >
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
    headerEsquerda: {
        backgroundColor: corFundoNavegacao,
        borderBottomColor: 'white',
        borderBottomWidth: 2,
        justifyContent: 'space-around',
        display: 'flex',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    barraPesquisa: {
        flex: 2,
        backgroundColor: '#fff',
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    Botao: {
        marginLeft: 10,
        marginRight: 10
    },
    IconePesquisa: {
        marginLeft: 4,
        marginRight: 4
    }
});

export default Navegacao