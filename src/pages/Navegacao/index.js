import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, TransitionSpecs, HeaderStyleInterpolators, CardStyleInterpolators } from "@react-navigation/stack";
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
import CadUsuario from "../cadastro/CadUsuario";
import CadAbrigo from "../cadastro/CadAbrigo";
import CadEstabelecimento from "../cadastro/CadEstabelecimento";
import CadInstituicao from "../cadastro/CadInstituicao";
import CadProtetor from "../cadastro/CadProtetor";
import CadOpcao from "../cadastro/CadOpcao";
import CadVeterinario from "../cadastro/CadVeterinario";
import RecSenha from '../login/RecSenha';
import VerCodigo from '../login/VerCodigo';
import CriarSenha from '../login/CriarSenha';
import Perfil from '../Perfil';
import CadPostagem from '../cadastro/CadPostagem';
import CadFormularioDiario from '../cadastro/CadFormularioDiario';
import AlterarCad from '../cadastro/AlterarCad';
import AlterarPerfil from '../cadastro/AlterarPerfil';
import QuestionarioAdocao from '../cadastro/QuestAdocao';
import Chat from '../Chat';

import uploadimg from '../uploadimg';
import Teste from '../Teste';

const Stack = createStackNavigator();

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

export default function Navigation() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }} >
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Login" component={Login} options={{
            gestureDirection: 'vertical',
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid
          }} />
          <Stack.Screen name="Menu" component={Menu} options={{
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
          }} />
          <Stack.Screen name="Ficha" component={Ficha_animal} />
          <Stack.Screen name="CadConta" component={CadConta} />
          <Stack.Screen name="CadastroAnimal" component={CadAnimal} />
          <Stack.Screen name="CadastroPontoAlimento" component={CadPontoAlimento} />
          <Stack.Screen name="Cadastroformulariodiario" component={CadFormularioDiario} />
          <Stack.Screen name="CadOpcao" component={CadOpcao} />
          <Stack.Screen name="CadUsuario" component={CadUsuario} />
          <Stack.Screen name="CadInstituicao" component={CadInstituicao} />
          <Stack.Screen name="CadAbrigo" component={CadAbrigo} />
          <Stack.Screen name="CadProtetor" component={CadProtetor} />
          <Stack.Screen name="CadVeterinario" component={CadVeterinario} />
          <Stack.Screen name="CadEstabelecimento" component={CadEstabelecimento} />
          <Stack.Screen name="RecSenha" component={RecSenha} />
          <Stack.Screen name="VerCodigo" component={VerCodigo} />
          <Stack.Screen name="Perfil" component={Perfil} options={{
            
          }}/>
          <Stack.Screen name="CriarSenha" component={CriarSenha} />
          <Stack.Screen name="CadPostagem" component={CadPostagem} />
          <Stack.Screen name="HistChat" component={HistChat} options={{
            gestureDirection: 'vertical',
            transitionSpec: {
              open: openConfig,
              close: closeConfig,
            },
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
          }} />
          <Stack.Screen name="Chat" component={Chat} options={{
            gestureEnabled: false,
          }} />
          <Stack.Screen name="Teste" component={Teste} />
          <Stack.Screen name="AlterarCad" component={AlterarCad} />
          <Stack.Screen name="AlterarPerfil" component={AlterarPerfil} />
          <Stack.Screen name="QuestionarioAdocao" component={QuestionarioAdocao} />
          <Stack.Screen name="InfoChat" component={InfoChat} options={{
            gestureEnabled: false,
            gestureDirection: 'vertical-inverted',
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
          }} />
          <Stack.Screen name="uploadimg" component={uploadimg} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}