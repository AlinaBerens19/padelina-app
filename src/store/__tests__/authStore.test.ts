import type { User } from 'firebase/auth/web-extension';
import { useAuthStore } from '../authStore';


describe('authStore', () => {
  it('sets and gets firebaseUser correctly', () => {
    const mockUser = { uid: 'test123' } as User;

    // Устанавливаем пользователя
    useAuthStore.getState().setFirebaseUser(mockUser);

    // Получаем пользователя
    const result = useAuthStore.getState().firebaseUser;

    expect(result).toBe(mockUser);
    expect(result?.uid).toBe('test123');
  });

  it('clears firebaseUser on logout', () => {
    useAuthStore.getState().setFirebaseUser(null);

    const result = useAuthStore.getState().firebaseUser;

    expect(result).toBeNull();
  });
});
