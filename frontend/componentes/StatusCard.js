///////////////////////////////////////////////////////////////////////////////////////////////////////
// Importando dependências necessárias
///////////////////////////////////////////////////////////////////////////////////////////////////////
import React from 'react'; // React é a biblioteca base para construir componentes em React Native
import { View, Text, StyleSheet } from 'react-native'; // Biblioteca para renderizar componentes
import PropTypes from 'prop-types'; // Biblioteca para validar os tipos dos props

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Estilos do componente StatusCard
///////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = StyleSheet.create({
  card: { // Estilo do card
    padding: 15, // Espaçamento interno do card
    borderRadius: 8, // Raio de arredondamento do card
    marginBottom: 15, // Margim inferior do card
    shadowColor: '#000', // Cor do sombra do card
    shadowOffset: { width: 0, height: 2 }, // Deslocamento da sombra do card
    shadowOpacity: 0.2, // Opacidade da sombra do card
    shadowRadius: 2, // Raio da sombra do card
    elevation: 3, // Para Android
  },
  title: { // Estilo do título do card
    fontSize: 16, // Tamanho do texto do título
    fontWeight: 'bold', // Estilo do texto do título
    color: '#fff', // Cor do texto do título
  },
  count: { // Estilo da contagem do card
    fontSize: 24, // Tamanho do texto da contagem
    fontWeight: 'bold', // Estilo do texto da contagem
    color: '#fff', // Cor do texto da contagem
  },
});

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Definindo o componente StatusCard
///////////////////////////////////////////////////////////////////////////////////////////////////////
const StatusCard = ({ 
  title = 'Título', // Título do card
  count = 0, // Contagem do card
  color = '#007BFF' // Cor do card
}) => {
  return ( // Renderizando o componente StatusCard
    <View style={[styles.card, { backgroundColor: color }]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.count}>{count}</Text>
    </View>
  );
};

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Definindo propTypes para garantir que as propriedades recebidas estejam corretas
///////////////////////////////////////////////////////////////////////////////////////////////////////
StatusCard.propTypes = {
  title: PropTypes.string, // Propriedade que recebe um texto
  count: PropTypes.number, // Propriedade que recebe um número
  color: PropTypes.string, // Propriedade que recebe uma cor
};

///////////////////////////////////////////////////////////////////////////////////////////////////////

export default StatusCard; // Exportando o componente StatusCard para ser usado em outros componentes

///////////////////////////////////////////////////////////////////////////////////////////////////////