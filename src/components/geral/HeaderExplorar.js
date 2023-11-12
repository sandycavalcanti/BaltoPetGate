import { Text, TouchableOpacity, StyleSheet, View, TextInput } from 'react-native';
import { Octicons, Feather, Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import Dropdown from './Dropdown';
import { corFundoNavegacao } from '../../constants';
import { useState, useRef, useEffect } from 'react';
import DecodificarToken from '../../utils/DecodificarToken';

const HeaderExplorar = (props) => {
    const TB_PESSOA_IDD = useRef(1);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const PegarId = async () => {
        const decodedToken = await DecodificarToken();
        TB_PESSOA_IDD.current = decodedToken.TB_PESSOA_IDD;
    }

    useEffect(() => {
        PegarId();
    }, []);

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
    
    return (
        <View style={styles.header}>
            <TouchableOpacity style={styles.Botao} onPress={() => navigate('Perfil', { id: TB_PESSOA_IDD.current })}>
                <Octicons name="person" size={35} color="white" />
            </TouchableOpacity>
            <View style={styles.barraPesquisa}>
                <MaterialIcons style={styles.IconePesquisa} name="search" size={25} color="#097396" />
                <TextInput placeholder='Pesquisar' style={styles.campo} onChangeText={text => props.setPesquisa(text)} value={props.pesquisa} onFocus={() => props.setResultsVisible(true)} />
                {props.pesquisa !== '' &&
                    <TouchableOpacity onPress={() => { props.setPesquisa(''); props.setResultsVisible(false) }}>
                        <AntDesign name="close" size={24} color="black" />
                    </TouchableOpacity>}
            </View>
            <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)} style={styles.Botao}>
                <Octicons name="diff-added" size={30} color="white" />
            </TouchableOpacity>
            <Dropdown val={dropdownVisible} set={setDropdownVisible} item1={item1} item2={item2} item3={item3} />
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
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
        alignItems: 'center',
        paddingRight: 5
    },
    Botao: {
        marginLeft: 10,
        marginRight: 10
    },
    IconePesquisa: {
        marginLeft: 4,
        marginRight: 4
    },
    campo: {
        flex: 1,
    },
});
export default HeaderExplorar