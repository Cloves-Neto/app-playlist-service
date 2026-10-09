import { httpClient } from "@/api/client/httpClient";
import { RegisterRequest } from "@/features/auth/types/auth.types";

export class RegisterService {
  async execute(payload: RegisterRequest): Promise<void> {
    await httpClient.post("/auth/register", {
      login: payload.login,
      password: payload.password,
      role: payload.role || "USER",
    });
  }
}
