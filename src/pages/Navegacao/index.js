import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Splash from '../Splash';
import Menu from './Menu';
import HisChat from '../HistChat';
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
import PerfilAbaScroll from '../PerfilAbaScroll';
import AlterarCad from '../cadastro/AlterarCad';
import QuestionarioAdocao from '../cadastro/QuestionarioAdocao';

import Teste from '../Teste';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Menu" component={Menu} />
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
        <Stack.Screen name="HisChat" component={HisChat} />
        <Stack.Screen name="PerfilAbaScroll" component={PerfilAbaScroll} />
        <Stack.Screen name="Teste" component={Teste} />
        <Stack.Screen name="AlterarCad" component={AlterarCad} />
        <Stack.Screen name="QuestionarioAdocao" component={QuestionarioAdocao} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}