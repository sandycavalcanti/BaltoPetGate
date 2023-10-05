import { Text } from 'react-native'

const Mensagem = (props) => {
    const texto = props.texto
    
    const Verificar = (texto) => {
        if(texto == 'Cadastrado'){
            return '#fdfdfd'
        }
        if(texto == ''){
            return '#fdfdfd'
        }
        return '#ff0000'
    }

    const cor = Verificar(texto);

    return (
        <>
            {texto && <Text style={{ color: cor }}>{texto}</Text>}
        </>
    )
}

export default Mensagem