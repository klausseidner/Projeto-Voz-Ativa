///////////////////////////////////////////////////////////////////////////////////////////////////////
// Importando as dependências necessárias
///////////////////////////////////////////////////////////////////////////////////////////////////////
import React, { useState, useEffect } from 'react'; // Utilizando React Hooks
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert, Modal, Button, Image, ScrollView } from 'react-native'; // Utilizando React Native components
import DateTimePicker from '@react-native-community/datetimepicker'; // Utilizando DateTimePicker component
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'; // Utilizando react-native-image-picker component

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Estilos do componente
///////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = StyleSheet.create({
  container: { // Container principal
    flex: 1, // Tamanho do container
    padding: 16, // Padding interno do container
    backgroundColor: '#fff', // Cor do fundo do container
  },
  modalContainer: { // Container do modal
    flex: 1, // Tamanho do container do modal
    padding: 16, // Padding interno do modal
  },
  modalTitle: { // Título do modal
    fontSize: 20, // Tamanho do título do modal
    fontWeight: 'bold', // Negrito do título do modal
    marginBottom: 20, // Margem inferior do título do modal
  },
  input: { // Campo de entrada
    borderWidth: 1, // Borda do campo de entrada
    borderColor: '#ccc', // Cor da borda do campo de entrada
    borderRadius: 5, // Arredondamento do campo de entrada
    padding: 10, // Padding interno do campo de entrada
    marginBottom: 10, // Margem inferior do campo de entrada
  },
  dateTimeContainer: { // Container do DateTimePicker
    flexDirection: 'row', // Direção do container do DateTimePicker
    justifyContent: 'space-between', // Justificativa do container do DateTimePicker
  },
  dateTimeButton: { // Botão do DateTimePicker
    borderWidth: 1, // Borda do botão do DateTimePicker
    borderColor: '#ccc', // Cor da borda do botão do DateTimePicker
    borderRadius: 5, // Arredondamento do botão do DateTimePicker
    padding: 10, // Padding interno do botão do DateTimePicker
    marginBottom: 10, // Margem inferior do botão do DateTimePicker
    flex: 1, // Direção do botão do DateTimePicker
    marginHorizontal: 5, // Margem horizontal do botão do DateTimePicker
    alignItems: 'center', // Alinhamento do botão do DateTimePicker
  },
  dateTimeButtonText: { // Texto do botão do DateTimePicker
    color: '#000', // Cor do texto do botão do DateTimePicker
  },
  statusLabel: { // Label do status
    fontSize: 16, // Tamanho do label do status
    marginVertical: 10, // Margem vertical do label do status
  },
  statusOption: { // Opção do status
    fontSize: 16, // Tamanho da fonte das opções do status
    marginVertical: 5, // Margem vertical das opções do status
  },
  imageContainer: { // Container da imagem
    marginVertical: 10, // Margem vertical da imagem
  },
  imageLabel: { // Label da imagem
    fontSize: 16, // Tamanho do label da imagem
    marginBottom: 5, // Margem vertical do label da imagem
  },
  imageButton: { // Botão da imagem
    borderWidth: 1, // Borda do botão da imagem
    borderColor: '#ccc', // Cor da borda do botão da imagem
    borderRadius: 5, // Arredondamento do botão da imagem
    padding: 10, // Padding interno do botão da imagem
    marginVertical: 5, // Margem vertical do botão da imagem
    alignItems: 'center', // Alinhamento do botão da imagem
  },
  imageButtonText: { // Texto do botão da imagem
    color: '#000', // Cor do texto do botão da imagem
  },
  addButton: { // Botão para adicionar um novo incidente
    backgroundColor: '#007BFF', // Cor do botão para adicionar um novo incidente
    padding: 15, // Padding interno do botão para adicionar um novo incidente
    borderRadius: 5, // Arredondamento do botão para adicionar um novo incidente
    alignItems: 'center', // Alinhamento do botão para adicionar um novo incidente
    marginVertical: 10, // Margem vertical do botão para adicionar um novo incidente
  },
  addButtonText: { // Texto do botão para adicionar um novo incidente
    color: '#fff', // Cor do texto do botão para adicionar um novo incidente
    fontSize: 16, // Tamanho do texto do botão para adicionar um novo incidente
  },
  incidentItem: { // Item do incidente
    borderWidth: 2, // Borda do item do incidente
    borderRadius: 5, // Arredondamento do item do incidente
    padding: 10, // Padding interno do item do incidente
    marginVertical: 5, // Margem vertical do item do incidente
  },
  incidentTitle: { // Título do incidente
    fontSize: 18, // Tamanho do título do incidente
    fontWeight: 'bold', // Negrito do título do incidente
  },
  incidentDescription: { // Descrição do incidente
    marginTop: 5, // Margem superior da descrição do incidente
  },
  incidentType: { // Tipo do incidente
    fontStyle: 'italic', // Estilo do tipo do incidente
  },
  incidentDate: { // Data do incidente
    fontWeight: 'bold', // Negrito da data do incidente
  },
  incidentTime: { // Hora do incidente
    fontWeight: 'bold', // Negrito da hora do incidente
  }, 
  incidentProtocol: { // Protocolo do incidente
    fontWeight: 'bold', // Negrito do protocolo do incidente
  },
  incidentStatus: { // Status do incidente
    fontWeight: 'bold', // Negrito do status do incidente
    marginBottom: 5, // Margem inferior do status do incidente
  },
  incidentImage: { // Imagem do incidente
    width: 100, // Largura da imagem do incidente
    height: 100, // Altura da imagem do incidente
    marginRight: 5, // Margem direita da imagem do incidente
  },
  buttonsContainer: { // Container dos botões
    flexDirection: 'row', // Direção do container dos botões
    justifyContent: 'space-between', // Justificativa do container dos botões
  },
  editButton: { // Botão para editar um incidente
    backgroundColor: '#FFA500', // Cor do botão para editar um incidente
    padding: 10, // Padding interno do botão para editar um incidente
    borderRadius: 5, // Arredondamento do botão para editar um incidente
  },
  editButtonText: { // Texto do botão para editar um incidente
    color: '#fff', // Cor do texto do botão para editar um incidente
  },
  deleteButton: { // Botão para excluir um incidente
    backgroundColor: '#FF0000', // Cor do botão para excluir um incidente
    padding: 10, // Padding interno do botão para excluir um incidente
    borderRadius: 5, // Arredondamento do botão para excluir um incidente
  },
  deleteButtonText: { // Texto do botão para excluir um incidente
    color: '#fff', // Cor do texto do botão para excluir um incidente
  },
});

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Componente de Gerenciamento de Incidentes
///////////////////////////////////////////////////////////////////////////////////////////////////////
const IncidentManagementScreen = () => {
  const [incidentTitle, setIncidentTitle] = useState(''); // Título do incidente
  const [incidentDescription, setIncidentDescription] = useState(''); // Descrição do incidente
  const [incidentType, setIncidentType] = useState(''); // Tipo do incidente
  const [incidentDate, setIncidentDate] = useState(''); // Data do incidente
  const [incidentTime, setIncidentTime] = useState(''); // Hora do incidente
  const [incidentStatus, setIncidentStatus] = useState('pendente'); // Status do incidente
  const [incidentImages, setIncidentImages] = useState([]); // Imagens do incidente
  const [incidents, setIncidents] = useState([]); // Incidentes registrados
  const [editIncident, setEditIncident] = useState(null); // Incidente a ser editado
  const [modalVisible, setModalVisible] = useState(false); // Modal para edição de incidentes
  const [showDatePicker, setShowDatePicker] = useState(false); // Modal para seleção de data
  const [showTimePicker, setShowTimePicker] = useState(false); // Modal para seleção de hora

///////////////////////////////////////////////////////////////////////////////////////////////////////
  // Carregando os incidentes ao abrir a tela
///////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => { 
    loadIncidents(); // Carregando os incidentes
  }, []);
  const loadIncidents = async () => { // Carregando os incidentes
    try { // Carregando os incidentes do backend
      const response = await fetch('http://192.168.0.74:3000/incidents'); // CORRIGIR IP
      const data = await response.json(); // Converte a resposta em JSON
      setIncidents(data); // Atualiza os incidentes
    } catch (error) { // Caso ocorra um erro ao carregar os incidentes
      console.error('Error loading incidents', error); // Mostra o erro
    }
  };
