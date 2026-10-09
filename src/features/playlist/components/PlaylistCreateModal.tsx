"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreatePlaylist } from "../hooks/useCreatePlaylist";
import { useMusics } from "@/features/music/hooks/useMusics";
import { playlistSchema } from "../schemas/playlist.schema";
import { Loader2, Music, Check } from "lucide-react";

interface PlaylistCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PlaylistCreateModal({ isOpen, onClose }: PlaylistCreateModalProps) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [selectedMusicIds, setSelectedMusicIds] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { data: musics } = useMusics("");
  const createMutation = useCreatePlaylist();

  const toggleSelectMusic = (id: string) => {
    setSelectedMusicIds((prev) =>
      prev.includes(id) ? prev.filter((mId) => mId !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const parseResult = playlistSchema.safeParse({ nome, descricao });
    if (!parseResult.success) {
      const fieldErrors: Record<string, string> = {};
      parseResult.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[String(issue.path[0])] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    createMutation.mutate(
      {
        nome: parseResult.data.nome,
        descricao: parseResult.data.descricao,
        musicIds: selectedMusicIds.length > 0 ? selectedMusicIds : undefined,
      },
      {
        onSuccess: () => {
          setNome("");
          setDescricao("");
          setSelectedMusicIds([]);
          setErrors({});
          onClose();
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-md border-border/80 p-5">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold text-foreground">
            Criar Novo Caderno / Playlist
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Agrupe suas faixas em coleções temáticas organizadas.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3.5 py-2">
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-foreground/80">
              Nome da Playlist *
            </label>
            <Input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Favoritas do Mês, Rock Clássico"
              className="h-8 text-xs bg-muted/30"
              disabled={createMutation.isPending}
            />
            {errors.nome && <p className="text-[10px] text-destructive">{errors.nome}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-medium text-foreground/80">
              Descrição (Opcional)
            </label>
            <Input
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Ex: Músicas para foco e trabalho"
              className="h-8 text-xs bg-muted/30"
              disabled={createMutation.isPending}
            />
          </div>

          {/* Seleção rápida de músicas já cadastradas */}
          {musics && musics.length > 0 && (
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                <span className="font-medium text-foreground/80">
                  Adicionar músicas existentes ({selectedMusicIds.length} selecionadas):
                </span>
              </div>
              <div className="max-h-36 overflow-y-auto space-y-1 rounded-lg border border-border/40 p-1.5 bg-muted/20">
                {musics.map((m) => {
                  const isChecked = selectedMusicIds.includes(m.id);
                  return (
                    <div
                      key={m.id}
                      onClick={() => toggleSelectMusic(m.id)}
                      className={`flex items-center justify-between px-2 py-1.5 rounded-md text-xs cursor-pointer select-none transition-colors ${
                        isChecked
                          ? "bg-primary/10 text-primary border border-primary/20"
                          : "hover:bg-muted/50 text-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <Music className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                        <span className="truncate font-medium">{m.titulo}</span>
                        <span className="text-[10px] text-muted-foreground truncate">
                          • {m.artista}
                        </span>
                      </div>
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                          isChecked
                            ? "bg-primary border-primary text-primary-foreground"
                            : "border-border/60 bg-background"
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <DialogFooter className="pt-2 gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              disabled={createMutation.isPending}
              className="text-xs h-8"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={createMutation.isPending || !nome.trim()}
              className="text-xs h-8 gap-1.5"
            >
              {createMutation.isPending ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Criando...</span>
                </>
              ) : (
                "Criar Playlist"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}