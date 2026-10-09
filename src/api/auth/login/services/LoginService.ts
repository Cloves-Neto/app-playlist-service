import { httpClient } from "@/api/client/httpClient";
import { LoginRequest, LoginResponse } from "@/features/auth/types/auth.types";

export class LoginService {
  async execute(payload: LoginRequest): Promise<LoginResponse> {
    const { data } = await httpClient.post<LoginResponse>("/auth/login", payload);
    return data;
  }
}