///////////////////////////////////////////////////////////////////////////////////////////////////////
  // Ação para validar os inputs
///////////////////////////////////////////////////////////////////////////////////////////////////////
  const validateInputs = () => { // Validando os inputs
    if (!incidentTitle) { // Validando o título
      Alert.alert('Erro', 'Título é obrigatório.'); // Mostra o erro
      return false; // Retorna false para cancelar a operação
    }
    if (!incidentDescription) { // Validando a descrição
      Alert.alert('Erro', 'Descrição é obrigatória.'); // Mostra o erro
      return false; // Retorna false para cancelar a operação
    }
    if (!incidentType) { // Validando o tipo
      Alert.alert('Erro', 'Tipo é obrigatório.'); // Mostra o erro
      return false; // Retorna false para cancelar a operação
    }
    return true; // Retorna true para prosseguir com a operação
  };

///////////////////////////////////////////////////////////////////////////////////////////////////////
  // Ação para registrar um novo incidente
///////////////////////////////////////////////////////////////////////////////////////////////////////
  const registerIncident = async (incident) => { // Registrando um novo incidente
    try { // Registrando o novo incidente no backend
      const response = await fetch('http://192.168.0.74:3000/incidents', { // CORRIGIR IP
        method: 'POST', // Método para POST
        headers: { // Definindo o tipo de conteúdo da requisição
          'Content-Type': 'application/json', // Definindo o tipo de conteúdo
        },
        body: JSON.stringify(incident), // Converte o objeto em JSON
      });
      if (!response.ok) { // Caso o status da resposta não seja OK
        throw new Error('Erro ao registrar a ocorrência'); // Lança uma exceção com a mensagem de erro
      }
      await response.json(); // Converte a resposta em JSON
    } catch (error) { // Caso ocorra um erro ao registrar o novo incidente
      console.error('Error registering incident', error); // Mostra o erro
      Alert.alert('Erro', 'Falha ao registrar a ocorrência'); // Mostra o erro
    }
  };

