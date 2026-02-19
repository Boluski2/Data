import { create } from 'zustand';

interface User {
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem('geouser') || 'null'),
  isAuthenticated: !!localStorage.getItem('geouser'),
  login: (email, password) => {
    const stored = localStorage.getItem('geoaccounts');
    const accounts: Record<string, { name: string; password: string }> = stored ? JSON.parse(stored) : {};
    const account = accounts[email];
    if (account && account.password === password) {
      const user = { name: account.name, email };
      localStorage.setItem('geouser', JSON.stringify(user));
      set({ user, isAuthenticated: true });
      return true;
    }
    // Demo: allow any login
    const user = { name: email.split('@')[0], email };
    localStorage.setItem('geouser', JSON.stringify(user));
    set({ user, isAuthenticated: true });
    return true;
  },
  signup: (name, email, password) => {
    const stored = localStorage.getItem('geoaccounts');
    const accounts: Record<string, { name: string; password: string }> = stored ? JSON.parse(stored) : {};
    accounts[email] = { name, password };
    localStorage.setItem('geoaccounts', JSON.stringify(accounts));
    const user = { name, email };
    localStorage.setItem('geouser', JSON.stringify(user));
    set({ user, isAuthenticated: true });
    return true;
  },
  logout: () => {
    localStorage.removeItem('geouser');
    set({ user: null, isAuthenticated: false });
  },
}));
