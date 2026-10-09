"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MusicResponse } from "../types/music.types";
import { useDeleteMusic } from "../hooks/useDeleteMusic";
import { AlertTriangle, Loader2 } from "lucide-react";

interface MusicDeleteModalProps {
  music: MusicResponse | null;
  isOpen: boolean;
  onClose: () => void;
}

export function MusicDeleteModal({ music, isOpen, onClose }: MusicDeleteModalProps) {
  const deleteMutation = useDeleteMusic();

  if (!music) return null;

  const handleDelete = () => {
    deleteMutation.mutate(
      { id: music.id, titulo: music.titulo },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-sm bg-card/95 backdrop-blur-md border-border/80 p-5">
        <DialogHeader>
          <div className="w-9 h-9 rounded-full bg-destructive/15 text-destructive flex items-center justify-center mb-2">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <DialogTitle className="text-base font-semibold text-foreground">
            Excluir nota musical?
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground leading-relaxed">
            Tem certeza de que deseja remover a faixa{" "}
            <span className="font-semibold text-foreground">&quot;{music.titulo}&quot;</span> de{" "}
            <span className="font-semibold text-foreground">{music.artista}</span>? Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="pt-3 gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            disabled={deleteMutation.isPending}
            className="text-xs h-8"
          >
            Cancelar
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="text-xs h-8 gap-1.5"
          >
            {deleteMutation.isPending ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Removendo...</span>
              </>
            ) : (
              "Confirmar Exclusão"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
