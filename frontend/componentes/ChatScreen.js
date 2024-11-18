///////////////////////////////////////////////////////////////////////////////////////////////////////
// Importando bibliotecas necessárias
///////////////////////////////////////////////////////////////////////////////////////////////////////
import React, { useState, useEffect } from 'react'; // useState para gerenciar o estado do componente
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, LayoutAnimation, UIManager, Platform } from 'react-native'; // View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, LayoutAnimation, UIManager, Platform
import { Ionicons } from '@expo/vector-icons'; // Ionicons para os ícones

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Estilos do componente ChatScreen
///////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = StyleSheet.create({
  container: { // Container principal do componente
    flex: 1, // Define a altura do container
    padding: 20, // Define o padding do container
    backgroundColor: '#f9f9f9', // Define a cor do backgroundColor do container
  },
  protocoloText: { // Text para o protocolo do chamado
    fontSize: 18, // Define a altura do fontSize do protocoloText
    fontWeight: 'bold', // Define a cor do fontWeight do protocoloText
    marginBottom: 10, // Define o marginBottom do protocoloText
    color: '#007BFF', // Define a cor do color do protocoloText
  },
  perfilButton: { // Botão para o perfil do chamado
    flexDirection: 'row', // Define a orientação em linha do perfilButton
    alignItems: 'center', // Define a alinhamento centralizado do perfilButton
    marginBottom: 10, // Define o marginBottom do perfilButton
  },
  perfilButtonText: { // Text para o nome do botão do perfil do chamado
    marginLeft: 5, // Define o marginLeft do nome do botão do perfil do chamado
    fontSize: 16, // Define a altura do fontSize do nome do botão do perfil do chamado
    color: '#007BFF', // Define a cor do color do nome do botão do perfil do chamado
  },
  perfilContainer: { // Container para o conteúdo do botão do perfil do chamado
    backgroundColor: '#fff', // Define a cor do backgroundColor do container do conteúdo do botão do perfil do chamado
    padding: 15, // Define o padding do container do conteúdo do botão do perfil do chamado
    marginBottom: 10, // Define o marginBottom do container do conteúdo do botão do perfil do chamado
    borderRadius: 8, // Define o borderRadius do container do conteúdo do botão do perfil do chamado
    elevation: 2, // Define a elevation do container do conteúdo do botão do perfil do chamado
  },
  perfilInfo: { // Container para as informações do botão do perfil do chamado
    fontSize: 16, // Define a altura do fontSize do container para as informações do botão do perfil do chamado
    color: '#333', // Define a cor do color do container para as informações do botão do perfil do chamado
  },
  iniciarButton: { // Botão para iniciar o chamado
    backgroundColor: '#28a745', // Define a cor do backgroundColor do botão para iniciar o chamado
    padding: 15, // Define o padding do botão para iniciar o chamado
    borderRadius: 8, // Define o borderRadius do botão para iniciar o chamado
    alignItems: 'center', // Define a alinhamento centralizado do botão para iniciar o chamado
    marginBottom: 10, // Define o marginBottom do botão para iniciar o chamado
  },
  iniciarButtonText: { // Text para o nome do botão para iniciar o chamado
    color: '#fff', // Define a cor do color do nome do botão para iniciar o chamado
    fontSize: 16, // Define a altura do fontSize do nome do botão para iniciar o chamado
    fontWeight: 'bold', // Define a cor do fontWeight do nome do botão para iniciar o chamado
  },
  mensagensContainer: { // Container para as mensagens
    flex: 1, // Define a altura do container para as mensagens
    marginBottom: 10, // Define o marginBottom do container para as mensagens
  },
  mensagem: { // Container para cada mensagem
    padding: 10, // Define o padding do container para cada mensagem
    marginVertical: 5, // Define o marginBottom do container para cada mensagem
    borderRadius: 10, // Define o borderRadius do container para cada mensagem
    maxWidth: '75%', // Define a largura máxima do container para cada mensagem
  },
  mensagemUsuario: { // Container para as mensagens do remetente
    alignSelf: 'flex-end', // Define a alinhamento centralizado do container para as mensagens do remetente
    backgroundColor: '#d1e7dd', // Define a cor do backgroundColor do container para as mensagens do remetente
  },
  mensagemAdmin: { // Container para as mensagens do administrador
    alignSelf: 'flex-start', // Define a alinhamento centralizado do container para as mensagens do administrador
    backgroundColor: '#f8d7da', // Define a cor do backgroundColor do container para as mensagens do administrador
  },
  mensagemTexto: { // Text para o texto da mensagem
    fontSize: 16, // Define a altura do fontSize do texto da mensagem
  },
  mensagemRemetente: { // Text para o nome do remetente da mensagem
    fontSize: 12, // Define a altura do fontSize do nome do remetente da mensagem
    color: '#555', // Define a cor do color do nome do remetente da mensagem
    marginTop: 5, // Define o marginTop do nome do remetente da mensagem
    textAlign: 'right', // Define a alinhamento à direita do nome do remetente da mensagem
  },
  inputContainer: { // Container para o input do chat
    flexDirection: 'row', // Define a orientação em linha do inputContainer
    alignItems: 'center', // Define a alinhamento centralizado do inputContainer
    backgroundColor: '#fff', // Define a cor do backgroundColor do inputContainer
    padding: 10, // Define o padding do inputContainer
    borderRadius: 25, // Define o borderRadius do inputContainer
    elevation: 2, // Define a elevation do inputContainer
    marginBottom: 10, // Define o marginBottom do inputContainer
  },
  input: { // Input para digitar a mensagem
    flex: 1, // Define a largura do input
    padding: 10, // Define o padding do input
    fontSize: 16, // Define a altura do fontSize do input
    color: '#333', // Define a cor do color do input
  },
  enviarButton: { // Botão para enviar a mensagem
    backgroundColor: '#007BFF', // Define a cor do backgroundColor do botão para enviar a mensagem
    padding: 10, // Define o padding do botão para enviar a mensagem
    borderRadius: 20, // Define o borderRadius do botão para enviar a mensagem
  },
  encerrarButton: { // Botão para encerrar o chat
    backgroundColor: '#dc3545', // Define a cor do backgroundColor do botão para encerrar o chat
    padding: 15, // Define o padding do botão para encerrar o chat
    borderRadius: 8, // Define o borderRadius do botão para encerrar o chat
    alignItems: 'center', // Define a alinhamento centralizado do botão para encerrar o chat
  },
  encerrarButtonText: { // Text para o nome do botão para encerrar o chat
    color: '#fff', // Define a cor do color do nome do botão para encerrar o chat
    fontSize: 16, // Define a altura do fontSize do nome do botão para encerrar o chat
    fontWeight: 'bold', // Define a cor do fontWeight do nome do botão para encerrar o chat
  },
});

