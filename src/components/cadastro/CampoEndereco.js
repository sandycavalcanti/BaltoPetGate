import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';
import axios from 'axios';
import { corBotaoCad, corFundoCampoCad, corTextoBotaoCad, corPlaceholderCad, corDicaCad, valorBordaCampoCad } from '../../constants';
import { Dropdown } from 'react-native-element-dropdown';

let opcional;

const CampoEndereco = (props) => {
    opcional = props.opcional;
    const [cep, setCep] = useState('');
    const [uf, setUf] = useState('');
    const [cidade, setCidade] = useState('');
    const [bairro, setBairro] = useState('');
    const [rua, setRua] = useState('');

    const ufs = [
        { label: 'AC', value: 'AC' },
        { label: 'AL', value: 'AL' },
        { label: 'AP', value: 'AP' },
        { label: 'AM', value: 'AM' },
        { label: 'BA', value: 'BA' },
        { label: 'CE', value: 'CE' },
        { label: 'DF', value: 'DF' },
        { label: 'ES', value: 'ES' },
        { label: 'GO', value: 'GO' },
        { label: 'MA', value: 'MA' },
        { label: 'MT', value: 'MT' },
        { label: 'MS', value: 'MS' },
        { label: 'MG', value: 'MG' },
        { label: 'PA', value: 'PA' },
        { label: 'PB', value: 'PB' },
        { label: 'PR', value: 'PR' },
        { label: 'PE', value: 'PE' },
        { label: 'PI', value: 'PI' },
        { label: 'RJ', value: 'RJ' },
        { label: 'RN', value: 'RN' },
        { label: 'RS', value: 'RS' },
        { label: 'RO', value: 'RO' },
        { label: 'RR', value: 'RR' },
        { label: 'SC', value: 'SC' },
        { label: 'SP', value: 'SP' },
        { label: 'SE', value: 'SE' },
        { label: 'TO', value: 'TO' },
    ];
    const [cidades, setCidades] = useState([]);

    const BuscarEndereco = async (cep) => {
        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            const endereco = response.data;
            await ListarCidades(endereco.uf);
            setUf(endereco.uf)
            setCidade(endereco.localidade);
            setBairro(endereco.bairro);
            setRua(endereco.logradouro);
            props.set2(endereco.uf);
            props.set3(endereco.localidade);
            props.set4(endereco.bairro);
            props.set5(endereco.logradouro);

            if (endereco.erro) {
                ToastAndroid.show('CEP não encontrado', ToastAndroid.SHORT);
            }
        } catch (error) {
            alert('CEP inválido. Certifique-se de que o CEP está correto.');
        }
    };

    let tentativa = 0;

    const ListarCidades = async (uf) => {
        try {
            const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
            const cidadesData = response.data.map(city => ({
                label: city.nome,
                value: city.nome,
            }));
            setCidades(cidadesData);
        } catch (error) {
            if (tentativa === 0) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                tentativa += 1;
                await ListarCidades(uf);
            } else {
                ToastAndroid.show('Houve um erro ao buscar cidades', ToastAndroid.SHORT);
            }
        }
    };

    const [textoDica, setTextoDica] = useState(false);

    const [texto, setTexto] = useState('');
    const formatarTextoCampo = (text) => {
        const dataFormatadaCampo = text.replace(/[\D.\-a-zA-Z]/g, '');
        setCep(dataFormatadaCampo);
        if (props.set1)
            props.set1(1);

        if (dataFormatadaCampo.length <= 5) {
            setTexto(dataFormatadaCampo);
        } else {
            const dataFormatada = `${dataFormatadaCampo.slice(0, 5)}-${dataFormatadaCampo.slice(5, 8)}`;
            setTexto(dataFormatada);
            if (props.set1 && dataFormatadaCampo.length == 8)
                props.set1(dataFormatadaCampo);
        }
    };

    useEffect(() => {
        if (props.set1 && props.val1) {
            formatarTextoCampo(props.val1)
        }
        setUf(props.val2);
        ListarCidades(props.val2);
        setCidade(props.val3);
        setBairro(props.val4);
        setRua(props.val5);
    }, [])

    return (
        <View style={styles.containercampo}>
            {opcional && <Text style={styles.titulocampo}>Localização (Opcional):</Text>}
            <View>
                <TextInput onChangeText={text => formatarTextoCampo(text)} value={texto} maxLength={9} placeholderTextColor={corPlaceholderCad} placeholder={opcional ? "CEP (Opcional)" : "CEP"} onFocus={() => setTextoDica(true)} onBlur={() => setTextoDica(false)} keyboardType='numeric' style={styles.campo} />
                {!opcional && <Text style={styles.asterisco}>*</Text>}
            </View>
            {textoDica && <Text style={styles.dica}>Insira apenas números</Text>}
            <TouchableOpacity onPress={() => BuscarEndereco(cep)} style={styles.botaopesquisar}>
                <Text style={styles.textocadastro}>Pesquisar CEP</Text>
            </TouchableOpacity>
            <View style={styles.selecionar}>
                <Dropdown
                    style={[styles.dropdown, { width: !opcional ? '96%' : '100%' }]}
                    placeholderStyle={{ color: corPlaceholderCad, fontSize: 18, }}
                    selectedTextStyle={{ fontSize: 18, }}
                    inputSearchStyle={{ height: 40, fontSize: 18, }}
                    data={ufs}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={'Selecione o UF'}
                    value={uf}
                    onChange={item => {
                        setUf(item.value);
                        props.set2(item.value);
                        ListarCidades(item.value)
                    }}
                />
                {!opcional && <Text style={styles.asteriscoDropdown}>*</Text>}
            </View>
            <View style={styles.selecionar}>
                <Dropdown
                    style={[styles.dropdown, { width: !opcional ? '96%' : '100%' }]}
                    placeholderStyle={{ color: corPlaceholderCad, fontSize: 18, }}
                    selectedTextStyle={{ fontSize: 18, }}
                    inputSearchStyle={{ height: 40, fontSize: 18, }}
                    data={uf ? cidades : [{ label: 'Selecione o UF primeiro', value: 'Selecione o UF primeiro' }]}
                    search={uf ? true : false}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={'Selecione a cidade'}
                    searchPlaceholder="Pesquisar"
                    value={cidade}
                    onChange={item => {
                        setCidade(item.value);
                        props.set3(item.value);
                    }}
                />
                {!opcional && <Text style={styles.asteriscoDropdown}>*</Text>}
            </View>
            <View>
                <TextInput onChangeText={text => { setBairro(text); props.set4(text) }} value={bairro} placeholderTextColor={corPlaceholderCad} placeholder={"Bairro"} style={styles.campo} />
                {!opcional && <Text style={styles.asterisco}>*</Text>}
            </View>
            <View>
                <TextInput onChangeText={text => { setRua(text); props.set5(text) }} value={rua} placeholderTextColor={corPlaceholderCad} placeholder={"Rua"} style={styles.campo} />
                {!opcional && <Text style={styles.asterisco}>*</Text>}
            </View>
            {props.set1 && <>
                <View>
                    <TextInput onChangeText={text => props.set6(text)} value={props.val6 && props.val6.toString()} placeholderTextColor={corPlaceholderCad} placeholder={"Número"} keyboardType='numeric' style={styles.campo} />
                    {!opcional && <Text style={styles.asterisco}>*</Text>}
                </View>
                <TextInput onChangeText={text => props.set7(text)} value={props.val7} placeholderTextColor={corPlaceholderCad} placeholder={"Complemento"} style={styles.campo} />
            </>}

        </View>
    )
}

