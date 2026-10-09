import axios from "axios";

export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});


httpClient.interceptors.request.use(async (config) => {
  let token: string | undefined;


  if (typeof window === "undefined") {
    try {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      token = cookieStore.get("auth_token")?.value;
    } catch {

    }
  } else {

    const match = document.cookie.match(new RegExp("(^| )auth_token=([^;]+)"));
    token = match ? match[2] : undefined;
  }

  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
  

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== "undefined" && (error.response?.status === 401 || error.response?.status === 403)) {
      document.cookie = "auth_token=; Max-Age=0; path=/;";
  
      if (!window.location.pathname.startsWith("/login") && !window.location.pathname.startsWith("/register")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);
