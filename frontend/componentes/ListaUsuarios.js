///////////////////////////////////////////////////////////////////////////////////////////////////////
// Importando dependências necessárias
///////////////////////////////////////////////////////////////////////////////////////////////////////
import React, { useState, useEffect } from 'react'; // Hooks para gerenciamento de estado e ciclo de vida
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, Image, Alert, LayoutAnimation, UIManager, Platform } from 'react-native'; // Biblioteca para renderizar componentes
import axios from 'axios'; // Biblioteca para realizar requisições HTTP
import { Ionicons } from '@expo/vector-icons'; // Biblioteca para renderizar ícones

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Estilos do componente
///////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = StyleSheet.create({
  container: { // Define os estilos do container principal
    flex: 1, // Define que o container tenha um espaço igual ao do conteúdo
    padding: 20, // Define o padding do container
    backgroundColor: '#f0f4f8', // Define a cor de fundo do container
  },
  title: { // Define os estilos do título
    fontSize: 28, // Define o tamanho do título
    fontWeight: 'bold', // Define a negrito do título
    marginBottom: 20, // Define o padding inferior do título
    textAlign: 'center', // Define a alinhamento do título ao centro
    color: '#007BFF', // Define a cor do título
  },
  listContent: { // Define os estilos do conteúdo da lista
    paddingBottom: 20, // Define o padding inferior do conteúdo da lista
  },
  itemContainer: { // Define os estilos do container do item
    flexDirection: 'row', // Define a direção do container do item
    backgroundColor: '#fff', // Define a cor de fundo do item
    padding: 15, // Define o padding do item
    marginBottom: 10, // Define o padding inferior do item
    borderRadius: 12, // Define o raio do item
    elevation: 3, // Define a sombra do item
    shadowColor: '#000', // Define a cor do sombra do item
    shadowOpacity: 0.1, // Define a opacidade do sombra do item
    shadowRadius: 6, // Define o raio do sombra do item
    shadowOffset: { width: 0, height: 4 }, // Define a posição do sombra do item
    alignItems: 'center', // Define a alinhamento do item ao centro
  },
  foto: { // Define os estilos da foto do item
    width: 60, // Define a largura da foto do item
    height: 60, // Define a altura da foto do item
    borderRadius: 30, // Define o raio da foto do item
    marginRight: 15, // Define o padding esquerdo da foto do item
  },
  infoContainer: { // Define os estilos do container das informações do item
    flex: 1, // Define a largura do container das informações do item
  },
  nome: { // Define os estilos do nome do item
    fontSize: 18, // Define o tamanho do nome do item
    fontWeight: 'bold', // Define a negrito do nome do item
    color: '#333', // Define a cor do nome do item
  },
  email: { // Define os estilos do email do item
    fontSize: 16, // Define o tamanho do email do item
    color: '#666', // Define a cor do email do item
  },
  deleteButton: { // Define os estilos do botão de exclusão do item
    marginLeft: 15, // Define o padding esquerdo do botão de exclusão do item
  },
  modalContainer: { // Define os estilos do container do modal
    flex: 1, // Define que o container tenha um espaço igual ao do conteúdo
    justifyContent: 'center', // Define a alinhamento do modal ao centro
    alignItems: 'center', // Define a alinhamento do modal ao centro
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Define a cor de fundo do modal
  },
  modalContent: { // Define os estilos do conteúdo do modal
    width: 320, // Define a largura do conteúdo do modal
    padding: 20, // Define o padding do conteúdo do modal
    backgroundColor: '#fff', // Define a cor de fundo do conteúdo do modal
    borderRadius: 10, // Define o raio do conteúdo do modal
    elevation: 5, // Define a sombra do conteúdo do modal
    alignItems: 'center', // Define a alinhamento do conteúdo do modal ao centro
  },
  modalTitle: { // Define os estilos do título do modal
    fontSize: 22, // Define o tamanho do título do modal
    fontWeight: 'bold', // Define a negrito do título do modal
    marginBottom: 20, // Define o padding inferior do título do modal
  },
  modalFoto: { // Define os estilos da foto do modal
    width: 100, // Define a largura da foto do modal
    height: 100, // Define a altura da foto do modal
    borderRadius: 50, // Define o raio da foto do modal
    marginBottom: 20, // Define o padding inferior da foto do modal
  },
  modalText: { // Define os estilos do texto do modal
    fontSize: 18, // Define o tamanho do texto do modal
    marginBottom: 10, // Define o padding inferior do texto do modal
    color: '#333', // Define a cor do texto do modal
  },
  closeButton: { // Define os estilos do botão de fechar do modal
    backgroundColor: '#007BFF', // Define a cor do botão de fechar do modal
    paddingVertical: 10, // Define o padding vertical do botão de fechar do modal
    paddingHorizontal: 20, // Define o padding horizontal do botão de fechar do modal
    borderRadius: 8, // Define o raio do botão de fechar do modal
    marginTop: 20, // Define o padding superior do botão de fechar do modal
  },
  closeButtonText: { // Define os estilos do texto do botão de fechar do modal
    color: '#fff', // Define a cor do texto do botão de fechar do modal
    fontWeight: 'bold', // Define a negrito do texto do botão de fechar do modal
    textAlign: 'center', // Define a alinhamento do texto do botão de fechar do modal ao centro
  },
});

