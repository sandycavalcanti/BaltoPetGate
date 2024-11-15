import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import { Easing } from 'react-native';
import Splash from '../Splash';
import Menu from './Menu';
import HistChat from '../HistChat';
import InfoChat from '../InfoChat';
import Ficha_animal from '../Ficha_animal';
import CadAnimal from '../cadastro/CadAnimal';
import CadPontoAlimento from '../cadastro/CadPontoAlimentacao';
import CadConta from '../cadastro/CadConta';
import Login from '../login/Login';
import CadOpcao from "../cadastro/CadOpcao";
import RecSenha from '../login/RecSenha';
import VerCodigo from '../login/VerCodigo';
import CriarSenha from '../login/CriarSenha';
import Perfil from '../Perfil';
import AlterarAnimal from '../cadastro/AlterarAnimal';
import CadPostagem from '../cadastro/CadPostagem';
import CadFormularioDiario from '../cadastro/CadFormularioDiario';
import AlterarCad from '../cadastro/AlterarCad';
import AlterarPerfil from '../cadastro/AlterarPerfil';
import AlterarPostagem from '../cadastro/AlterarPostagem';
import QuestAdocao from '../cadastro/QuestAdocao';
import Chat from '../Chat';

const Stack = createStackNavigator();

// Animação abertura da tela
const openConfig = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 35,
    mass: 1,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  }
}
const closeConfig = {
  animation: 'timing',
  config: {
    duration: 200,
    easing: Easing.out(Easing.linear),
  }
}

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerShown: false
      }} >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} options={{
          gestureDirection: 'vertical',
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid
        }} />
        <Stack.Screen name="Menu" component={Menu} options={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
        }} />
        <Stack.Screen name="Ficha" component={Ficha_animal} options={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }} />
        <Stack.Screen name="AlterarAnimal" component={AlterarAnimal} />
        <Stack.Screen name="CadConta" component={CadConta} />
        <Stack.Screen name="CadastroAnimal" component={CadAnimal} />
        <Stack.Screen name="CadastroPontoAlimento" component={CadPontoAlimento} />
        <Stack.Screen name="Cadastroformulariodiario" component={CadFormularioDiario} />
        <Stack.Screen name="CadOpcao" component={CadOpcao} />
        <Stack.Screen name="RecSenha" component={RecSenha} />
        <Stack.Screen name="VerCodigo" component={VerCodigo} />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="CriarSenha" component={CriarSenha} />
        <Stack.Screen name="CadPostagem" component={CadPostagem} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="AlterarCad" component={AlterarCad} />
        <Stack.Screen name="AlterarPerfil" component={AlterarPerfil} />
        <Stack.Screen name="AlterarPostagem" component={AlterarPostagem} />
        <Stack.Screen name="QuestAdocao" component={QuestAdocao} />
        <Stack.Screen name="HistChat" component={HistChat} options={{
          gestureEnabled: true,
          gestureDirection: 'vertical',
          transitionSpec: {
            open: openConfig,
            close: closeConfig
          },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
        }} />
        <Stack.Screen name="InfoChat" component={InfoChat} options={{
          gestureDirection: 'vertical-inverted',
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;