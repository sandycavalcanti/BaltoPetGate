import { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Octicons, Feather, Ionicons } from '@expo/vector-icons';
import { corFundoNavegacao } from '../../constants';
import Home from './Home';
import Explorar from './Explorar';
import Mapa from './Mapa';
import Animal from './Animal';

const OpcoesDropdown = ({ isOpen, navigate }) => {
    if (!isOpen) return null;

    // Lista de opções com ícones
    const opcoes = [
        { nome: 'Fazer uma postagem', icone: <Feather name='heart' size={24} color="black" />, navigation: 'Postagem' },
        { nome: 'Cadastrar um animal', icone: <Feather name='check-circle' size={24} color="black" />, navigation: 'CadastroAnimal' },
        { nome: 'Opção 2', icone: <Feather name='settings' size={24} color="black" />, navigation: 'Ficha' },
    ];

    return (
        <View style={styles.dropdown}>
            <FlatList
                data={opcoes}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.opcao} onPress={() => navigate(item.navigation)}>
                        {item.icone}
                        <Text style={{ marginLeft: 5, }}>{item.nome}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const Tab = createBottomTabNavigator();

const Menu = ({ navigation: { navigate } }) => {

    const HeaderExplorar = () => {
        const [dropdownAberto, setDropdownAberto] = useState(false);

        const toggleDropdown = () => {
            setDropdownAberto(!dropdownAberto);
        };

        return (
            <View style={styles.headerEsquerda}>
                <TouchableOpacity style={styles.Botao} onPress={() => navigate('PerfilAbaScroll')}>
                    <Octicons name="person" size={35} color="white" />
                </TouchableOpacity>
                <View style={styles.barraPesquisa}>
                    <MaterialIcons style={styles.IconePesquisa} name="search" size={25} color="#097396" />
                    <TextInput placeholder='Pesquisar' style={styles.campo} />
                </View>
                <TouchableOpacity onPress={toggleDropdown} style={styles.Botao}>
                    <Octicons name="diff-added" size={30} color="white" />
                </TouchableOpacity>
                <OpcoesDropdown isOpen={dropdownAberto} navigate={navigate} />
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
});

export default Menu