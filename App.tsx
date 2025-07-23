import { getAuth, onAuthStateChanged } from 'firebase/auth/web-extension';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { auth } from './src/services/firebase';
import { useAuthStore } from './src/store/authStore';

export default function App() {
  const [ready, setReady] = useState(false);
  const setFirebaseUser = useAuthStore((state) => state.setFirebaseUser);

  useEffect(() => {
    const init = async () => {
      // дождаться инициализации Firebase
      while (!(auth as any)._initializationPromise) {
        await new Promise((res) => setTimeout(res, 50));
      }
      await (auth as any)._initializationPromise;

      const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
        setFirebaseUser(user);
      });

      setReady(true);

      return () => unsubscribe(); // отписка при размонтировании
    };

    init();
  }, []);

  if (!ready) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Initializing Firebase...</Text>
      </View>
    );
  }

  return <AppNavigator />;
}
