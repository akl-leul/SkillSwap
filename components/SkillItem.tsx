import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Trash2 } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { Skill } from '@/types/types';

interface SkillItemProps {
  skill: Skill;
  onDelete: () => void;
}

export default function SkillItem({ skill, onDelete }: SkillItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.skillInfo}>
        <View style={styles.header}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{skill.category}</Text>
          </View>
          <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
            <Trash2 size={18} color={colors.error} />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.skillName}>{skill.name}</Text>
        
        <View style={styles.levelContainer}>
          <Text style={styles.levelLabel}>Level:</Text>
          <View style={styles.levelBars}>
            {['Beginner', 'Intermediate', 'Expert'].map((level, index) => (
              <View 
                key={level}
                style={[
                  styles.levelBar,
                  (index + 1) <= getLevelValue(skill.level) ? styles.activeBar : styles.inactiveBar
                ]}
              />
            ))}
          </View>
          <Text style={styles.levelText}>{skill.level}</Text>
        </View>
        
        {skill.description && (
          <Text style={styles.description}>{skill.description}</Text>
        )}
      </View>
    </View>
  );
}

// Helper function to convert level to a number
function getLevelValue(level: string): number {
  switch (level.toLowerCase()) {
    case 'beginner': return 1;
    case 'intermediate': return 2;
    case 'expert': return 3;
    default: return 1;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    overflow: 'hidden',
  },
  skillInfo: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryBadge: {
    backgroundColor: colors.accent,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  categoryText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#fff',
  },
  deleteButton: {
    padding: 8,
  },
  skillName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: colors.text,
    marginBottom: 12,
  },
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  levelLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.text,
    marginRight: 8,
  },
  levelBars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  levelBar: {
    width: 24,
    height: 8,
    marginRight: 4,
    borderRadius: 4,
  },
  activeBar: {
    backgroundColor: colors.primary,
  },
  inactiveBar: {
    backgroundColor: colors.border,
  },
  levelText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: colors.textSecondary,
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
});