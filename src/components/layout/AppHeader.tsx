import React from "react";
import { AppLogo } from "@/components/layout/AppLogo";
import { SearchBar } from "@/components/layout/SearchBar";
import { RepoActionButtons } from "@/components/layout/RepoActionButtons";
import { UserProfileMenu } from "@/components/layout/UserProfileMenu";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Esquerda: Logo */}
        <div className="flex items-center gap-6">
          <AppLogo />
        </div>

        {/* Centro: Barra de busca com atalho */}
        <div className="flex-1 max-w-md hidden md:flex justify-center">
          <SearchBar />
        </div>

        {/* Direita: Botões dos Repos + Perfil */}
        <div className="flex items-center gap-3">
          <RepoActionButtons />
          <div className="h-4 w-px bg-border/60 mx-1 hidden sm:block" />
          <UserProfileMenu />
        </div>
      </div>
    </header>
  );
}
