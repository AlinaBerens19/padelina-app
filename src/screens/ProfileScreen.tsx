import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const userData = {
  name: 'Polina Cohen',
  location: 'Tel Aviv',
  imageUrl: require('../../assets/polina.png'),
  level: 4,
  favouriteSport: 'Padel',
  matches: [
    { id: 1, date: 'April 26, 2024', location: 'City Center', result: '4' },
    { id: 2, date: 'April 22, 2024', location: 'North Club', result: 'Padel' },
  ],
};

const UserProfile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <Image source={userData.imageUrl} style={styles.avatar} />
        <Text style={styles.name}>{userData.name}</Text>
        <Text style={styles.location}>{userData.location}</Text>
      </View>

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flex: 1 },
  profileSection: { alignItems: 'center', marginBottom: 24 },
  avatar: { width: 96, height: 96, borderRadius: 48, marginBottom: 12 },
  name: { fontSize: 22, fontWeight: 'bold', color: '#111' },
  location: { fontSize: 16, color: '#666' },

  card: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  label: { fontSize: 16, fontWeight: '500', color: '#333' },
  levelBadge: {
    backgroundColor: '#DCEF34',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  sportBadge: {
    backgroundColor: '#eee',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeText: { color: '#111', fontWeight: '600' },
  sportText: { color: '#444', fontWeight: '600' },

  matchesHeader: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  matchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  matchDate: { fontWeight: '600', fontSize: 16 },
  matchLocation: { fontSize: 14, color: '#666' },
  resultBadge: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  resultText: { fontWeight: '600' },
  padel: { backgroundColor: '#FDE047' },
  level: { backgroundColor: '#DCEF34' },
  padelText: { color: '#92400E' },
  levelText: { color: '#111' },
});

export default UserProfile;
