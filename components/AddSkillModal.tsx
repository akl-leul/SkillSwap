import { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { X } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { skillCategories } from '@/data/mockData';
import { Skill } from '@/types/types';

interface AddSkillModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (skill: Skill) => void;
  type: 'teach' | 'learn';
}

export default function AddSkillModal({ 
  visible, 
  onClose, 
  onAdd, 
  type 
}: AddSkillModalProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState('Beginner');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleSubmit = () => {
    // Validate form
    const newErrors: {[key: string]: string} = {};
    
    if (!name.trim()) {
      newErrors.name = 'Skill name is required';
    }
    
    if (!category) {
      newErrors.category = 'Category is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Create new skill
    const newSkill: Skill = {
      id: `skill-${Date.now()}`,
      name: name.trim(),
      category,
      level,
      description: description.trim()
    };
    
    onAdd(newSkill);
    
    // Reset form
    setName('');
    setCategory('');
    setLevel('Beginner');
    setDescription('');
    setErrors({});
  };

  const handleClose = () => {
    // Reset form when closing
    setName('');
    setCategory('');
    setLevel('Beginner');
    setDescription('');
    setErrors({});
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>
              Add {type === 'teach' ? 'Teaching' : 'Learning'} Skill
            </Text>
            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
              <X size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.formContainer}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Skill Name</Text>
              <TextInput
                style={[styles.input, errors.name && styles.inputError]}
                value={name}
                onChangeText={setName}
                placeholder="e.g. Guitar, Photography, JavaScript"
                placeholderTextColor={colors.textSecondary}
              />
              {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Category</Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesContainer}
              >
                {skillCategories.map(cat => (
                  <TouchableOpacity
                    key={cat}
                    style={[
                      styles.categoryChip,
                      category === cat && styles.selectedCategoryChip
                    ]}
                    onPress={() => setCategory(cat)}
                  >
                    <Text 
                      style={[
                        styles.categoryChipText,
                        category === cat && styles.selectedCategoryChipText
                      ]}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Proficiency Level</Text>
              <View style={styles.levelContainer}>
                {['Beginner', 'Intermediate', 'Expert'].map(lev => (
                  <TouchableOpacity
                    key={lev}
                    style={[
                      styles.levelButton,
                      level === lev && styles.selectedLevelButton
                    ]}
                    onPress={() => setLevel(lev)}
                  >
                    <Text 
                      style={[
                        styles.levelButtonText,
                        level === lev && styles.selectedLevelButtonText
                      ]}
                    >
                      {lev}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Description (Optional)</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={description}
                onChangeText={setDescription}
                placeholder="Briefly describe your experience or what you'd like to learn"
                placeholderTextColor={colors.textSecondary}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </ScrollView>
          
          <View style={styles.footer}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
              <Text style={styles.addButtonText}>Add Skill</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: colors.text,
  },
  closeButton: {
    padding: 4,
  },
  formContainer: {
    padding: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: colors.text,
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: colors.error,
    marginTop: 4,
  },
  textArea: {
    minHeight: 100,
    paddingTop: 12,
  },
  categoriesContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.background,
    marginRight: 12,
  },
  selectedCategoryChip: {
    backgroundColor: colors.primary,
  },
  categoryChipText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.text,
  },
  selectedCategoryChipText: {
    color: '#fff',
  },
  levelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  levelButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: colors.background,
    marginHorizontal: 4,
    borderRadius: 8,
  },
  selectedLevelButton: {
    backgroundColor: colors.primary,
  },
  levelButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.text,
  },
  selectedLevelButtonText: {
    color: '#fff',
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 8,
    marginRight: 8,
  },
  cancelButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: colors.text,
  },
  addButton: {
    flex: 2,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 8,
    marginLeft: 8,
  },
  addButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#fff',
  },
});