///////////////////////////////////////////////////////////////////////////////////////////////////////
// Importando bibliotecas necessárias
///////////////////////////////////////////////////////////////////////////////////////////////////////
import React, { useState } from 'react'; // useState para gerenciar o estado do componente
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native'; // View, TextInput, Button, StyleSheet, Alert
import axios from 'axios'; // Biblioteca para realizar requisições HTTP


///////////////////////////////////////////////////////////////////////////////////////////////////////
// Estilo do componente
///////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = StyleSheet.create({
  container: { // Container principal do componente
    padding: 20, // Define o padding do container
  },
  input: { // Input para o título do chamado
    height: 40, // Define a altura do input
    borderColor: 'gray', // Define a cor do borderColor do input
    borderWidth: 1, // Define a largura do borderWidth do input
    marginBottom: 10, // Define o marginBottom do input
    paddingLeft: 8, // Define o paddingLeft do input
  },
});

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Componente chamadoForm
///////////////////////////////////////////////////////////////////////////////////////////////////////
const ChamadoForm = () => {
  const [titulo, setTitulo] = useState('');  // Variável para armazenar o título do chamado
  const [descricao, setDescricao] = useState(''); // Variável para armazenar a descrição do chamado
  const criarChamado = async () => { // Função para criar um novo chamado
    if (!titulo || !descricao) { // Verifica se os campos estão preenchidos
      Alert.alert('Erro', 'Por favor, preencha todos os campos.'); // Exibe uma alerta com a mensagem de erro
      return; // Retorna para o início da função
    }
    try { // Tenta realizar a requisição para o backend
      await axios.post('http://192.168.0.74:3000/chamados', { titulo, descricao }); // Realiza a requisição POST para o endpoint '/chamados'
      Alert.alert('Sucesso', 'Chamado criado com sucesso!'); // Exibe uma alerta com a mensagem de sucesso
      setTitulo(''); // Limpa o campo do título
      setDescricao(''); // Limpa o campo da descrição
    } catch (error) { // Caso ocorra algum erro na requisição
      Alert.alert('Erro', 'Erro ao criar chamado.'); // Exibe uma alerta com a mensagem de erro
    }
  };

///////////////////////////////////////////////////////////////////////////////////////////////////////
  // Renderiza o componente chamadoForm
///////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
        style={styles.input}
      />
      <TextInput
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        style={styles.input}
      />
      <Button title="Criar Chamado" onPress={criarChamado} />
    </View>
  );
};

///////////////////////////////////////////////////////////////////////////////////////////////////////

export default ChamadoForm; // Exporta o componente ChamadoForm para ser usado em outros componentes

///////////////////////////////////////////////////////////////////////////////////////////////////////