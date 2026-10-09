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
import { registerSchema, RegisterFormData } from "@/features/auth/schemas/auth.schema";
import { RegisterService } from "@/api/auth/register";

export function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      login: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const registerService = new RegisterService();
      await registerService.execute({
        login: data.login,
        password: data.password,
        role: "USER",
      });

      toast.success("Conta criada com sucesso! Faça login para começar a catalogar.");
      router.push("/login");
    } catch {
      toast.error("Erro ao registrar conta. Este e-mail já pode estar em uso.");
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
          placeholder="Mínimo 6 caracteres"
          disabled={isLoading}
          {...register("password")}
          className={errors.password ? "border-destructive focus-visible:ring-destructive" : ""}
        />
        {errors.password && (
          <p className="text-xs text-destructive">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground/80 flex items-center gap-2">
          <Lock className="w-4 h-4 text-muted-foreground" /> Confirmar Senha
        </label>
        <Input
          type="password"
          placeholder="Repita sua senha"
          disabled={isLoading}
          {...register("confirmPassword")}
          className={errors.confirmPassword ? "border-destructive focus-visible:ring-destructive" : ""}
        />
        {errors.confirmPassword && (
          <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full mt-2" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Criando conta...
          </>
        ) : (
          <>
            Criar Conta <ArrowRight className="w-4 h-4 ml-2" />
          </>
        )}
      </Button>

      <div className="text-center pt-2">
        <p className="text-xs text-muted-foreground">
          Já possui uma conta?{" "}
          <Link href="/login" className="text-primary hover:underline font-medium">
            Entrar diretamente
          </Link>
        </p>
      </div>
    </form>
  );
}
