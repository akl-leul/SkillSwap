import { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { CreditCard as Edit2, MapPin, Calendar, LogOut, Bell, Globe, Clock } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { mockUserProfile } from '@/data/mockData';
import ProfileStat from '@/components/ProfileStat';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const [profile, setProfile] = useState(mockUserProfile);
  const [inPersonOnly, setInPersonOnly] = useState(false);
  const [notifications, setNotifications] = useState(true);
  
  const handleLogout = () => {
    // In a real app, you would clear authentication tokens
    router.replace('/(auth)/login');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image source={{ uri: profile.avatar }} style={styles.avatar} />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{profile.name}</Text>
            <View style={styles.locationContainer}>
              <MapPin size={16} color="#fff" />
              <Text style={styles.location}>{profile.location}</Text>
            </View>
            <View style={styles.memberSince}>
              <Calendar size={16} color="rgba(255, 255, 255, 0.8)" />
              <Text style={styles.memberSinceText}>Member since {profile.memberSince}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Edit2 size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.statsContainer}>
        <ProfileStat value={profile.skillsTaught} label="Skills Taught" />
        <ProfileStat value={profile.skillsLearned} label="Skills Learned" />
        <ProfileStat value={profile.rating} label="Rating" isRating />
      </View>
      
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>About Me</Text>
        <Text style={styles.aboutText}>{profile.bio}</Text>
      </View>
      
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        
        <View style={styles.preferenceItem}>
          <View style={styles.preferenceLeft}>
            <Globe size={20} color={colors.textSecondary} />
            <Text style={styles.preferenceText}>In-person exchanges only</Text>
          </View>
          <Switch
            value={inPersonOnly}
            onValueChange={setInPersonOnly}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor="#fff"
          />
        </View>
        
        <View style={styles.preferenceItem}>
          <View style={styles.preferenceLeft}>
            <Bell size={20} color={colors.textSecondary} />
            <Text style={styles.preferenceText}>Push notifications</Text>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor="#fff"
          />
        </View>
        
        <View style={styles.preferenceItem}>
          <View style={styles.preferenceLeft}>
            <Clock size={20} color={colors.textSecondary} />
            <Text style={styles.preferenceText}>Availability</Text>
          </View>
          <TouchableOpacity style={styles.editAvailability}>
            <Text style={styles.editAvailabilityText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <LogOut size={20} color={colors.primary} />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
      
      <View style={styles.footer}>
        <Text style={styles.version}>SkillSwap v1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    position: 'relative',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#fff',
  },
  profileInfo: {
    marginLeft: 16,
  },
  name: {
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
    color: '#fff',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  location: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#fff',
    marginLeft: 4,
  },
  memberSince: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberSinceText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginLeft: 4,
  },
  editButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: -25,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: colors.text,
    marginBottom: 12,
  },
  aboutText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: colors.text,
    lineHeight: 22,
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  preferenceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  preferenceText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: colors.text,
    marginLeft: 12,
  },
  editAvailability: {
    backgroundColor: colors.background,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  editAvailabilityText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: colors.primary,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 20,
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  logoutText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: colors.primary,
    marginLeft: 8,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 30,
  },
  version: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: colors.textSecondary,
  },
});