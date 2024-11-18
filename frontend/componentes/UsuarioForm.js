///////////////////////////////////////////////////////////////////////////////////////////////////////
// Importando dependências necessárias
///////////////////////////////////////////////////////////////////////////////////////////////////////
import React, { useState } from 'react'; // Utilizando o useState para gerenciar o estado do formulário
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native'; // Utilizando os componentes TextInput, Button, View, StyleSheet e Alert
import axios from 'axios'; // Utilizando a biblioteca axios para realizar as requisições HTTP

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Estilo do componente de formulário
///////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = StyleSheet.create({
  input: { // Estilo dos inputs
    height: 40, // Altura do input
    borderColor: 'gray', // Cor da borda do input
    borderWidth: 1, // Largura da borda do input
    marginBottom: 10, // Margem inferior do input
    paddingLeft: 8, // Padding esquerdo do input
  },
});

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Componente de formulário para criação de usuários
///////////////////////////////////////////////////////////////////////////////////////////////////////
const UsuarioForm = () => {
  const [nome, setNome] = useState(''); // Utilizando o useState para gerenciar o nome do usuário
  const [email, setEmail] = useState(''); // Utilizando o useState para gerenciar o email do usuário
  const criarUsuario = async () => { // Função para realizar a requisição de criação de um novo usuário
    if (!nome || !email) { // Verificando se os campos nome e email estão preenchidos
      Alert.alert('Erro', 'Por favor, preencha todos os campos.'); // Mostrando uma alerta com o erro
      return; // Retornando para a função sem fazer nada se os campos não forem preenchidos
    }
    try { // Realizando a requisição de criação de um novo usuário com os dados fornecidos
      await axios.post('http:// 192.168.0.74:3000/usuarios', { nome, email }); // CORRIGIR IP
      Alert.alert('Sucesso', 'Usuário criado com sucesso!'); // Mostrando uma alerta com o sucesso
      setNome(''); // Limpando o campo nome
      setEmail(''); // Limpando o campo email
    } catch (error) { // Tratando o erro caso ocorra algum problema na requisição
      Alert.alert('Erro', 'Erro ao criar usuário.'); // Mostrando uma alerta com o erro
    }
  };

///////////////////////////////////////////////////////////////////////////////////////////////////////
  // Renderizando o componente de formulário
///////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <View>
      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <Button title="Criar Usuário" onPress={criarUsuario} />
    </View>
  );
};

///////////////////////////////////////////////////////////////////////////////////////////////////////

export default UsuarioForm; // Exportando o componente de formulário para ser utilizado em outros componentes

///////////////////////////////////////////////////////////////////////////////////////////////////////