import { Text, TouchableOpacity, View } from 'react-native'

const Teste = ({ navigation: { navigate } }) => {
  const animalCadastrado = true;

  const FazerAdocao = () => {
    axios.post(urlAPI + 'cadadocao', {
      TB_PESSOA_ID: 1,
      TB_ANIMAL_ID: 4
    }).then(response => {
      set(response.data);
    }).catch(error => {
      let erro = error.response.data;
      ToastAndroid.show(erro.message, ToastAndroid.SHORT);
      console.error('Erro ao selecionar:', erro.error);
    });
  };


  return (
    <View>
      <TouchableOpacity onPress={() => navigate("Perfil", { id: 1 })}>
        <Text>Ir para perfil</Text>
      </TouchableOpacity>
      <View>
        {animalCadastrado
          ?
          <View>
            <Text>Questionarioadocao</Text>
          </View>
          :
          <>
            <Text>Titulo</Text>
            <View>
              <TouchableOpacity onPress={Adotar}>
                <Text>Adotar</Text>
              </TouchableOpacity>
            </View>
          </>
        }
      </View>
    </View>
  )
}

export default Teste