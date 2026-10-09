"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Mail, Lock, Loader2, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginSchema, LoginFormData } from "@/features/auth/schemas/auth.schema";
import { LoginService } from "@/api/auth/login";
import { useAuthStore } from "@/stores/auth.store";

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const loginToStore = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const loginService = new LoginService();
      const response = await loginService.execute(data);

      loginToStore(response.token, data.login);
      toast.success("Login realizado com sucesso! Bem-vindo de volta.");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("Credenciais inválidas. Verifique seu e-mail e senha.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground/80 flex items-center gap-2">
          <Mail className="w-4 h-4 text-muted-foreground" /> E-mail
        </label>
        <Input
          type="email"
          placeholder="seu@email.com"
          disabled={isLoading}
          {...register("login")}
          className={errors.login ? "border-destructive focus-visible:ring-destructive" : ""}
        />
        {errors.login && (
          <p className="text-xs text-destructive">{errors.login.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground/80 flex items-center gap-2">
          <Lock className="w-4 h-4 text-muted-foreground" /> Senha
        </label>
        <Input
          type="password"
          placeholder="••••••••"
          disabled={isLoading}
          {...register("password")}
          className={errors.password ? "border-destructive focus-visible:ring-destructive" : ""}
        />
        {errors.password && (
          <p className="text-xs text-destructive">{errors.password.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full mt-2" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Entrando...
          </>
        ) : (
          <>
            Entrar no Workspace <ArrowRight className="w-4 h-4 ml-2" />
          </>
        )}
      </Button>

      <div className="text-center pt-2">
        <p className="text-xs text-muted-foreground">
          Ainda não tem conta?{" "}
          <Link href="/register" className="text-primary hover:underline font-medium">
            Cadastre-se gratuitamente
          </Link>
        </p>
      </div>
    </form>
  );
}
