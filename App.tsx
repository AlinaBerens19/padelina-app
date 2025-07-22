import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { auth } from './src/services/firebase';

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      // ждём, пока Firebase Auth инициализируется
      while (!(auth as any)._initializationPromise) {
        await new Promise((res) => setTimeout(res, 50));
      }
      await (auth as any)._initializationPromise;
      setReady(true);
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
