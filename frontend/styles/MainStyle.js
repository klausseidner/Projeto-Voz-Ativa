///////////////////////////////////////////////////////////////////////////////////////////////////////
// Arquivo responsável pelos estilos do aplicativo
///////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Importando dependências necessárias
///////////////////////////////////////////////////////////////////////////////////////////////////////
import { StyleSheet } from 'react-native'; // Utilizando o StyleSheet para definir os estilos do componente

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Definindo os estilos do aplicativo
///////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = StyleSheet.create({
    button: { // Estilo do botão
      width: "100%", // Largura do botão
      marginTop: 10 // Espaçamento entre o botão e o topo da tela
    },  
    cancelButton: { // Estilo do botão de cancelamento
      backgroundColor: "#c00" // Cor do botão de cancelamento
    },
    container: { // Estilo do container principal
      flex: 1, // Largura do container principal
      backgroundColor: '#ccc', // Cor do container principal
      alignItems: 'center', // Alinhamento dos elementos do container principal na horizontal
      justifyContent: 'center', // Alinhamento dos elementos do container principal na vertical
    },
    maskedInput: { // Estilo do input de máscara
      flexGrow: 1, // Largura do input de máscara
      height: 40, // Altura do input de máscara
      fontSize: 18, // Tamanho da fonte do input de máscara
      borderBottomColor: "#999", // Cor da borda do input de máscara
      borderBottomWidth: 1, // Largura da borda do input de máscara
      borderStyle: "solid", // Estilo da borda do input de máscara
      alignSelf: "flex-start" // Alinhamento do input de máscara na horizontal
    },
    containerMask: { // Estilo do container da máscara
      flexDirection: "row", // Direção do container da máscara
      marginBottom: 5, // Espaçamento entre o container da máscara e o botão
      marginLeft: 10, // Espaçamento entre o container da máscara e o input de máscara
      marginRight: 10 // Espaçamento entre o container da máscara e o botão de cancelamento
    },
    errorMessage: { // Estilo do texto de erro
      alignSelf: "flex-start", // Alinhamento do texto de erro na horizontal
      marginLeft: 15, // Espaçamento entre o texto de erro e o input de máscara
      color: "#f00", // Cor do texto de erro
      fontSize: 12 // Tamanho da fonte do texto de erro
    }
  });

///////////////////////////////////////////////////////////////////////////////////////////////////////

export default styles

///////////////////////////////////////////////////////////////////////////////////////////////////////