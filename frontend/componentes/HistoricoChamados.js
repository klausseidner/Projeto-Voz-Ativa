///////////////////////////////////////////////////////////////////////////////////////////////////////
// Importando dependências necessárias
///////////////////////////////////////////////////////////////////////////////////////////////////////
import React, { useEffect, useState } from 'react'; // Hooks para gerenciamento de estado e ciclo de vida
import { View, Text, StyleSheet, FlatList } from 'react-native'; // Biblioteca para renderizar componentes
import axios from 'axios'; // Biblioteca para realizar requisições HTTP

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Estilos do componente
///////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = StyleSheet.create({
  itemContainer: { // Define os estilos do container do item
    padding: 10, // Define o padding do container
    borderBottomWidth: 1, // Define a borda inferior do container
    borderColor: '#ccc', // Define a cor da borda inferior do container
  },
  itemText: { // Define os estilos do texto do item
    fontWeight: 'bold', // Define a negrito do texto do item
  },
});

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Componente para renderizar o histórico de chamados
///////////////////////////////////////////////////////////////////////////////////////////////////////
const HistoricoChamados = () => {
  const [historico, setHistorico] = useState([]); // Estado para armazenar o histórico de chamados
  useEffect(() => { // Ao montar o componente, busca o histórico de chamados
    const fetchHistorico = async () => { // Busca o histórico de chamados através da API
      try { // Realiza a requisição GET para o endpoint da API
        const response = await axios.get('http:// 192.168.0.74:3000/historico'); // CORRIGIR IP AQUI
        setHistorico(response.data); // Atualiza o estado com os dados do histórico
      } catch (error) { // Caso ocorra algum erro, exibe o erro na console
        console.error('Erro ao buscar histórico: ', error); // Exibe o erro no console
      }
    };
    fetchHistorico(); // Executa a função fetchHistorico ao montar o componente
  }, []);

///////////////////////////////////////////////////////////////////////////////////////////////////////
  // Renderiza o histórico de chamados
///////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <FlatList
      data={historico}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>{item.titulo}</Text>
          <Text>{item.descricao}</Text>
          <Text>{item.data}</Text>
        </View>
      )}
    />
  );
};

///////////////////////////////////////////////////////////////////////////////////////////////////////

export default HistoricoChamados; // Exporta o componente HistoricoChamados para ser usado em outros arquivos

///////////////////////////////////////////////////////////////////////////////////////////////////////