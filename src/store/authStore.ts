import type { User } from 'firebase/auth/web-extension'; // Corrected import path for User type
import { create } from 'zustand';

type AuthState = {
  firebaseUser: User | null;
  setFirebaseUser: (user: User | null) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  firebaseUser: null,
  setFirebaseUser: (user) => set({ firebaseUser: user }),
}));
