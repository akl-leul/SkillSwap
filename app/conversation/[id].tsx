import { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, Send, Calendar, Video } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { mockConversations, mockMessages } from '@/data/mockData';
import { Message } from '@/types/types';

export default function ConversationScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const conversation = mockConversations.find(c => c.id === id);
  
  const [messages, setMessages] = useState<Message[]>(
    mockMessages.filter(msg => msg.conversationId === id)
  );
  const [newMessage, setNewMessage] = useState('');
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (flatListRef.current && messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message: Message = {
      id: `msg-${Date.now()}`,
      conversationId: id || '',
      text: newMessage,
      sender: 'me',
      timestamp: new Date().toISOString(),
      read: true
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
  };

  if (!conversation) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Conversation not found</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft color="#fff" size={24} />
        </TouchableOpacity>
        <Image source={{ uri: conversation.user.avatar }} style={styles.avatar} />
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerName}>{conversation.user.name}</Text>
          <Text style={styles.headerSkill}>{conversation.skillExchange}</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerAction}>
            <Calendar color="#fff" size={22} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerAction}>
            <Video color="#fff" size={22} />
          </TouchableOpacity>
        </View>
      </View>
      
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messagesList}
        renderItem={({ item }) => (
          <View style={[
            styles.messageContainer, 
            item.sender === 'me' ? styles.sentMessage : styles.receivedMessage
          ]}>
            <View style={[
              styles.messageBubble,
              item.sender === 'me' ? styles.sentBubble : styles.receivedBubble
            ]}>
              <Text style={styles.messageText}>{item.text}</Text>
              <Text style={styles.messageTime}>
                {new Date(item.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </Text>
            </View>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={newMessage}
          onChangeText={setNewMessage}
          multiline
          placeholderTextColor={colors.textSecondary}
        />
        <TouchableOpacity 
          style={[
            styles.sendButton,
            !newMessage.trim() && styles.disabledSendButton
          ]} 
          onPress={handleSendMessage}
          disabled={!newMessage.trim()}
        >
          <Send color="#fff" size={20} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  backBtn: {
    padding: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 8,
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  headerName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#fff',
  },
  headerSkill: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerAction: {
    padding: 8,
    marginLeft: 8,
  },
  messagesList: {
    padding: 16,
    paddingBottom: 8,
  },
  messageContainer: {
    marginBottom: 16,
    maxWidth: '80%',
  },
  sentMessage: {
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    borderRadius: 16,
    padding: 12,
    paddingBottom: 8,
  },
  sentBubble: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },
  receivedBubble: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#fff',
    marginBottom: 4,
  },
  messageTime: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.7)',
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  input: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 120,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  sendButton: {
    backgroundColor: colors.primary,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  disabledSendButton: {
    backgroundColor: colors.border,
  },
  notFoundContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  notFoundText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: colors.text,
    marginBottom: 16,
  },
  backButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#fff',
  },
});