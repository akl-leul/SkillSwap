import { View, Text, StyleSheet } from 'react-native';
import { Star } from 'lucide-react-native';
import { colors } from '@/constants/colors';

interface ProfileStatProps {
  value: number | string;
  label: string;
  isRating?: boolean;
}

export default function ProfileStat({ value, label, isRating = false }: ProfileStatProps) {
  return (
    <View style={styles.container}>
      <View style={styles.valueContainer}>
        {isRating ? (
          <View style={styles.ratingContainer}>
            <Text style={styles.value}>{value}</Text>
            <Star size={16} color={colors.secondary} />
          </View>
        ) : (
          <Text style={styles.value}>{value}</Text>
        )}
      </View>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueContainer: {
    marginBottom: 4,
  },
  value: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: colors.text,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});