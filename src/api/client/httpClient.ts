import axios from "axios";

export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de Request: Injeta o token JWT dinamicamente
httpClient.interceptors.request.use(async (config) => {
  let token: string | undefined;

  // Ambiente de Servidor (SSR / Server Component)
  if (typeof window === "undefined") {
    try {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      token = cookieStore.get("auth_token")?.value;
    } catch {
      // Ignora erro caso executado fora de contexto de request Next.js
    }
  } else {
    // Ambiente de Cliente (Browser)
    const match = document.cookie.match(new RegExp("(^| )auth_token=([^;]+)"));
    token = match ? match[2] : undefined;
  }

  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Interceptor de Response: Trata 401 (Não Autorizado) e 403 (Proibido)
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== "undefined" && (error.response?.status === 401 || error.response?.status === 403)) {
      document.cookie = "auth_token=; Max-Age=0; path=/;";
      // Evita redirect em loop se já estiver em /login ou /register
      if (!window.location.pathname.startsWith("/login") && !window.location.pathname.startsWith("/register")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);
