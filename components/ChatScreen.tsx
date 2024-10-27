// ChatScreen.tsx
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../App';
import Icon from 'react-native-vector-icons/Ionicons';

type ChatScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ChatScreen'
>;

interface ChatScreenProps {
  navigation: ChatScreenNavigationProp;
  route: RouteProp<RootStackParamList, 'ChatScreen'>;
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({navigation}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>('');

  const handleSend = () => {
    if (inputText.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        isUser: true,
      };
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'AI 답변입니다.',
        isUser: false,
      };

      setMessages(prevMessages => [...prevMessages, userMessage, aiMessage]);
      setInputText('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          {/* FIXME: icon이 제대로 불러와지지 않음 */}
          <Icon name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Chat</Text>
      </View>

      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View
            style={[
              styles.messageContainer,
              item.isUser
                ? styles.userMessageContainer
                : styles.aiMessageContainer,
            ]}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        contentContainerStyle={styles.messagesList}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Send a message..."
          value={inputText}
          onChangeText={text => setInputText(text)}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    padding: 5,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  messagesList: {
    padding: 10,
    flexGrow: 1,
  },
  messageContainer: {
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#fff',
    width: '85%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  aiMessageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#f2f2f2',
    width: '85%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ChatScreen;
