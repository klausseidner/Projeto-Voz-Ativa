///////////////////////////////////////////////////////////////////////////////////////////////////////
// Arquivo responsável pela tela de carregamento do aplicativo
///////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Importando dependências necessárias
///////////////////////////////////////////////////////////////////////////////////////////////////////
import React, { useEffect, useState } from 'react'; // Utilizando useEffect para manipular o estado do componente
import { View, ActivityIndicator } from 'react-native'; // Utilizando ActivityIndicator para mostrar um indicador de carregamento
import AsyncStorage from '@react-native-async-storage/async-storage'; // Utilizando AsyncStorage para armazenar e recuperar dados
import { useNavigation } from '@react-navigation/native'; // Utilizando useNavigation para navegar entre telas

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Definindo a tela de carregamento do aplicativo
///////////////////////////////////////////////////////////////////////////////////////////////////////
const AuthLoadingScreen = () => {
    const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
    const navigation = useNavigation(); // Utilizando useNavigation para navegar entre telas
    useEffect(() => { // Executa quando o componente é montado
        const checkAuthStatus = async () => { // Verifica se o token está armazenado
            const token = await AsyncStorage.getItem('userToken'); // Recupera o token do AsyncStorage
            if (token) { // Se token encontrado
                navigation.navigate('Principal'); // Navega para a TelaPrincipal
            } else { // Sem token
                navigation.navigate('Login'); // Navega para a TelaLogin
            }
            setLoading(false); // Carregamento concluído
        };
        checkAuthStatus(); // Executa a função de verificação de autenticidade
    }, []);
    // Retorna um indicador de carregamento caso o carregamento ainda não tenha sido concluído
    if (loading) {
        return <ActivityIndicator size="large" color="#3e606f" />; // Utilizando ActivityIndicator para mostrar um indicador de carregamento
    }
    return <View />; // Retorna um View vazio para que o carregamento seja renderizado
};

///////////////////////////////////////////////////////////////////////////////////////////////////////

export default AuthLoadingScreen; // Exportando a tela de carregamento do aplicativo

///////////////////////////////////////////////////////////////////////////////////////////////////////