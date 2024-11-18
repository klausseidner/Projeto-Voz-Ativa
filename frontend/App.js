///////////////////////////////////////////////////////////////////////////////////////////////////////
// Arquivo principal do aplicativo
///////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Importando dependências necessárias
///////////////////////////////////////////////////////////////////////////////////////////////////////
import React from 'react'; // Biblioteca principal do React
import { StatusBar } from 'react-native'; // Biblioteca para trabalhar com status bar
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Biblioteca para trabalhar com nativas stack navigator
import { createDrawerNavigator } from '@react-navigation/drawer'; // Biblioteca para trabalhar com nativas drawer navigator
import { NavigationContainer } from '@react-navigation/native'; // Biblioteca para trabalhar com navigation container

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Importação das telas
///////////////////////////////////////////////////////////////////////////////////////////////////////
import TelaDeLogin from './views/ScreenLogin'; // Tela de login
import TelaInicio from './views/ScreenInicio'; // Tela inicial
import TelaPrincipal from './views/ScreenPrincipal'; // Tela principal
import TelaDeCadastro from './views/ScreenCadastro'; // Tela de cadastro
import TelaPerfil from './views/ScreenPerfil'; // Tela de perfil
import TelaPerfilAdmin from './views/ScreenPerfilAdmin'; // Tela de perfil admin
import TelaDeOcorrencia from './views/ScreenOcorrencia'; // Tela de ocorrência
import TelaRelatorios from './views/ScreenRelatorios'; // Tela de relatórios
import TelaUsuarios from './views/ScreenUsuarios'; // Tela de usuários
import TelaNotificacoes from './views/ScreenNotificacoes'; // Tela de notificações
import TelaHistorico from './views/ScreenHistorico'; // Tela de histórico
import TelaChamados from './views/ScreenGerenciarOcorrencias'; // Tela de gerenciar ocorrências
import TelaComentarios from './views/ScreenComentarios'; // Tela de comentários
import TelaAdmin from './views/ScreenAdmin'; // Tela de admin
import TelaDeRecuperacaoSenha from './views/ScreenRecuperacaoSenha'; // Tela de recuperação de senha
import TelaCadastrarSecretaria from './views/ScreenCadastrarSecretaria'; // Tela de cadastrar secretaria
import TelaConsultarSecretaria from './views/ScreenConsultarSecretaria'; // Tela de consultar secretaria
import TelaDadosPessoais from './views/ScreenDadosPessoais'; // Tela de dados pessoais

///////////////////////////////////////////////////////////////////////////////////////////////////////
//importando componentes
///////////////////////////////////////////////////////////////////////////////////////////////////////
const Stack = createNativeStackNavigator(); // Criando um stack navigator
const Drawer = createDrawerNavigator(); // Criando um drawer navigator

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Criando o componente principal do aplicativo
///////////////////////////////////////////////////////////////////////////////////////////////////////
function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TelaInicio" component={TelaInicio} options={{ headerShown: false }} />
      <Stack.Screen name="TelaDeLogin" component={TelaDeLogin} options={{ headerShown: false }} />
      <Stack.Screen name="TelaPrincipal" component={TelaPrincipal} options={{ headerShown: false }} />
      <Stack.Screen name="TelaPerfil" component={TelaPerfil} />
      <Stack.Screen name="TelaPerfilAdmin" component={TelaPerfilAdmin} />
      <Stack.Screen name="TelaDeCadastro" component={TelaDeCadastro} />
      <Stack.Screen name="TelaDeOcorrencia" component={TelaDeOcorrencia} />
      <Stack.Screen name="TelaRelatorios" component={TelaRelatorios} />
      <Stack.Screen name="TelaUsuarios" component={TelaUsuarios} />
      <Stack.Screen name="TelaNotificacoes" component={TelaNotificacoes} />
      <Stack.Screen name="TelaHistorico" component={TelaHistorico} />
      <Stack.Screen name="TelaChamados" component={TelaChamados} />
      <Stack.Screen name="TelaComentarios" component={TelaComentarios} />
      <Stack.Screen name="TelaDeRecuperacaoSenha" component={TelaDeRecuperacaoSenha} />
      <Stack.Screen name="TelaCadastrarSecretaria" component={TelaCadastrarSecretaria} />
      <Stack.Screen name="TelaConsultarSecretaria" component={TelaConsultarSecretaria} />
      <Stack.Screen name="TelaDadosPessoais" component={TelaDadosPessoais} />
      {/* Adicione a TelaAdmin ao StackNavigator */}
      <Stack.Screen name="TelaAdmin" component={AdminNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Criando o componente do drawer navigator para as telas admin
///////////////////////////////////////////////////////////////////////////////////////////////////////
function AdminNavigator() {
  return (
    <Drawer.Navigator initialRouteName="TelaAdmin">
      <Drawer.Screen name="Inicio" component={TelaAdmin} />
      <Drawer.Screen name="Perfil" component={TelaPerfil} />
      {/* Adicione mais telas ao Drawer se necessário */}
    </Drawer.Navigator>
  );
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Criando o componente principal do aplicativo com navigation container e status bar
///////////////////////////////////////////////////////////////////////////////////////////////////////
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#38A69D" barStyle="light-content" />
      <Stack.Navigator>
        <Stack.Screen name="Stack" component={StackNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

///////////////////////////////////////////////////////////////////////////////////////////////////////

export default AppNavigator; // Exportando o componente principal do aplicativo

///////////////////////////////////////////////////////////////////////////////////////////////////////