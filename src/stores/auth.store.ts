import { create } from "zustand";

interface AuthState {
  token: string | null;
  userEmail: string | null;
  isAuthenticated: boolean;
  login: (token: string, email: string) => void;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  userEmail: null,
  isAuthenticated: false,

  login: (token: string, email: string) => {
    if (typeof document !== "undefined") {
      document.cookie = `auth_token=${token}; path=/; max-age=86400; SameSite=Lax`;
      document.cookie = `user_email=${encodeURIComponent(email)}; path=/; max-age=86400; SameSite=Lax`;
    }
    set({ token, userEmail: email, isAuthenticated: true });
  },

  logout: () => {
    if (typeof document !== "undefined") {
      document.cookie = "auth_token=; path=/; max-age=0; SameSite=Lax";
      document.cookie = "user_email=; path=/; max-age=0; SameSite=Lax";
      window.location.href = "/login";
    }
    set({ token: null, userEmail: null, isAuthenticated: false });
  },

  initialize: () => {
    if (typeof document !== "undefined") {
      const matchToken = document.cookie.match(new RegExp("(^| )auth_token=([^;]+)"));
      const matchEmail = document.cookie.match(new RegExp("(^| )user_email=([^;]+)"));
      const token = matchToken ? matchToken[2] : null;
      const email = matchEmail ? decodeURIComponent(matchEmail[2]) : null;

      if (token) {
        set({ token, userEmail: email, isAuthenticated: true });
      }
    }
  },
}));
