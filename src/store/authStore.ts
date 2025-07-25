
import { User } from 'firebase/auth/web-extension';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface AuthState {
  firebaseUser: User | null;
  isAuthenticated: boolean;
  setFirebaseUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        firebaseUser: null,
        isAuthenticated: false,
        setFirebaseUser: (user) =>
          set({
            firebaseUser: user,
            isAuthenticated: !!user,
          }),
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({
          firebaseUser: state.firebaseUser,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    )
  )
);