const styles = StyleSheet.create({
    containercampo: {
        width: '95%',
    },
    titulocampo: {
        fontSize: 18,
        marginBottom: 5,
        color: '#fff',
        textAlign: 'center',
    },
    selecionar: {
        width: '100%',
        backgroundColor: corFundoCampoCad,
        borderRadius: valorBordaCampoCad,
        marginVertical: 5,
    },
    picker: {
        fontSize: 18,
    },
    campo: {
        width: '100%',
        fontSize: 18,
        paddingHorizontal: 10,
        padding: 5,
        backgroundColor: corFundoCampoCad,
        borderRadius: valorBordaCampoCad,
        marginVertical: 5,
    },
    dica: {
        fontSize: 14,
        color: corDicaCad,
        textAlign: 'center',
    },
    botaopesquisar: {
        width: '100%',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: corBotaoCad,
        borderRadius: valorBordaCampoCad,
        elevation: 5,
        marginTop: 5,
        marginBottom: valorBordaCampoCad,
    },
    textocadastro: {
        color: corTextoBotaoCad,
        fontSize: 18,
    },
    dropdown: {
        height: 40,
        paddingHorizontal: 10,
        fontSize: 18,
    },
    asterisco: {
        position: 'absolute',
        fontSize: 25,
        color: 'red',
        right: 10,
        bottom: 5,
    },
    asteriscoDropdown: {
        position: 'absolute',
        fontSize: 25,
        color: 'red',
        right: 10,
        bottom: 1,
    },
});

export default CampoEndereco