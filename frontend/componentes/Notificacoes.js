///////////////////////////////////////////////////////////////////////////////////////////////////////
// Importando dependências necessárias
///////////////////////////////////////////////////////////////////////////////////////////////////////
import React, { useEffect, useState } from 'react'; // React é a biblioteca base para construir componentes em React Native
import { View, Text, StyleSheet, FlatList } from 'react-native'; // Biblioteca para renderizar componentes
import axios from 'axios'; // Biblioteca para fazer requisições HTTP

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Estilos do componente
///////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = StyleSheet.create({
  itemContainer: { // Define os estilos do container de cada item
    padding: 10, // Define que o espaço entre os itens da lista seja de 10 pixels
    borderBottomWidth: 1, // Define que a borda do container seja de 1 pixel
    borderColor: '#ccc', // Define a cor da borda do container
  },
  itemText: { // Define os estilos do texto dos itens da lista
    fontWeight: 'bold', // Define que o texto dos itens da lista seja negrito
  },
});

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Componente para notificações
///////////////////////////////////////////////////////////////////////////////////////////////////////
const Notificacoes = () => {
  const [notificacoes, setNotificacoes] = useState([]); // State para armazenar as notificações
  useEffect(() => { // Executa o código assim que o componente é montado
    const fetchNotificacoes = async () => { // Faz a requisição para buscar as notificações
      try { // Faz a requisição para buscar as notificações no backend
        const response = await axios.get('http:// 192.168.0.74:3000/notificacoes'); // CORRIGIR IP
        setNotificacoes(response.data); // Armazena as notificações no state
      } catch (error) { // Exibe o erro caso ocorra algum problema na requisição
        console.error('Erro ao buscar notificações: ', error); // Exibe o erro na console
      }
    };
    fetchNotificacoes(); // Executa a função fetchNotificacoes assim que o componente é montado
  }, []);

///////////////////////////////////////////////////////////////////////////////////////////////////////
  // Renderiza as notificações em uma lista
///////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <FlatList
      data={notificacoes}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>{item.mensagem}</Text>
        </View>
      )}
    />
  );
};

///////////////////////////////////////////////////////////////////////////////////////////////////////

export default Notificacoes;

///////////////////////////////////////////////////////////////////////////////////////////////////////