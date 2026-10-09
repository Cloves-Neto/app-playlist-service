export interface LoginRequest {
  login: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegisterRequest {
  login: string;
  password: string;
  role?: "USER" | "ADMIN";
}
