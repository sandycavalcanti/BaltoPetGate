import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TelaSplash from '../Splash/Splash';
import Navegacao from '.';

import Ficha_animal from '../Ficha_animal';
import CadAnimal from '../cadastro/CadAnimal';
import CadPontoAlimento from '../cadastro/CadPontoAlimentacao';
import Login from '../cadastro/Login';
import CadUsuario from "../cadastro/CadUsuario";
import CadAbrigo from "../cadastro/CadAbrigo";
import CadEstabelecimento from "../cadastro/CadEstabelecimento";
import CadInstituicao from "../cadastro/CadInstituicao";
import CadProtetor from "../cadastro/CadProtetor";
import CadOpcao from "../cadastro/CadOpcao";
import CadVeterinario from "../cadastro/CadVeterinario";
import RecSenha from "../cadastro/RecSenha";
import VerCodigo from "../cadastro/VerCodigo";
import CriarSenha from "../cadastro/CriarSenha";
import Perfil from '../Perfil';
import Postagem from '../Postagem';
import CadFormularioDiario from '../cadastro/CadFormularioDiario';
import CompletarCad from '../cadastro/CompletarCad';

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={TelaSplash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Navegacao" component={Navegacao} />
      <Stack.Screen name="Ficha" component={Ficha_animal} />
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
      <Stack.Screen name="Perfil" component={Perfil} />
      <Stack.Screen name="CriarSenha" component={CriarSenha} />
      <Stack.Screen name="Postagem" component={Postagem} />
      <Stack.Screen name="CompletarCad" component={CompletarCad} />
    </Stack.Navigator>
  );
}