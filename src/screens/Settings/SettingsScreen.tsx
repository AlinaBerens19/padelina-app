import React, { useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './SettingsScreen.styles';

import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from 'services/firebase';

console.log('serverTimestamp:', serverTimestamp);

const SettingsScreen = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [level, setLevel] = useState('');
  const [favouriteSport, setFavouriteSport] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleSave = async () => {
    console.log('handleSave called');
    try {
      const user = auth.currentUser;
      console.log('Current user:', user);
      if (!user) throw new Error('No user is signed in');

      const profile = {
        uid: user.uid,
        name,
        location,
        level: Number(level),
        favouriteSport,
        phone,
        address,
        email: user.email,
        updatedAt: serverTimestamp(),
      };

      console.log('Profile object:', profile);

      await setDoc(doc(db, 'users', user.uid), profile);
      console.log('setDoc successful');

      Alert.alert('Saved', 'Your changes have been saved.');
      console.log('Alert should be shown: Saved');
    } catch (e: any) {
      console.log('Error in handleSave:', e);
      Alert.alert('Error', e.message || 'Could not save profile.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.header}>Profile Settings</Text>

        <Text style={styles.label}>Full Name</Text>
        <TextInput value={name} onChangeText={setName} style={styles.input} />

        <Text style={styles.label}>Location</Text>
        <TextInput value={location} onChangeText={setLocation} style={styles.input} />

        <Text style={styles.label}>Level</Text>
        <TextInput value={level} onChangeText={setLevel} style={styles.input} keyboardType="numeric" />

        <Text style={styles.label}>Favourite Sport</Text>
        <TextInput value={favouriteSport} onChangeText={setFavouriteSport} style={styles.input} />

        <Text style={styles.label}>Phone</Text>
        <TextInput value={phone} onChangeText={setPhone} style={styles.input} keyboardType="phone-pad" />

        <Text style={styles.label}>Address</Text>
        <TextInput value={address} onChangeText={setAddress} style={styles.input} />

        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;
