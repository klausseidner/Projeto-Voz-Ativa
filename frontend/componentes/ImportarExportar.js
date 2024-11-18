///////////////////////////////////////////////////////////////////////////////////////////////////////
// Importando dependências necessárias
///////////////////////////////////////////////////////////////////////////////////////////////////////
import React from 'react'; // React é a biblioteca base para construir componentes em React Native
import { View, Text, StyleSheet } from 'react-native'; // Biblioteca para renderizar componentes

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Estilos do componente
///////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = StyleSheet.create({
  container: { // Define os estilos do container principal
    flex: 1, // Define que o container tenha um espaço igual ao do conteúdo
    justifyContent: 'center', // Define que o conteúdo do container seja centralizado verticalmente
    alignItems: 'center', // Define que o conteúdo do container seja centralizado horizontalmente
  },
});

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Componente para importar e exportar
///////////////////////////////////////////////////////////////////////////////////////////////////////
const ImportarExportar = () => {
  return ( // Renderiza um texto na tela
    <View style={styles.container}>
      <Text>Importar e Exportar (Em desenvolvimento)</Text>
    </View>
  );
};

///////////////////////////////////////////////////////////////////////////////////////////////////////

export default ImportarExportar; // Exporta o componente ImportarExportar para ser usado em outros arquivos

///////////////////////////////////////////////////////////////////////////////////////////////////////