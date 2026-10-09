import React from "react";
import { QuickCaptureBar } from "@/features/music/components/QuickCaptureBar";
import { MusicFeed } from "@/features/music/components/MusicFeed";
import { Music } from "lucide-react";

export default function WorkspacePage() {
  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/40">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Music className="w-5 h-5 text-primary" />
            Minhas Notas Musicais
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Capture faixas e faça anotações rápidas sincronizadas diretamente com a API Spring Boot.
          </p>
        </div>
      </div>

      {/* Barra de Captura Rápida Estilo Bloco de Notas */}
      <QuickCaptureBar />

      {/* Feed de Músicas com Busca, Edição e Exclusão */}
      <MusicFeed />
    </div>
  );
}
