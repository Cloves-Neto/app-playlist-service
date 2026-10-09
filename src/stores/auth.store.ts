import { create } from "zustand";

interface AuthState {
  token: string | null;
  userEmail: string | null;
  isAuthenticated: boolean;
  login: (token: string, email: string) => void;
  logout: () => Promise<void>;
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
      try {
        localStorage.setItem("auth_token", token);
        localStorage.setItem("user_email", email);
      } catch (err) {
        console.warn("Não foi possível persistir no localStorage:", err);
      }
    }
    set({ token, userEmail: email, isAuthenticated: true });
  },

  logout: async () => {
    if (typeof window !== "undefined") {
      // 1. Limpeza exaustiva de todos os cookies
      const cookieList = document.cookie.split(";");
      for (const cookie of cookieList) {
        const eqPos = cookie.indexOf("=");
        const name = (eqPos > -1 ? cookie.substr(0, eqPos) : cookie).trim();
        if (name) {
          document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0; SameSite=Lax`;
          document.cookie = `${name}=; path=/; domain=${window.location.hostname}; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0; SameSite=Lax`;
        }
      }

      // 2. Limpeza de tokens de sessão no localStorage e sessionStorage
      try {
        localStorage.clear();
        sessionStorage.clear();
      } catch (err) {
        console.warn("Não foi possível limpar os storages locais:", err);
      }

      // 3. Limpeza de Caches do navegador (Cache Storage API)
      if ("caches" in window) {
        try {
          const cacheKeys = await window.caches.keys();
          await Promise.all(cacheKeys.map((key) => window.caches.delete(key)));
        } catch (err) {
          console.warn("Não foi possível limpar a Cache Storage API:", err);
        }
      }

      // 4. Reset do estado no Zustand
      set({ token: null, userEmail: null, isAuthenticated: false });

      // 5. Redirecionamento limpo substituindo histórico
      window.location.replace("/login");
    } else {
      set({ token: null, userEmail: null, isAuthenticated: false });
    }
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