// Verifica se o layoutAnimation é suportado no dispositivo
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true); // Habilita o layoutAnimation experimental no Android
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Componente para renderizar a lista de usuários
///////////////////////////////////////////////////////////////////////////////////////////////////////
const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]); // Estado para armazenar os usuários
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar o estado do modal
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null); // Estado para armazenar o usuário selecionado
  useEffect(() => { // Ao montar o componente, carrega os usuários
    const carregarUsuarios = async () => { // Chamada à API para carregar os usuários
      try { // Chamada à API para carregar os usuários
        const response = await axios.get('http://192.168.0.74:3000/usuarios'); // CORRIGIR IP AQUI
        setUsuarios(response.data); // Atualiza o estado com os dados dos usuários
      } catch (error) { // Caso ocorra algum erro, exibe o erro na console
        console.error('Erro ao carregar usuários:', error); // Exibe o erro na console
      }
    };
    carregarUsuarios(); // Executa a função carregarUsuarios ao montar o componente
  }, []);
  const abrirModal = (usuario) => { // Abre o modal com os dados do usuário
    setUsuarioSelecionado(usuario);  // Atualiza o estado com o usuário selecionado
    setModalVisible(true); // Abre o modal
  };
  const fecharModal = () => { // Fecha o modal
    setUsuarioSelecionado(null); // Fecha o modal
    setModalVisible(false); // Fecha o modal
  };
  const excluirUsuario = (id) => { // Exclui o usuário com o id fornecido
    Alert.alert( // Alert para confirmar a exclusão
      'Confirmar Exclusão',
      'Deseja realmente excluir este usuário?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              // Chamada à API para excluir o usuário
              await axios.delete(`http://192.168.0.74:3000/usuarios/${id}`); // CORRIGIR IP AQUI
              LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // Configura o layoutAnimation
              // Atualiza a lista de usuários após a exclusão
              setUsuarios(prevUsuarios => prevUsuarios.filter((usuario) => usuario.id !== id));
            } catch (error) { // Caso ocorra algum erro, exibe o erro na console
              console.error('Erro ao excluir usuário:', error); // Exibe o erro na console
            }
          }
        }
      ]
    );
  };
  // Renderiza os itens da lista de usuários
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => abrirModal(item)}>
      <Image source={{ uri: item.foto }} style={styles.foto} />
      <View style={styles.infoContainer}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.email}>{item.email}</Text>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={() => excluirUsuario(item.id)}>
        <Ionicons name="trash-bin-outline" size={24} color="red" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
///////////////////////////////////////////////////////////////////////////////////////////////////////
  // Renderiza a lista de usuários
  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Usuários</Text>

      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()} // Certificando que o id é uma string
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />

      {/* Modal para exibir detalhes do usuário */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Detalhes do Usuário</Text>
            {usuarioSelecionado && (
              <>
                <Image source={{ uri: usuarioSelecionado.foto }} style={styles.modalFoto} />
                <Text style={styles.modalText}>Nome: {usuarioSelecionado.nome}</Text>
                <Text style={styles.modalText}>Email: {usuarioSelecionado.email}</Text>
              </>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={fecharModal}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

///////////////////////////////////////////////////////////////////////////////////////////////////////

export default ListaUsuarios; // Exportando o componente ListaUsuarios para ser usado em outros arquivos

///////////////////////////////////////////////////////////////////////////////////////////////////////