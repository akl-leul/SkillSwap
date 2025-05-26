import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import { MessageSquare, Search } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { mockConversations } from '@/data/mockData';
import { Conversation } from '@/types/types';
import { router } from 'expo-router';

export default function MessagesScreen() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredConversations = conversations.filter(
    convo => convo.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navigateToChat = (conversation: Conversation) => {
    // In a real app, you would navigate to a chat screen with the conversation ID
    // For this demo, we'll just mark the conversation as read
    const updatedConversations = conversations.map(convo =>
      convo.id === conversation.id ? { ...convo, unread: 0 } : convo
    );
    setConversations(updatedConversations);
    
    // Navigate to chat detail
    router.push({
      pathname: '/conversation/[id]',
      params: { id: conversation.id }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <Text style={styles.subtitle}>Connect with your skill matches</Text>
        
        <View style={styles.searchContainer}>
          <Search size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search conversations"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={colors.textSecondary}
          />
        </View>
      </View>
      
      <FlatList
        data={filteredConversations}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.conversationItem}
            onPress={() => navigateToChat(item)}
            activeOpacity={0.7}
          >
            <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
            {item.unread > 0 && <View style={styles.unreadBadge}><Text style={styles.unreadText}>{item.unread}</Text></View>}
            
            <View style={styles.conversationContent}>
              <View style={styles.conversationHeader}>
                <Text style={styles.username}>{item.user.name}</Text>
                <Text style={styles.time}>{item.lastMessageTime}</Text>
              </View>
              <Text 
                style={[styles.lastMessage, item.unread > 0 && styles.unreadMessage]}
                numberOfLines={2}
              >
                {item.lastMessage}
              </Text>
              <Text style={styles.skillExchange}>
                {item.skillExchange}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.conversationsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MessageSquare size={60} color={colors.textSecondary} style={{ marginBottom: 16 }} />
            <Text style={styles.emptyText}>No conversations yet</Text>
            <Text style={styles.emptySubtext}>
              Your conversations with matches will appear here
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: colors.text,
  },
  conversationsList: {
    padding: 16,
    paddingBottom: 100,
  },
  conversationItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: 'relative',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  unreadBadge: {
    position: 'absolute',
    top: 16,
    left: 46,
    backgroundColor: colors.secondary,
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  unreadText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
    color: '#fff',
  },
  conversationContent: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  username: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: colors.text,
  },
  time: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: colors.textSecondary,
  },
  lastMessage: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  unreadMessage: {
    fontFamily: 'Poppins-Medium',
    color: colors.text,
  },
  skillExchange: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: colors.accent,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: colors.text,
    marginBottom: 8,
  },
  emptySubtext: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});