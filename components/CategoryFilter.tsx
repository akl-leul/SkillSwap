import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';
import { skillCategories } from '@/data/mockData';

interface CategoryFilterProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export default function CategoryFilter({ 
  selectedCategory, 
  onSelectCategory 
}: CategoryFilterProps) {
  
  const handleCategoryPress = (category: string) => {
    if (selectedCategory === category) {
      // If already selected, deselect it
      onSelectCategory(null);
    } else {
      onSelectCategory(category);
    }
  };
  
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {skillCategories.map(category => (
        <TouchableOpacity
          key={category}
          style={[
            styles.categoryItem,
            selectedCategory === category && styles.selectedCategoryItem
          ]}
          onPress={() => handleCategoryPress(category)}
        >
          <Text 
            style={[
              styles.categoryText,
              selectedCategory === category && styles.selectedCategoryText
            ]}
          >
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 16,
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginRight: 12,
  },
  selectedCategoryItem: {
    backgroundColor: '#fff',
  },
  categoryText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#fff',
  },
  selectedCategoryText: {
    color: colors.primary,
  },
});