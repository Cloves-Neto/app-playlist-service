"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { MusicResponse } from "../types/music.types";
import { MusicActionsMenu } from "./MusicActionsMenu";
import { Disc, Calendar, Music } from "lucide-react";

interface MusicCardProps {
  music: MusicResponse;
  onEdit: (music: MusicResponse) => void;
  onDelete: (music: MusicResponse) => void;
}

export function MusicCard({ music, onEdit, onDelete }: MusicCardProps) {
  return (
    <div className="group relative bg-card/60 hover:bg-card/90 border border-border/60 hover:border-border rounded-xl p-4 transition-all duration-200 hover:shadow-xs flex flex-col justify-between backdrop-blur-xs">
      <div>
        {/* Header do Card: Título + Menu de Ações */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-2.5 min-w-0">
            <div className="mt-0.5 w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 text-primary group-hover:scale-105 transition-transform">
              <Music className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-sm text-foreground leading-tight truncate" title={music.titulo}>
                {music.titulo}
              </h3>
              <p className="text-xs text-muted-foreground truncate pt-0.5" title={music.artista}>
                {music.artista}
              </p>
            </div>
          </div>

          <div className="shrink-0 -mr-1">
            <MusicActionsMenu
              onEdit={() => onEdit(music)}
              onDelete={() => onDelete(music)}
            />
          </div>
        </div>

        {/* Linha de Detalhes: Álbum */}
        <div className="mt-3 flex items-center gap-1.5 text-[11px] text-muted-foreground/80 truncate">
          <Disc className="w-3 h-3 shrink-0 text-muted-foreground/50" />
          <span className="truncate" title={music.album}>{music.album}</span>
        </div>
      </div>

      {/* Footer do Card: Ano e Gênero */}
      <div className="mt-3.5 pt-2.5 border-t border-border/40 flex items-center justify-between gap-2 text-[11px]">
        <div className="flex items-center gap-1 text-muted-foreground/70 font-mono text-[10px]">
          <Calendar className="w-3 h-3" />
          <span>{music.ano}</span>
        </div>

        <Badge
          variant="secondary"
          className="text-[10px] font-medium px-2 py-0 h-5 rounded-md bg-muted/60 text-foreground/80 border-border/40"
        >
          {music.genero}
        </Badge>
      </div>
    </div>
  );
}
