import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, Modal, StyleSheet, View, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Octicons, Feather, Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { corFundoNavegacao } from '../../constants';
import Home from './Home';
import Explorar from './Explorar';
import Mapa from './Mapa';
import Animal from './Animal';
import DecodificarToken from '../../utils/DecodificarToken';
import Dropdown from '../../components/perfil/Dropdown';

const Tab = createBottomTabNavigator();
let id;

const Menu = ({ navigation: { navigate } }) => {

    useEffect(() => {
        const PegarId = async () => {
            const decodedToken = await DecodificarToken();
            id = decodedToken.TB_PESSOA_IDD;
        }
        PegarId()
    }, []);

    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [pesquisa, setPesquisa] = useState('');

    const handleSearchChange = (text) => {
        setPesquisa(text)
    };

    const handleProfileSelect = (perfil) => {
        // Aqui você pode implementar a lógica para navegar para a tela do perfil
        // Por exemplo:
        // navigation.navigate('Perfil', { perfilId: perfil.id });
    };

    const item1 = {
        icone: <Ionicons name="paw-outline" size={28} color="black" />,
        texto: 'Cadastrar um animal',
        press: () => navigate('CadastroAnimal')
    }
    const item2 = {
        icone: <AntDesign name="picture" size={28} color="black" />,
        texto: 'Cadastrar uma postagem',
        press: () => navigate('Postagem')
    }
    const item3 = {
        icone: <Feather name="map-pin" size={28} color="black" />,
        texto: 'Cadastrar um ponto de alimentação',
        press: () => navigate('Mapa')
    }

    const HeaderExplorar = () => {
        return (
            <View style={styles.headerEsquerda}>
                <TouchableOpacity style={styles.Botao} onPress={() => navigate('Perfil', { id })}>
                    <Octicons name="person" size={35} color="white" />
                </TouchableOpacity>
                <View style={styles.barraPesquisa}>
                    <MaterialIcons style={styles.IconePesquisa} name="search" size={25} color="#097396" />
                    <TextInput
                        placeholder='Pesquisar'
                        style={styles.campo}
                        onChangeText={handleSearchChange}
                    // value={pesquisa}
                    />
                </View>
                <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)} style={styles.Botao}>
                    <Octicons name="diff-added" size={30} color="white" />
                </TouchableOpacity>
                <Dropdown val={dropdownVisible} set={setDropdownVisible} item1={item1} item2={item2} item3={item3} />
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Tab.Navigator screenOptions={{ tabBarStyle: styles.container, tabBarHideOnKeyboard: true }}>
                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        tabBarShowLabel: false, title: '', header: () => <HeaderExplorar />,
                        tabBarIcon: () => <Octicons name="home" size={30} color="white" />,
                    }} />
                <Tab.Screen
                    name="Explorar"
                    component={Explorar}
                    options={{
                        tabBarShowLabel: false, title: '', header: () => <HeaderExplorar />,
                        tabBarIcon: () => <Ionicons name="search-sharp" size={35} color="white" />,
                    }} />
                <Tab.Screen
                    name="Mapa"
                    component={Mapa}
                    options={{
                        tabBarShowLabel: false, title: '', header: () => <HeaderExplorar />,
                        tabBarIcon: () => <Feather name="map-pin" size={30} color="white" />,
                    }} />
                <Tab.Screen
                    name="Animal"
                    component={Animal}
                    options={{
                        tabBarShowLabel: false, title: '', header: () => <HeaderExplorar />,
                        tabBarIcon: () => <Ionicons name="paw-outline" size={33} color="white" />,
                    }} />
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
});

export default Menu;