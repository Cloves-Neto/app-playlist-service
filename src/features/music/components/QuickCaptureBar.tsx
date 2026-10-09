"use client";

import React, { useState, useEffect } from "react";
import { QuickCaptureInput } from "./micro/QuickCaptureInput";
import { ArtistInput } from "./micro/ArtistInput";
import { AlbumInput } from "./micro/AlbumInput";
import { YearInput } from "./micro/YearInput";
import { GenreBadgeSelector } from "./micro/GenreBadgeSelector";
import { QuickCaptureSubmitButton } from "./micro/QuickCaptureSubmitButton";
import { useCreateMusic } from "../hooks/useCreateMusic";
import { musicSchema } from "../schemas/music.schema";
import { Sparkles } from "lucide-react";

export function QuickCaptureBar() {
  const [titulo, setTitulo] = useState("");
  const [artista, setArtista] = useState("");
  const [album, setAlbum] = useState("");
  const [ano, setAno] = useState<number | string>(2024);
  const [genero, setGenero] = useState("Rock");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setAno(new Date().getFullYear());
  }, []);

  const createMutation = useCreateMusic();

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const parseResult = musicSchema.safeParse({
      titulo,
      artista,
      album,
      ano: Number(ano),
      genero,
    });

    if (!parseResult.success) {
      const fieldErrors: Record<string, string> = {};
      parseResult.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[String(issue.path[0])] = issue.message;
        }
      });
      setErrors(fieldErrors);
      setIsExpanded(true);
      return;
    }

    setErrors({});
    createMutation.mutate(
      {
        titulo: parseResult.data.titulo,
        artista: parseResult.data.artista,
        album: parseResult.data.album,
        ano: parseResult.data.ano,
        genero: parseResult.data.genero,
      },
      {
        onSuccess: () => {
          setTitulo("");
          setArtista("");
          setAlbum("");
          setErrors({});
        },
      }
    );
  };

  return (
    <div className="w-full bg-card/70 border border-border/60 rounded-xl shadow-xs backdrop-blur-md overflow-hidden transition-all focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20">
      <form onSubmit={handleSubmit} className="p-3.5 space-y-3">
        {/* Top Header Label */}
        <div className="flex items-center justify-between text-[11px] text-muted-foreground px-1">
          <span className="flex items-center gap-1.5 font-medium text-foreground/80">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            Captura Rápida de Faixas
          </span>
          <span className="hidden sm:inline text-[10px] font-mono text-muted-foreground/70">
            Pressione Enter para salvar instantaneamente
          </span>
        </div>

        {/* Input Principal do Título */}
        <QuickCaptureInput
          value={titulo}
          onChange={(e) => {
            setTitulo(e.target.value);
            if (!isExpanded && e.target.value.length > 0) {
              setIsExpanded(true);
            }
          }}
          error={errors.titulo}
          disabled={createMutation.isPending}
        />

        {/* Linha de Detalhes */}
        <div className="space-y-2.5 pt-1 border-t border-border/40">
          <div className="flex flex-wrap items-start gap-2.5">
            <ArtistInput
              value={artista}
              onChange={(e) => setArtista(e.target.value)}
              error={errors.artista}
              disabled={createMutation.isPending}
            />

            <AlbumInput
              value={album}
              onChange={(e) => setAlbum(e.target.value)}
              error={errors.album}
              disabled={createMutation.isPending}
            />

            <YearInput
              value={ano}
              onChange={(e) => setAno(e.target.value)}
              error={errors.ano}
              disabled={createMutation.isPending}
            />

            <div className="pt-0.5 ml-auto">
              <QuickCaptureSubmitButton
                isLoading={createMutation.isPending}
                disabled={!titulo.trim() || !artista.trim()}
              />
            </div>
          </div>

          {/* Seletor rápido de gêneros musicais */}
          <GenreBadgeSelector value={genero} onChange={setGenero} />
          {errors.genero && (
            <p className="text-[10px] text-destructive px-1">{errors.genero}</p>
          )}
        </div>
      </form>
    </div>
  );
}
