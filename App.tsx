import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import SpinnerOverlay from './src/components/SpinnerOverlay';
import AppNavigator from './src/navigation/AppNavigator';
import { auth } from './src/services/firebase/init';
import { useAuthStore } from './src/store/authStore';

export default function App() {
  const [ready, setReady] = useState(false);
  const setFirebaseUser = useAuthStore((state) => state.setFirebaseUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      setReady(true);
    });

    return () => unsubscribe();
  }, []);

  if (!ready) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} edges={['top', 'left', 'right', 'bottom']}>
          <Text>Initializing Firebase...</Text>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['top', 'left', 'right', 'bottom']}>
          <AppNavigator />
        </SafeAreaView>
        <SpinnerOverlay />
      </View>
    </SafeAreaProvider>
  );
}
