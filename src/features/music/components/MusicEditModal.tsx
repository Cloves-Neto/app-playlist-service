"use client";

import React, { useState, useEffect } from "react";
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
import { MusicResponse } from "../types/music.types";
import { useEditMusic } from "../hooks/useEditMusic";
import { musicSchema } from "../schemas/music.schema";
import { Loader2 } from "lucide-react";

interface MusicEditModalProps {
  music: MusicResponse | null;
  isOpen: boolean;
  onClose: () => void;
}

export function MusicEditModal({ music, isOpen, onClose }: MusicEditModalProps) {
  const [titulo, setTitulo] = useState("");
  const [artista, setArtista] = useState("");
  const [album, setAlbum] = useState("");
  const [ano, setAno] = useState<number | string>("");
  const [genero, setGenero] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const editMutation = useEditMusic();

  useEffect(() => {
    if (music) {
      setTitulo(music.titulo);
      setArtista(music.artista);
      setAlbum(music.album);
      setAno(music.ano);
      setGenero(music.genero);
      setErrors({});
    }
  }, [music, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!music) return;

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
      return;
    }

    setErrors({});
    editMutation.mutate(
      {
        id: music.id,
        payload: {
          titulo: parseResult.data.titulo,
          artista: parseResult.data.artista,
          album: parseResult.data.album,
          ano: parseResult.data.ano,
          genero: parseResult.data.genero,
        },
      },
      {
        onSuccess: () => {
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
            Editar Nota Musical
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Altere os metadados cadastrados para esta faixa no banco de dados.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3.5 py-2">
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-foreground/80">Título da Música</label>
            <Input
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Título"
              className="h-8 text-xs bg-muted/30"
              disabled={editMutation.isPending}
            />
            {errors.titulo && <p className="text-[10px] text-destructive">{errors.titulo}</p>}
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-foreground/80">Artista</label>
              <Input
                value={artista}
                onChange={(e) => setArtista(e.target.value)}
                placeholder="Artista"
                className="h-8 text-xs bg-muted/30"
                disabled={editMutation.isPending}
              />
              {errors.artista && <p className="text-[10px] text-destructive">{errors.artista}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-medium text-foreground/80">Álbum</label>
              <Input
                value={album}
                onChange={(e) => setAlbum(e.target.value)}
                placeholder="Álbum"
                className="h-8 text-xs bg-muted/30"
                disabled={editMutation.isPending}
              />
              {errors.album && <p className="text-[10px] text-destructive">{errors.album}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-foreground/80">Ano</label>
              <Input
                type="number"
                value={ano}
                onChange={(e) => setAno(e.target.value)}
                placeholder="Ex: 2024"
                className="h-8 text-xs bg-muted/30"
                disabled={editMutation.isPending}
              />
              {errors.ano && <p className="text-[10px] text-destructive">{errors.ano}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-medium text-foreground/80">Gênero</label>
              <Input
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
                placeholder="Ex: Rock"
                className="h-8 text-xs bg-muted/30"
                disabled={editMutation.isPending}
              />
              {errors.genero && <p className="text-[10px] text-destructive">{errors.genero}</p>}
            </div>
          </div>

          <DialogFooter className="pt-2 gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              disabled={editMutation.isPending}
              className="text-xs h-8"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={editMutation.isPending}
              className="text-xs h-8 gap-1.5"
            >
              {editMutation.isPending ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Salvando...</span>
                </>
              ) : (
                "Salvar Alterações"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
