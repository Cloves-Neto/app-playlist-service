"use client";

import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, User, Activity, Loader2, Sparkles } from "lucide-react";
import { useAuthStore } from "@/stores/auth.store";
import { useWorkspaceStore } from "@/stores/workspace.store";
import { useQueryClient } from "@tanstack/react-query";

export function UserProfileMenu() {
  const { userEmail, logout, initialize } = useAuthStore();
  const { setSearchQuery, setSelectedPlaylist } = useWorkspaceStore();
  const queryClient = useQueryClient();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const initials = userEmail
    ? userEmail.substring(0, 2).toUpperCase()
    : "US";

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);

      // 1. Limpa todo o cache de consultas em memória do React Query
      queryClient.clear();

      // 2. Reseta estados da workspace
      setSearchQuery("");
      setSelectedPlaylist(null);

      // 3. Executa a limpeza exaustiva de cookies, local/session storage e cache API
      await logout();
    } catch (error) {
      console.error("Erro durante o logout:", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        type="button"
        title="Menu de perfil e sessão"
        className="relative inline-flex items-center justify-center h-8 w-8 rounded-full border border-border/70 bg-card hover:bg-muted transition-all duration-150 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring select-none group"
      >
        <Avatar className="h-7 w-7 pointer-events-none">
          <AvatarFallback className="text-[11px] font-bold bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
            {initials}
          </AvatarFallback>
        </Avatar>

        {/* Indicador de status conectado */}
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-background rounded-full" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={6}
        className="w-64 min-w-[240px] bg-card/95 backdrop-blur-md border-border/70 p-1.5 shadow-lg"
      >
        <DropdownMenuLabel className="font-normal px-2 py-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/15 text-primary flex items-center justify-center font-bold text-xs shrink-0 border border-primary/25">
              {initials}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-foreground flex items-center gap-1.5 truncate">
                <User className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                Minha Sessão
              </span>
              <span className="text-[11px] text-muted-foreground truncate font-mono pt-0.5">
                {userEmail || "usuario@tracknotes.com"}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <div className="px-2.5 py-1.5 text-[11px] text-muted-foreground flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>API Spring Boot</span>
          </div>
          <span className="text-[10px] font-medium text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">
            Online
          </span>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          disabled={isLoggingOut}
          variant="destructive"
          className="cursor-pointer text-xs flex items-center justify-between py-2 px-2.5 rounded-md text-destructive focus:text-destructive focus:bg-destructive/10"
        >
          <div className="flex items-center gap-2">
            {isLoggingOut ? (
              <Loader2 className="w-4 h-4 animate-spin text-destructive" />
            ) : (
              <LogOut className="w-4 h-4 text-destructive" />
            )}
            <span className="font-medium">
              {isLoggingOut ? "Encerrando sessão..." : "Sair da Sessão"}
            </span>
          </div>
          <span className="text-[10px] text-muted-foreground">
            Limpar tudo
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}