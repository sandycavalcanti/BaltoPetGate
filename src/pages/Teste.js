import { View, Text } from 'react-native'
import { useRef, useState } from 'react'
import { Button } from 'react-native';

const Teste = () => {
  const count = useRef(null);
  const [refresh, setRefresh] = useState(0);
  const IncreaseCount = () => {
    count.current += 1;
  }
  const RefreshPage = () => {
    // setRefresh(prev => prev + 1)
    console.log(count.current)
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button onPress={IncreaseCount} title='Aumentar o ref'></Button>
      <Text>{count.current}</Text>
      <Button onPress={RefreshPage} title='Atualizar'></Button>
    </View>
  )
}

export default Teste