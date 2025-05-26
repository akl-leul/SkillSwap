import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MapPin, Star, ArrowRight } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { Match } from '@/types/types';
import { router } from 'expo-router';

interface MatchCardProps {
  match: Match;
}

export default function MatchCard({ match }: MatchCardProps) {
  const handlePress = () => {
    // In a real app, you would navigate to a match detail screen
    // For this demo, we'll navigate to a conversation
    router.push({
      pathname: '/conversation/[id]',
      params: { id: match.conversationId || 'new' }
    });
  };
  
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress} activeOpacity={0.8}>
      <View style={styles.userInfo}>
        <Image source={{ uri: match.user.avatar }} style={styles.avatar} />
        <View style={styles.userDetails}>
          <Text style={styles.userName}>{match.user.name}</Text>
          <View style={styles.locationContainer}>
            <MapPin size={14} color={colors.textSecondary} />
            <Text style={styles.location}>{match.user.location}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <Star size={14} color={colors.secondary} />
            <Text style={styles.rating}>{match.user.rating}</Text>
            <Text style={styles.ratingCount}>({match.user.ratingCount})</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.skillsContainer}>
        <View style={styles.skillBox}>
          <Text style={styles.skillLabel}>They can teach you</Text>
          <View style={styles.skillBadge}>
            <Text style={styles.skillName}>{match.teachSkill.name}</Text>
          </View>
          <Text style={styles.skillLevel}>
            Level: <Text style={styles.skillLevelValue}>{match.teachSkill.level}</Text>
          </Text>
        </View>
        
        <View style={styles.exchangeIconContainer}>
          <ArrowRight size={20} color={colors.primary} style={styles.exchangeIcon} />
        </View>
        
        <View style={styles.skillBox}>
          <Text style={styles.skillLabel}>You can teach them</Text>
          <View style={styles.skillBadge}>
            <Text style={styles.skillName}>{match.learnSkill.name}</Text>
          </View>
          <Text style={styles.skillLevel}>
            Level: <Text style={styles.skillLevelValue}>{match.learnSkill.level}</Text>
          </Text>
        </View>
      </View>
      
      <TouchableOpacity style={styles.contactButton} onPress={handlePress}>
        <Text style={styles.contactButtonText}>Contact</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  userInfo: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  userDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  userName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: colors.text,
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  location: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.text,
    marginLeft: 4,
  },
  ratingCount: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 2,
  },
  skillsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  skillBox: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 12,
    borderRadius: 12,
  },
  skillLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  skillBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  skillName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#fff',
  },
  skillLevel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: colors.textSecondary,
  },
  skillLevelValue: {
    fontFamily: 'Poppins-Medium',
    color: colors.text,
  },
  exchangeIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
  },
  exchangeIcon: {
    transform: [{ rotate: '90deg' }],
  },
  contactButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  contactButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#fff',
  },
});