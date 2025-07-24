import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import type { RootStackParamList } from '../../navigation/types'; // проверь путь!
import { styles } from './UserProfile.styles';



const userData = {
  name: 'Polina Cohen',
  location: 'Tel Aviv',
  imageUrl: require('../../../assets/polina.png'),
  level: 4,
  favouriteSport: 'Padel',
  matches: [
    {
      id: 1,
      date: 'April 26, 2024',
      location: 'City Center',
      result: '4',
    },
    {
      id: 2,
      date: 'April 22, 2024',
      location: 'North Club',
      result: 'Padel',
    },
  ],
};

const UserProfile = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Профиль */}
      <View style={styles.profileSection}>
        <Image source={userData.imageUrl} style={styles.avatar} />
        <Text style={styles.name}>{userData.name}</Text>
        <View style={styles.locationRow}>
          <Text style={styles.location}>{userData.location}</Text>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => navigation.navigate('Settings')}
          >
            <Ionicons name="settings-outline" size={22} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Блок Level и Favourite Sport */}
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Level</Text>
          <View style={styles.levelBadge}>
            <Text style={styles.badgeText}>{userData.level}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Favourite Sport</Text>
          <View style={styles.sportBadge}>
            <Text style={styles.sportText}>{userData.favouriteSport}</Text>
          </View>
        </View>
      </View>

      {/* Матчи */}
      <Text style={styles.matchesHeader}>My Matches</Text>
      {userData.matches.map((match) => (
        <View key={match.id} style={styles.card}>
          <View style={styles.matchRow}>
            <View>
              <Text style={styles.matchDate}>{match.date}</Text>
              <Text style={styles.matchLocation}>{match.location}</Text>
            </View>
            <View
              style={[
                styles.resultBadge,
                match.result === 'Padel' ? styles.padel : styles.level,
              ]}
            >
              <Text
                style={[
                  styles.resultText,
                  match.result === 'Padel' ? styles.padelText : styles.levelText,
                ]}
              >
                {match.result}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default UserProfile;
