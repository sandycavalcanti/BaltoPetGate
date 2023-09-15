import { useRef, useState } from 'react';
import { Text, TouchableOpacity, Modal, StyleSheet, View, TextInput, FlatList, Animated, PanResponder } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Octicons, Feather, Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { corFundoNavegacao } from '../../constants';
import { Divider } from "react-native-elements";
import Home from './Home';
import Explorar from './Explorar';
import Mapa from './Mapa';
import Animal from './Animal';

const Tab = createBottomTabNavigator();

const Menu = ({ navigation: { navigate } }) => {

    const [dropdownVisible, setDropdownVisible] = useState(false);

    const Dropdown = () => {
        return (
            <View style={{ position: 'absolute' }}>
                <Modal visible={dropdownVisible} transparent={true} animationType="none" onRequestClose={() => setDropdownVisible(false)} >
                    <TouchableOpacity style={styles.dropdownBackdrop} onPress={() => setDropdownVisible(false)}>
                        <View style={[styles.dropdown, { top: 45, right: 15 }]}>
                            <TouchableOpacity style={styles.dropdownButton}>
                                <Ionicons name="paw-outline" size={28} color="black" />
                                <Text style={styles.textDropdownButton} onPress={() => navigate('CadastroAnimal')}>Cadastrar um animal</Text>
                            </TouchableOpacity>
                            <Divider width={1} color="black" />
                            <TouchableOpacity style={styles.dropdownButton}>
                                <AntDesign name="picture" size={28} color="black" />
                                <Text style={styles.textDropdownButton} onPress={() => navigate('Postagem')}>Fazer uma postagem</Text>
                            </TouchableOpacity>
                            <Divider width={1} color="black" />
                            <TouchableOpacity style={styles.dropdownButton}>
                                <Feather name="map-pin" size={28} color="black" />
                                <Text style={styles.textDropdownButton}>Cadastrar um ponto de alimentação</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </Modal>
            </View>
        )
    }

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
                <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)} style={styles.Botao}>
                    <Octicons name="diff-added" size={30} color="white" />
                </TouchableOpacity>
                <Dropdown />
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
    },
    botao: {
        backgroundColor: 'blue',
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    dropdown: {
        position: 'absolute',
        top: 50,
        right: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        zIndex: 1,
    },
    opcao: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    dropdown: {
        position: 'absolute',
        backgroundColor: 'white',
        borderColor: '#B18888',
        borderWidth: 1,
        borderRadius: 10,
        paddingTop: 10,
        paddingBottom: 5,
    },
    dropdownButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        width: 225,
        marginLeft: 10,
    },
    dropdownBackdrop: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textDropdownButton: {
        marginLeft: 10,
        fontSize: 15,
    }
});

export default Menu