// Verifica se LayoutAnimation está habilitada para Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true); // Habilita LayoutAnimation para Android
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Componente ChatScreen
///////////////////////////////////////////////////////////////////////////////////////////////////////
const ChatScreen = ({ route }) => {
  // Verifica se route.params está definido, caso contrário, usa valores padrão
  const usuario = route?.params?.usuario || { nome: 'Usuário Desconhecido', email: 'desconhecido@example.com' };
  const admin = route?.params?.admin || false; // Define admin como false se não for passado
  const [mensagens, setMensagens] = useState([]); // Variável para armazenar as mensagens
  const [mensagem, setMensagem] = useState(''); // Variável para armazenar a mensagem digitada
  const [protocolo, setProtocolo] = useState(''); // Variável para armazenar o número do protocolo
  const [chatAtivo, setChatAtivo] = useState(false); // Variável para controlar se o chat está ativo
  const [perfilExpansivo, setPerfilExpansivo] = useState(false); // Variável para controlar se o perfil do administrador está expandido
  useEffect(() => { // Inicia o chat ao abrir a tela
    // Gerar número de protocolo ao iniciar o bate-papo
    if (!protocolo) {
      const numProtocolo = `PROTO-${Math.floor(100000 + Math.random() * 900000)}`; // Gera um número aleatório entre 100000 e 999999
      setProtocolo(numProtocolo); // Adiciona o número de protocolo à lista de mensagens
    }
  }, []);
  // Verifica se o chat está ativo e renderiza o chat
  const enviarMensagem = () => {
    // Verifica se a mensagem não está vazia e adiciona a mensagem à lista de mensagens
    if (mensagem.trim()) {
      setMensagens((prevMensagens) => [...prevMensagens, { texto: mensagem, remetente: usuario.nome }]); // Adiciona a mensagem à lista de mensagens
      setMensagem(''); // Limpa o campo da mensagem
    }
  };
  // Verifica se o chat está ativo e renderiza o botão de encerrar chat
  const iniciarChat = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // Configura a animação de layout
    setChatAtivo(true); // Ativa o chat
  };
  // Verifica se o chat está ativo e renderiza o botão de encerrar chat
  const encerrarChat = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // Configura a animação de layout
    setChatAtivo(false); // Desativa o chat
    setMensagens([]); // Limpa a lista de mensagens
  };
  // Verifica se o chat está ativo e renderiza o botão de encerrar chat
  const alternarPerfil = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // Configura a animação de layout
    setPerfilExpansivo(!perfilExpansivo); // Alterna o estado do perfil
  };
  // Verifica se o chat está ativo e renderiza o botão de encerrar chat
  const renderMensagem = ({ item }) => (
    <View style={[styles.mensagem, item.remetente === usuario.nome ? styles.mensagemUsuario : styles.mensagemAdmin]}> 
      <Text style={styles.mensagemTexto}>{item.texto}</Text>
      <Text style={styles.mensagemRemetente}>{item.remetente}</Text>
    </View>
  );
  
