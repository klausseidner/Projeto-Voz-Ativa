///////////////////////////////////////////////////////////////////////////////////////////////////////
// Arquivo responsável por estilos da interface do administrador
///////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Importando dependências necessárias
///////////////////////////////////////////////////////////////////////////////////////////////////////
import { StyleSheet } from 'react-native'; // Utilizando o StyleSheet para estilizar os componentes

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Estilos do aplicativo
///////////////////////////////////////////////////////////////////////////////////////////////////////
export const styles = StyleSheet.create({
  container: { // Estilo do container principal
    flex: 1, // Ajustando o container para ocupar toda a tela
    padding: 20, // Adicionando padding para espaçar os itens
    backgroundColor: '#f9f9f9', // Ajustando o background do container
  },
  title: { // Estilo do título principal
    fontSize: 28, // Ajustando o tamanho do título
    fontWeight: 'bold', // Ajustando a fonte do título
    marginBottom: 20, // Adicionando margem vertical para separar o título do gráfico
    textAlign: 'center', // Centralizando o texto no centro do container
    color: '#007BFF', // Ajustando a cor do título para azul
  },
  chartTitle: { // Estilo do título do gráfico
    fontSize: 20, // Ajustando o tamanho do título do gráfico
    marginBottom: 15, // Adicionando margem vertical para separar o título do gráfico do botão
    color: '#666', // Ajustando a cor do título do gráfico para cinza
    textAlign: 'center', // Centralizando o texto no centro do container
  },
  chart: { // Estilo do gráfico
    marginBottom: 20, // Adicionando margem vertical para separar o gráfico do botão
    borderRadius: 8, // Ajustando o raio do gráfico
  },
  buttonContainer: { // Estilo do container do botão
    paddingBottom: 30, // Adicionando margem inferior para separar o botão do gráfico
  },
  button: { // Estilo do botão
    flexDirection: 'row', // Ajustando o layout do botão para horizontal
    alignItems: 'center', // Centralizando o conteúdo no centro do botão
    padding: 15, // Ajustando o padding do botão
    borderRadius: 12, // Ajustando o raio do botão
    marginVertical: 10, // Adicionando margem vertical para separar os botões
    elevation: 3, // Ajustando a sombra do botão
    shadowColor: '#000', // Ajustando a cor do sombra do botão
    shadowOpacity: 0.2, // Ajustando a opacidade do sombra do botão
    shadowRadius: 5, // Ajustando o raio do sombra do botão
    shadowOffset: { width: 0, height: 2 }, // Ajustando a posição do sombra do botão
  },
  buttonText: { // Estilo do texto do botão
    color: '#fff', // Ajustando a cor do texto do botão para branco
    fontSize: 16, // Ajustando o tamanho do texto do botão
    fontWeight: 'bold', // Ajustando a fonte do texto do botão
    marginLeft: 10, // Ajustando a margem esquerda do texto do botão
  },
  modalContainer: { // Estilo do container do modal
    flex: 1, // Ajustando o container para ocupar toda a tela
    justifyContent: 'center', // Centralizando o conteúdo no centro do container
    alignItems: 'center', // Centralizando o conteúdo no centro do container
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Ajustando a cor do background do modal com transparência
  },
  modalContent: { // Estilo do conteúdo do modal
    width: 300, // Ajustando a largura do modal
    padding: 20, // Adicionando padding para espaçar os itens
    backgroundColor: '#fff', // Ajustando o background do modal
    borderRadius: 10, // Ajustando o raio do modal
    elevation: 5, // Ajustando a sombra do modal
  },
  modalTitle: { // Estilo do título do modal
    fontSize: 20, // Ajustando o tamanho do título do modal
    fontWeight: 'bold', // Ajustando a fonte do título do modal
    marginBottom: 10, // Adicionando margem vertical para separar o título do modal do botão de fechar
  },
  closeButton: { // Estilo do botão de fechar do modal
    marginTop: 15, // Adicionando margem superior para separar o botão de fechar
    backgroundColor: '#007BFF', // Ajustando a cor do botão de fechar
    paddingVertical: 10, // Ajustando o padding do botão de fechar
    borderRadius: 8, // Ajustando o raio do botão de fechar
  },
  closeButtonText: { // Estilo do texto do botão de fechar do modal
    color: '#fff', // Ajustando a cor do texto do botão de fechar
    fontWeight: 'bold', // Ajustando a fonte do texto do botão de fechar
    textAlign: 'center', // Centralizando o texto no centro do botão de fechar
  },
});

///////////////////////////////////////////////////////////////////////////////////////////////////////