///////////////////////////////////////////////////////////////////////////////////////////////////////
  // Ação para registrar um novo incidente (edição)
///////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleRegisterIncident = async () => { // Ação para registrar um novo incidente
    if (!validateInputs()) return; // Valida os inputs
    const now = new Date(); // Obtém a data e hora atual
    const formattedDate = incidentDate || now.toISOString().split('T')[0]; // Formata a data
    const formattedTime = incidentTime || `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`; // Formata a hora
    const newIncident = { // Criando o novo incidente
      protocolNumber: `PROTOCOLO-${Date.now()}`, // Número do protocolo
      title: incidentTitle, // Título do incidente
      description: incidentDescription, // Descrição do incidente
      type: incidentType, // Tipo do incidente
      date: formattedDate, // Data do incidente
      time: formattedTime, // Hora do incidente
      status: incidentStatus, // Status do incidente
      images: incidentImages, // Imagens do incidente
    };
    await registerIncident(newIncident); // Registra o novo incidente
    Alert.alert('Sucesso', 'Ocorrência registrada com sucesso!'); // Mostra o alerta de sucesso
    resetForm(); // Reseta o formulário
    loadIncidents(); // Carrega os novos incidentes
  };

///////////////////////////////////////////////////////////////////////////////////////////////////////
  // Ação para editar um incidente
///////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleEditIncident = (incident) => {
    setEditIncident(incident); // Atualiza o incidente a ser editado
    setIncidentTitle(incident.title); // Atualiza o título do incidente
    setIncidentDescription(incident.description); // Atualiza a descrição do incidente
    setIncidentType(incident.type); // Atualiza o tipo do incidente
    setIncidentDate(incident.date); // Atualiza a data do incidente
    setIncidentTime(incident.time); // Atualiza a hora do incidente
    setIncidentStatus(incident.status); // Atualiza o status do incidente
    setIncidentImages(incident.images || []); // Atualiza as imagens do incidente
    setModalVisible(true); // Mostra o modal para edição de incidentes
  };

//////////////////////////////////////////////////////////////////////////////////////////////////////
  // Ação para excluir um incidente
///////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleDeleteIncident = async (id) => {
    Alert.alert( // Alerta para confirmar a exclusão
      'Excluir Ocorrência', // Mensagem do alerta
      'Tem certeza que deseja excluir esta ocorrência?', // Mensagem do alerta
      [
        { text: 'Cancelar', style: 'cancel' }, // Botão para cancelar a exclusão
        {
          text: 'Excluir', // Botão para excluir a ocorrência
          onPress: async () => { // Exclui a ocorrência
            try { // Tenta exclui a ocorrência do backend
              await fetch(`http://192.168.0.74:3000/incidents/${id}`, { // CORRIGIR IP
                method: 'DELETE', // Método para DELETE
              });
              loadIncidents(); // Carrega os novos incidentes
              Alert.alert('Sucesso', 'Ocorrência excluída com sucesso!'); // Mostra o alerta de sucesso
            } catch (error) { // Caso ocorra um erro ao excluir a ocorrência
              console.error('Error deleting incident', error); // Mostra o erro
              Alert.alert('Erro', 'Falha ao excluir a ocorrência'); // Mostra o alerta de erro
            }
          },
        },
      ],
      { cancelable: true } // Cancela a exclusão se o botão cancelar for clicado
    );
  };

