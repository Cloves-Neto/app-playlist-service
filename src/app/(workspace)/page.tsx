import React from "react";
import { Music, Plus, ListMusic } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function WorkspacePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/40">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Music className="w-6 h-6 text-primary" />
            Minhas Notas Musicais
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Capture faixas e organize sua biblioteca pessoal conectada ao backend Spring Boot.
          </p>
        </div>
      </div>

      {/* Grid inicial de apresentação do workspace */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-border/60 bg-card/60 backdrop-blur-sm p-6 flex flex-col justify-center items-center text-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Plus className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-base">Quick Capture</h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-xs">
              Barra de digitação rápida pronta para o Estágio 05 (Domínio de Músicas).
            </p>
          </div>
        </Card>

        <Card className="border-border/60 bg-card/60 backdrop-blur-sm p-6 flex flex-col justify-center items-center text-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <ListMusic className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-base">Pastas de Playlists</h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-xs">
              Cadernos de playlists preparados para o Estágio 06.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
