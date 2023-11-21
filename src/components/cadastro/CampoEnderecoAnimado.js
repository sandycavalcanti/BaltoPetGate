import { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';
import axios from 'axios';
import { corBotaoCad, corFundoCampoCad, corTextoBotaoCad, corPlaceholderCad, corDicaCad, valorBordaCampoCad } from '../../constants';
import { Dropdown } from 'react-native-element-dropdown';
import PropTypes from 'prop-types';
import ufs from '../../constants/ufs';
import FormatarTextoCampo from '../../utils/FormatarTextoCampo';

const CampoEnderecoAnimado = (props) => {
    let opcional = props.opcional;
    const [uf, setUf] = useState('');
    const [cidade, setCidade] = useState('');
    const [textoDica, setTextoDica] = useState(false);
    const [texto, setTexto] = useState('');

    const tentativas = useRef(0)
    const [cidades, setCidades] = useState([]);

    const BuscarEndereco = async (cep) => {
        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            const endereco = response.data;
            await ListarCidades(endereco.uf);
            props.setRef2.current = endereco.uf;
            props.setRef3.current = endereco.localidade;
            props.setRef4.current = endereco.bairro;
            props.setRef5.current = endereco.logradouro;
            setUf(endereco.uf)
            setCidade(endereco.localidade);
            // setBairro(endereco.bairro);
            // setRua(endereco.logradouro);

            if (endereco.erro) {
                ToastAndroid.show('CEP não encontrado', ToastAndroid.SHORT);
            }
        } catch (error) {
            alert('CEP inválido. Certifique-se de que o CEP está correto.');
        }
    };

    const ListarCidades = async (uf) => {
        try {
            const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
            const cidadesData = response.data.map(city => ({
                label: city.nome,
                value: city.nome,
            }));
            setCidades(cidadesData);
        } catch (error) {
            if (tentativas.current === 0) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                tentativas.current += 1;
                await ListarCidades(uf);
            } else {
                ToastAndroid.show('Houve um erro ao buscar cidades', ToastAndroid.SHORT);
            }
        }
    };

    useEffect(() => {
        if (props.setRef1 && props.val1) {
            setTexto(FormatarTextoCampo(props.val1, 'cep'));
        }
        setUf(props.val2);
        ListarCidades(props.val2);
        setCidade(props.val3);
        props.setRef4.current = props.val4;
        props.setRef5.current = props.val5;
    }, [])

    const onChangeText = (text) => {
        setTexto(FormatarTextoCampo(text, 'cep'));
        props.setRef1.current = text.replace(/\D/g, '');
    }

    return (
        <View style={styles.containercampo}>
            {opcional && <Text style={styles.titulocampo}>Localização (Opcional):</Text>}
            <View>
                <TextInput onChangeText={onChangeText} value={texto} maxLength={9} placeholderTextColor={corPlaceholderCad} placeholder={opcional ? "CEP (Opcional)" : "CEP"} onFocus={() => setTextoDica(true)} onBlur={() => setTextoDica(false)} keyboardType='numeric' style={styles.campo} />
                {!opcional && <Text style={styles.asterisco}>*</Text>}
            </View>
            {textoDica && <Text style={styles.dica}>Insira apenas números</Text>}
            <TouchableOpacity onPress={() => BuscarEndereco(props.setRef1.current)} style={styles.botaopesquisar}>
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
                        props.setRef2.current = item.value;
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
                        props.setRef3.current = item.value;
                    }}
                />
                {!opcional && <Text style={styles.asteriscoDropdown}>*</Text>}
            </View>
            <View>
                <TextInput onChangeText={text => props.setRef4.current = text} defaultValue={props.setRef4.current} placeholderTextColor={corPlaceholderCad} placeholder={"Bairro"} style={styles.campo} />
                {!opcional && <Text style={styles.asterisco}>*</Text>}
            </View>
            <View>
                <TextInput onChangeText={text => props.setRef5.current = text} defaultValue={props.setRef5.current} placeholderTextColor={corPlaceholderCad} placeholder={"Rua"} style={styles.campo} />
                {!opcional && <Text style={styles.asterisco}>*</Text>}
            </View>
            {props.setRef1 && <>
                <View>
                    <TextInput onChangeText={text => props.setRef6.current = text} defaultValue={props.val6} placeholderTextColor={corPlaceholderCad} placeholder={"Número"} keyboardType='numeric' style={styles.campo} />
                    {!opcional && <Text style={styles.asterisco}>*</Text>}
                </View>
                <TextInput onChangeText={text => props.setRef7.current = text}  defaultValue={props.val7}  placeholderTextColor={corPlaceholderCad} placeholder={"Complemento"} style={styles.campo} />
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
    labelStyle: {
        color: corPlaceholderCad,
        fontSize: 18,
        borderRadius: 15,
        backgroundColor: corFundoCampoCad,
    },
});

CampoEnderecoAnimado.propTypes = {
    setRef1: PropTypes.object,
    setRef2: PropTypes.object,
    setRef3: PropTypes.object,
    setRef4: PropTypes.object,
    setRef5: PropTypes.object,
    setRef6: PropTypes.object,
    setRef7: PropTypes.object,
    val1: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    val2: PropTypes.string,
    val3: PropTypes.string,
    val4: PropTypes.string,
    val5: PropTypes.string,
    val6: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    val7: PropTypes.string,
    opcional: PropTypes.bool
}

export default CampoEnderecoAnimado