///////////////////////////////////////////////////////////////////////////////////////////////////////
  // Ação para mudar data do incidente
///////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false); // Fecha o modal de seleção de data
    setIncidentDate(selectedDate ? selectedDate.toISOString().split('T')[0] : incidentDate); // Seta a data do incidente
  };

///////////////////////////////////////////////////////////////////////////////////////////////////////
  // Ação para mudar hora do incidente
///////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false); // Fecha o modal de seleção de hora
    setIncidentTime(selectedTime ? `${selectedTime.getHours()}:${String(selectedTime.getMinutes()).padStart(2, '0')}` : incidentTime); // Seta a hora do incidente
  };

///////////////////////////////////////////////////////////////////////////////////////////////////////
  // Ação para abrir o modal de seleção de imagem
///////////////////////////////////////////////////////////////////////////////////////////////////////
  const selectImage = () => {
    launchImageLibrary( // Abrir a biblioteca de imagens
      {
        mediaType: 'photo', // Somente imagens
        maxWidth: 600, // Largura máxima da imagem
        maxHeight: 600, // Altura máxima da imagem
        quality: 0.7, // Qualidade da imagem
      },
      (response) => { // Caso a resposta seja válida
        if (response.assets) { // Caso a resposta seja válida
          const selectedImages = response.assets.map(asset => ({ // Converte a URI da imagem para base64
            uri: asset.uri, // URI da imagem
            fileName: asset.fileName, // Nome do arquivo da imagem
          }));
          setIncidentImages(prevImages => [...prevImages, ...selectedImages]); // Seta a imagem do incidente
        }
      }
    );
  };

///////////////////////////////////////////////////////////////////////////////////////////////////////
  // Ação para tirar uma foto
///////////////////////////////////////////////////////////////////////////////////////////////////////
  const takePhoto = () => {
    launchCamera( // Abrir a câmera
      {
        mediaType: 'photo', // Somente imagens
        maxWidth: 600, // Largura máxima da imagem
        maxHeight: 600, // Altura máxima da imagem
        quality: 0.7, // Qualidade da imagem
      },
      (response) => { // Caso a resposta seja válida
        if (response.assets) { // Caso a resposta seja válida
          const newPhoto = response.assets.map(asset => ({ // Converte a URI da imagem para base64
            uri: asset.uri, // URI da imagem
            fileName: asset.fileName, // Nome do arquivo da imagem
          }));
          setIncidentImages(prevImages => [...prevImages, ...newPhoto]); // Seta a imagem do incidente
        }
      }
    );
  };

///////////////////////////////////////////////////////////////////////////////////////////////////////
  // Ação para resetar o formulário
///////////////////////////////////////////////////////////////////////////////////////////////////////
  const resetForm = () => {
    setIncidentTitle(''); // Reseta o título do incidente
    setIncidentDescription(''); // Reseta a descrição do incidente
    setIncidentType(''); // Reseta o tipo do incidente
    setIncidentDate(''); // Reseta a data do incidente
    setIncidentTime(''); // Reseta a hora do incidente
    setIncidentStatus('pendente'); // Reseta o status do incidente
    setIncidentImages([]); // Reseta as imagens do incidente
    setEditIncident(null); // Reseta o incidente a ser editado
    setModalVisible(false); // Fecha o modal para edição de incidentes
  };

///////////////////////////////////////////////////////////////////////////////////////////////////////
  // Ação para selecionar cor do status do incidente
///////////////////////////////////////////////////////////////////////////////////////////////////////
  const getStatusColor = (status) => {
    switch (status) { // Switch para escolher a cor do status do incidente
      case 'pendente':
        return '#FFD700'; // Amarelo
      case 'em atendimento':
        return '#FFA500'; // Laranja
      case 'resolvida':
        return '#008000'; // Verde
      case 'encerrada':
        return '#FF0000'; // Vermelho
      default:
        return '#000000'; // Preto (padrão)
    }
  };

