import { getAuth, onAuthStateChanged } from 'firebase/auth/web-extension';
import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { auth } from './src/services/firebase';
import { useAuthStore } from './src/store/authStore';

export default function App() {
  const [ready, setReady] = useState(false);
  const setFirebaseUser = useAuthStore((state) => state.setFirebaseUser);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const init = async () => {
      while (!(auth as any)._initializationPromise) {
        await new Promise((res) => setTimeout(res, 50));
      }
      await (auth as any)._initializationPromise;

      unsubscribe = onAuthStateChanged(getAuth(), (user) => {
        setFirebaseUser(user);
      });

      setReady(true);
    };

    init();

    return () => {
      if (unsubscribe) unsubscribe();
    };
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
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['top', 'left', 'right', 'bottom']}>
        <AppNavigator />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
