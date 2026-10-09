import { z } from "zod";

export const loginSchema = z.object({
  login: z
    .string()
    .min(1, "O e-mail é obrigatório.")
    .email("Insira um endereço de e-mail válido."),
  password: z
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres."),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    login: z
      .string()
      .min(1, "O e-mail é obrigatório.")
      .email("Insira um endereço de e-mail válido."),
    password: z
      .string()
      .min(6, "A senha deve ter no mínimo 6 caracteres."),
    confirmPassword: z
      .string()
      .min(6, "Confirme sua senha."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