///////////////////////////////////////////////////////////////////////////////////////////////////////
  // Carrega o incidente a partir do ID
///////////////////////////////////////////////////////////////////////////////////////////////////////
  const renderItem = ({ item }) => (
    <View style={[styles.incidentItem, { borderColor: getStatusColor(item.status) }]}>
      <Text style={styles.incidentTitle}>{item.title}</Text>
      <Text style={styles.incidentType}>Tipo: {item.type}</Text>
      <Text style={styles.incidentDate}>Data: {item.date}</Text>
      <Text style={styles.incidentTime}>Horário: {item.time}</Text>
      <Text style={styles.incidentDescription}>{item.description}</Text>
      <Text style={styles.incidentProtocol}>Protocolo: {item.protocolNumber}</Text>
      <Text style={[styles.incidentStatus, { color: getStatusColor(item.status) }]}>
        Status: {item.status}
      </Text>
      <ScrollView horizontal>
        {item.images?.map((image, index) => (
          <Image key={index} source={{ uri: image.uri }} style={styles.incidentImage} />
        ))}
      </ScrollView>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.editButton} onPress={() => handleEditIncident(item)}>
          <Text style={styles.editButtonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteIncident(item.id)}>
          <Text style={styles.deleteButtonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

///////////////////////////////////////////////////////////////////////////////////////////////////////
  // Opções de status do incidente	
///////////////////////////////////////////////////////////////////////////////////////////////////////
  const statusOptions = [
    { label: 'Pendente', value: 'pendente' },
    { label: 'Em Atendimento', value: 'em atendimento' },
    { label: 'Resolvida', value: 'resolvida' },
    { label: 'Encerrada', value: 'encerrada' },
  ];

///////////////////////////////////////////////////////////////////////////////////////////////////////
  // Renderiza a página de ocorrências
///////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <View style={styles.container}>
      <FlatList
        data={incidents}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Adicionar Ocorrência</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={resetForm}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{editIncident ? 'Editar Ocorrência' : 'Registrar Ocorrência'}</Text>
          <TextInput
            style={styles.input}
            placeholder="Título"
            value={incidentTitle}
            onChangeText={setIncidentTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Descrição"
            value={incidentDescription}
            onChangeText={setIncidentDescription}
          />
          <TextInput
            style={styles.input}
            placeholder="Tipo"
            value={incidentType}
            onChangeText={setIncidentType}
          />
          <View style={styles.dateTimeContainer}>
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateTimeButton}>
              <Text style={styles.dateTimeButtonText}>Data: {incidentDate || 'Selecionar'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.dateTimeButton}>
              <Text style={styles.dateTimeButtonText}>Hora: {incidentTime || 'Selecionar'}</Text>
            </TouchableOpacity>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={new Date()}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={handleDateChange}
            />
          )}

          {showTimePicker && (
            <DateTimePicker
              value={new Date()}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={handleTimeChange}
            />
          )}

          <Text style={styles.statusLabel}>Status:</Text>
          {statusOptions.map((option) => (
            <TouchableOpacity key={option.value} onPress={() => setIncidentStatus(option.value)}>
              <Text style={[styles.statusOption, { color: incidentStatus === option.value ? 'blue' : 'black' }]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}

          <View style={styles.imageContainer}>
            <Text style={styles.imageLabel}>Imagens:</Text>
            <TouchableOpacity onPress={selectImage} style={styles.imageButton}>
              <Text style={styles.imageButtonText}>Selecionar Imagens</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={takePhoto} style={styles.imageButton}>
              <Text style={styles.imageButtonText}>Tirar Foto</Text>
            </TouchableOpacity>
            <ScrollView horizontal>
              {incidentImages.map((image, index) => (
                <Image key={index} source={{ uri: image.uri }} style={styles.incidentImage} />
              ))}
            </ScrollView>
          </View>

          <Button title={editIncident ? 'Atualizar Ocorrência' : 'Registrar Ocorrência'} onPress={handleRegisterIncident} />
          <Button title="Cancelar" onPress={resetForm} />
        </View>
      </Modal>
    </View>
  );
};

///////////////////////////////////////////////////////////////////////////////////////////////////////

export default IncidentManagementScreen;

///////////////////////////////////////////////////////////////////////////////////////////////////////