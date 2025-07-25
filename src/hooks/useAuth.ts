// src/hooks/useAuth.ts
import { User } from 'firebase/auth/web-extension';
import { useAuthStore } from '../store/authStore';

export const useAuth = (): {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
} => {
  const user = useAuthStore((s) => s.firebaseUser);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const setUser = useAuthStore((s) => s.setFirebaseUser);

  return { user, isAuthenticated, setUser };
};
// This hook provides a simple interface to access the authentication state and user information from the Zustand store.
// It allows components to easily check if a user is authenticated and to set the user state when necessary.
// The `useAuth` hook can be used in any component to access the current user and authentication status, making it convenient for managing user sessions throughout the application.
// It abstracts the details of the Zustand store, providing a clean API for components to interact with the authentication state.
// This approach promotes better separation of concerns and makes the authentication logic reusable across different parts of the application.
// The hook returns the current user, authentication status, and a function to update the user state,
// which can be used in response to authentication events or user actions.