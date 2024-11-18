///////////////////////////////////////////////////////////////////////////////////////////////////////
// Importando dependências necessárias
///////////////////////////////////////////////////////////////////////////////////////////////////////
import React, { useState } from 'react'; // useState para gerenciar o estado do componente
import { View, TextInput, Button, StyleSheet, Alert, FlatList, Text } from 'react-native'; // View, TextInput, Button, StyleSheet, Alert, FlatList, Text
import axios from 'axios'; // Biblioteca para realizar requisições HTTP

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Estilo do componente Comentarios
///////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Componente Comentarios
///////////////////////////////////////////////////////////////////////////////////////////////////////
const Comentarios = () => {
  const [comentario, setComentario] = useState(''); // Variável para armazenar o comentário
  const [comentariosList, setComentariosList] = useState([]); // Variável para armazenar os comentários
  const adicionarComentario = async () => { // Função para adicionar um novo comentário
    if (!comentario) { // Verifica se o comentário está vazio
      Alert.alert('Erro', 'Por favor, digite um comentário.'); // Exibe uma alerta com a mensagem de erro
      return; // Retorna para o início da função
    }
    try { // Tenta realizar a requisição para o backend
      await axios.post('http:// 192.168.0.74:3000/comentarios', { comentario }); // CORRIGIR IP AQUI
      setComentariosList([...comentariosList, { comentario }]); // Adiciona o novo comentário à lista
      setComentario(''); // Limpa o campo do comentário
    } catch (error) { // Caso ocorra algum erro na requisição
      Alert.alert('Erro', 'Erro ao adicionar comentário.'); // Exibe uma alerta com a mensagem de erro
    }
  };

///////////////////////////////////////////////////////////////////////////////////////////////////////
  // Renderiza o componente Comentarios
///////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <View>
      <TextInput
        placeholder="Seu comentário"
        value={comentario}
        onChangeText={setComentario}
        style={styles.input}
      />
      <Button title="Adicionar Comentário" onPress={adicionarComentario} />
      <FlatList
        data={comentariosList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text>{item.comentario}</Text>
          </View>
        )}
      />
    </View>
  );
};

///////////////////////////////////////////////////////////////////////////////////////////////////////

export default Comentarios; // Exporta o componente Comentarios para ser usado em outros componentes

///////////////////////////////////////////////////////////////////////////////////////////////////////