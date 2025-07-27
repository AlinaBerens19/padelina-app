// src/hooks/useAuth.ts

import { useEffect, useState } from 'react';
import { auth } from '../services/firebase/init';
import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const user = useAuthStore(s => s.firebaseUser);
  const setUser = useAuthStore(s => s.setFirebaseUser);
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(u => {
      setUser(u);
      if (initializing) setInitializing(false);
    });
    return unsubscribe;
  }, []);

  return { user, isAuthenticated, initializing };
};
