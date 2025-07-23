import { create } from 'zustand';

type AppUser = {
  uid: string;
  name: string;
  avatarUrl?: string;
  rating?: number;
  // другие кастомные поля
};

type UserState = {
  profile: AppUser | null;
  setProfile: (profile: AppUser | null) => void;
};

export const useUserStore = create<UserState>((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
}));
