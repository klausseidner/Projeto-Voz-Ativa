///////////////////////////////////////////////////////////////////////////////////////////////////////
// Importando dependências necessárias
///////////////////////////////////////////////////////////////////////////////////////////////////////
import React, { useEffect, useState } from 'react'; // Utilizando o useEffect para executar uma função quando o componente é montado ou quando as dependências mudam
import { View, Text, StyleSheet, FlatList } from 'react-native'; // Utilizando o FlatList para renderizar uma lista de itens
import axios from 'axios'; // Utilizando a biblioteca axios para realizar as requisições HTTP

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Estilos do componente de lista de usuários
///////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = StyleSheet.create({
  itemContainer: { // Estilo do container de cada item da lista
    padding: 10, // Espaçamento interno do container
    borderBottomWidth: 1, // Largura da borda do container
    borderColor: '#ccc', // Cor da borda do container
  },
  itemText: { // Estilo do texto dos itens da lista
    fontWeight: 'bold', // Estilo do texto dos itens da lista
  },
});

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Componente de lista de usuários
///////////////////////////////////////////////////////////////////////////////////////////////////////
const UsuariosList = () => {
  const [usuarios, setUsuarios] = useState([]); // Utilizando o useState para gerenciar a lista de usuários
  useEffect(() => { // Executando a função fetchUsuarios quando o componente é montado ou quando as dependências mudam
    const fetchUsuarios = async () => { // Realizando a requisição de busca de usuários
      try { // Realizando a requisição de busca de usuários com axios e atribuindo o resultado à variável response
        const response = await axios.get('http:// 192.168.0.74:3000/usuarios'); // CORRIGIR IP
        setUsuarios(response.data); // Atribuindo os dados dos usuários à variável usuarios
      } catch (error) { // Tratando o erro caso ocorra algum problema na requisição
        console.error('Erro ao buscar usuários: ', error); // Mostrando um console.error com o erro
      }
    };
    fetchUsuarios(); // Executando a função fetchUsuarios
  }, []);

///////////////////////////////////////////////////////////////////////////////////////////////////////
  // Renderizando o componente de lista de usuários
///////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <FlatList
      data={usuarios}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>{item.nome}</Text>
          <Text>{item.email}</Text>
        </View>
      )}
    />
  );
};

///////////////////////////////////////////////////////////////////////////////////////////////////////

export default UsuariosList; // Exportando o componente de lista de usuários para ser usado em outros componentes

///////////////////////////////////////////////////////////////////////////////////////////////////////