///////////////////////////////////////////////////////////////////////////////////////////////////////
  // Renderiza o componente ChatScreen
///////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <View style={styles.container}>
      <Text style={styles.protocoloText}>Protocolo: {protocolo}</Text>

      <TouchableOpacity onPress={alternarPerfil} style={styles.perfilButton}>
        <Ionicons name={perfilExpansivo ? "chevron-up-outline" : "chevron-down-outline"} size={24} color="black" />
        <Text style={styles.perfilButtonText}>Perfil do Usuário</Text>
      </TouchableOpacity>

      {perfilExpansivo && (
        <View style={styles.perfilContainer}>
          <Text style={styles.perfilInfo}>Nome: {usuario.nome}</Text>
          <Text style={styles.perfilInfo}>Email: {usuario.email}</Text>
          <Text style={styles.perfilInfo}>Admin: {admin ? "Sim" : "Não"}</Text>
        </View>
      )}

      {!chatAtivo ? (
        <TouchableOpacity style={styles.iniciarButton} onPress={iniciarChat}>
          <Text style={styles.iniciarButtonText}>Iniciar Chat</Text>
        </TouchableOpacity>
      ) : (
        <>
          <FlatList
            data={mensagens}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderMensagem}
            style={styles.mensagensContainer}
          />

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={mensagem}
              onChangeText={setMensagem}
              placeholder="Digite sua mensagem..."
            />
            <TouchableOpacity onPress={enviarMensagem} style={styles.enviarButton}>
              <Ionicons name="send" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.encerrarButton} onPress={encerrarChat}>
            <Text style={styles.encerrarButtonText}>Encerrar Chat</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

///////////////////////////////////////////////////////////////////////////////////////////////////////

export default ChatScreen; // Exporta o componente ChatScreen

///////////////////////////////////////////////////////////////////////////////////////////////////////