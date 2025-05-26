import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Search, MapPin, Star } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { mockMatches } from '@/data/mockData';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import MatchCard from '@/components/MatchCard';
import { Match } from '@/types/types';

export default function DiscoverScreen() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // In a real app, you would fetch matches from API
    // Filter matches based on selected category and search query
    let filteredMatches = [...mockMatches];
    
    if (selectedCategory) {
      filteredMatches = filteredMatches.filter(
        match => match.teachSkill.category === selectedCategory
      );
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredMatches = filteredMatches.filter(
        match => 
          match.teachSkill.name.toLowerCase().includes(query) || 
          match.learnSkill.name.toLowerCase().includes(query) ||
          match.user.name.toLowerCase().includes(query)
      );
    }
    
    setMatches(filteredMatches);
  }, [selectedCategory, searchQuery]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Discover Skills</Text>
        <Text style={styles.subtitle}>Find your perfect skill match</Text>
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
        <CategoryFilter 
          selectedCategory={selectedCategory} 
          onSelectCategory={setSelectedCategory} 
        />
      </View>
      
      <FlatList
        data={matches}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <MatchCard match={item} />
        )}
        contentContainerStyle={styles.matchesList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No matches found.</Text>
            <Text style={styles.emptySubtext}>Try adjusting your filters or search.</Text>
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
  matchesList: {
    padding: 16,
    paddingBottom: 100,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
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