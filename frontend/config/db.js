///////////////////////////////////////////////////////////////////////////////////////////////////////
// Arquivo responsável por buscar os dados da API
///////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Importando dependências necessárias
///////////////////////////////////////////////////////////////////////////////////////////////////////
import React, { useEffect, useState } from 'react'; // Utilizando o useEffect para executar uma função quando o componente é montado ou quando as dependências mudam
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native'; // Utilizando o ActivityIndicator para renderizar um indicador de carregamento
import axios from 'axios'; // Utilizando a biblioteca axios para realizar as requisições HTTP

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Estilos do componente
///////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = StyleSheet.create({
  container: { // Estilo do container principal
    flex: 1, // Ajustando o container para ocupar toda a tela
    padding: 20, // Adicionando padding para espaçar os itens
    backgroundColor: '#fff', // Ajustando o background do container
  },
  loadingContainer: { // Estilo do container para carregamento
    flex: 1, // Ajustando o container para ocupar toda a tela
    justifyContent: 'center', // Centralizando o conteúdo no centro do container
    alignItems: 'center', // Centralizando o conteúdo no centro do container
  },
  errorContainer: { // Estilo do container para erro
    flex: 1, // Ajustando o container para ocupar toda a tela
    justifyContent: 'center', // Centralizando o conteúdo no centro do container
    alignItems: 'center', // Centralizando o conteúdo no centro do container
  },
  errorText: { // Estilo do texto para erro
    color: 'red', // Ajustando a cor do texto para vermelho
    fontSize: 16, // Ajustando o tamanho do texto para 16 pixels
  },
  itemText: { // Estilo do texto para itens
    fontSize: 18, // Ajustando o tamanho do texto para 18 pixels
    marginVertical: 10, // Adicionando margem vertical para separar os itens
  },
});

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Configurações do componente
///////////////////////////////////////////////////////////////////////////////////////////////////////
const App = () => {
  const [dados, setDados] = useState([]); // Utilizando o useState para gerenciar os dados da API
  const [loading, setLoading] = useState(true); // Utilizando o useState para gerenciar o estado de carregamento
  const [error, setError] = useState(null); // Utilizando o useState para gerenciar o estado de erro

  useEffect(() => { // Executando a função fetchData quando o componente é montado ou quando as dependências mudam
    const fetchData = async () => { // Realizando a requisição de busca de dados
      try { // Realizando a requisição de busca de dados com axios e atribuindo o resultado à variável response
        const response = await axios.get('http://192.168.0.74:3000/dados'); // CORRIGIR IP
        setDados(response.data); // Atribuindo os dados à variável dados
      } catch (error) { // Tratando o erro caso ocorra algum problema na requisição
        console.error('Erro ao buscar dados: ', error); // Mostrando um console com o erro
        setError('Erro ao carregar os dados.'); // Mostrando uma Alert com o erro
        Alert.alert('Erro', 'Ocorreu um erro ao buscar os dados.'); // Mostrando uma Alert com o erro
      } finally { // Finalizando a requisição
        setLoading(false); // Finalizando a requisição
      }
    };
    fetchData(); // Executando a função fetchData
  }, []);
  // Vendo se o carregamento está em andamento
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  // Vendo se há algum erro
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }
  // Renderizando os dados
  return (
    <View style={styles.container}>
      {dados.map(item => (
        <Text key={item.id} style={styles.itemText}>{item.nome}</Text> // Use o ID único do item aqui
      ))}
    </View>
  );
};

///////////////////////////////////////////////////////////////////////////////////////////////////////

export default App;

///////////////////////////////////////////////////////////////////////////////////////////////////////