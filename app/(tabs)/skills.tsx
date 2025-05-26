import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Plus, Trash2 } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { mockUserSkills, mockUserLearningSkills } from '@/data/mockData';
import SkillItem from '@/components/SkillItem';
import AddSkillModal from '@/components/AddSkillModal';
import { Skill } from '@/types/types';

export default function SkillsScreen() {
  const [teachSkills, setTeachSkills] = useState<Skill[]>(mockUserSkills);
  const [learnSkills, setLearnSkills] = useState<Skill[]>(mockUserLearningSkills);
  const [activeTab, setActiveTab] = useState<'teach' | 'learn'>('teach');
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  
  const handleDeleteSkill = (id: string) => {
    if (activeTab === 'teach') {
      setTeachSkills(teachSkills.filter(skill => skill.id !== id));
    } else {
      setLearnSkills(learnSkills.filter(skill => skill.id !== id));
    }
  };
  
  const handleAddSkill = (skill: Skill) => {
    if (activeTab === 'teach') {
      setTeachSkills([...teachSkills, skill]);
    } else {
      setLearnSkills([...learnSkills, skill]);
    }
    setIsAddModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Skills</Text>
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={() => setIsAddModalVisible(true)}
        >
          <Plus color="#fff" size={20} />
          <Text style={styles.addButtonText}>Add Skill</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'teach' && styles.activeTab]} 
          onPress={() => setActiveTab('teach')}
        >
          <Text style={[styles.tabText, activeTab === 'teach' && styles.activeTabText]}>
            Skills I Teach
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'learn' && styles.activeTab]} 
          onPress={() => setActiveTab('learn')}
        >
          <Text style={[styles.tabText, activeTab === 'learn' && styles.activeTabText]}>
            Skills I Want to Learn
          </Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={activeTab === 'teach' ? teachSkills : learnSkills}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <SkillItem 
            skill={item} 
            onDelete={() => handleDeleteSkill(item.id)}
          />
        )}
        contentContainerStyle={styles.skillsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No {activeTab === 'teach' ? 'teaching' : 'learning'} skills added yet.
            </Text>
            <TouchableOpacity 
              style={styles.emptyButton}
              onPress={() => setIsAddModalVisible(true)}
            >
              <Text style={styles.emptyButtonText}>Add Your First Skill</Text>
            </TouchableOpacity>
          </View>
        }
      />
      
      <AddSkillModal
        visible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        onAdd={handleAddSkill}
        type={activeTab}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: colors.primary,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#fff',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#fff',
    marginLeft: 4,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.textSecondary,
  },
  activeTabText: {
    color: colors.primary,
  },
  skillsList: {
    padding: 16,
    paddingBottom: 100,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 16,
    textAlign: 'center',
  },
  emptyButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#fff',
  },
});