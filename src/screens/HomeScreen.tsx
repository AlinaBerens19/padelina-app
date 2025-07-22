import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Match = {
  id: string;
  location: string;
  level: number;
  sport: 'Tennis' | 'Padel' | 'Pickleball';
  price: number;
};

const mockMatches: Match[] = [
  { id: '1', location: 'Tel Aviv', level: 4, sport: 'Tennis', price: 65 },
  { id: '2', location: 'Tel Aviv', level: 4, sport: 'Padel', price: 45 },
  { id: '3', location: 'Tel Aviv', level: 4, sport: 'Pickleball', price: 60 },
];

export default function HomeScreen() {
  const [matches, setMatches] = useState<Match[]>(mockMatches);

  const renderItem = ({ item }: { item: Match }) => (
    <View style={styles.card}>
      <View>
        <Text style={styles.price}>{item.price}</Text>
        <Text>{item.location}</Text>
        <Text>Level {item.level}</Text>
      </View>
      <TouchableOpacity style={styles.joinButton}>
        <Text style={styles.joinText}>Join</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Matches Near You</Text>
      <FlatList
        data={matches}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  heading: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  list: { gap: 12 },
  card: {
    backgroundColor: '#f6f6f6',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: { fontSize: 20, fontWeight: '600' },
  joinButton: {
    backgroundColor: '#d6ff00',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  joinText: { fontWeight: '600' },
});
