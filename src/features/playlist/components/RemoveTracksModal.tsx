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
import { useRemoveTracksFromPlaylist } from "../hooks/useRemoveTracksFromPlaylist";
import { Playlist } from "../types/playlist.types";
import { Music, Check, Trash2, Loader2 } from "lucide-react";

interface RemoveTracksModalProps {
  playlist: Playlist;
  isOpen: boolean;
  onClose: () => void;
}

export function RemoveTracksModal({
  playlist,
  isOpen,
  onClose,
}: RemoveTracksModalProps) {
  const [selectedMusicIds, setSelectedMusicIds] = useState<string[]>([]);
  const removeMutation = useRemoveTracksFromPlaylist();

  const toggleSelect = (id: string) => {
    setSelectedMusicIds((prev) =>
      prev.includes(id) ? prev.filter((mId) => mId !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedMusicIds.length === playlist.musics.length) {
      setSelectedMusicIds([]);
    } else {
      setSelectedMusicIds(playlist.musics.map((m) => m.id));
    }
  };

  const handleConfirmRemove = () => {
    if (selectedMusicIds.length === 0) return;

    removeMutation.mutate(
      {
        listName: playlist.nome,
        musicIds: selectedMusicIds,
      },
      {
        onSuccess: () => {
          setSelectedMusicIds([]);
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
            Remover Músicas da Playlist
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Selecione quais faixas você deseja desvincular do caderno{" "}
            <span className="font-semibold text-foreground">&quot;{playlist.nome}&quot;</span>.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{selectedMusicIds.length} faixas selecionadas</span>
            {playlist.musics && playlist.musics.length > 0 && (
              <button
                type="button"
                onClick={selectAll}
                className="text-primary hover:underline cursor-pointer text-xs"
              >
                {selectedMusicIds.length === playlist.musics.length
                  ? "Desmarcar todas"
                  : "Selecionar todas"}
              </button>
            )}
          </div>

          <div className="max-h-56 overflow-y-auto space-y-1.5 rounded-lg border border-border/40 p-2 bg-muted/20">
            {playlist.musics && playlist.musics.length > 0 ? (
              playlist.musics.map((m) => {
                const isSelected = selectedMusicIds.includes(m.id);
                return (
                  <div
                    key={m.id}
                    onClick={() => toggleSelect(m.id)}
                    className={`flex items-center justify-between p-2 rounded-md text-xs cursor-pointer select-none transition-colors ${
                      isSelected
                        ? "bg-destructive/10 text-destructive border border-destructive/20"
                        : "hover:bg-muted/60 text-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Music className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                      <div className="min-w-0">
                        <p className="font-medium truncate">{m.titulo}</p>
                        <p className="text-[10px] text-muted-foreground truncate">
                          {m.artista} • {m.album}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                        isSelected
                          ? "bg-destructive border-destructive text-destructive-foreground"
                          : "border-border/60 bg-background"
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-xs text-muted-foreground text-center py-4">
                Esta playlist não possui faixas para remover.
              </p>
            )}
          </div>
        </div>

        <DialogFooter className="pt-2 gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            disabled={removeMutation.isPending}
            className="text-xs h-8"
          >
            Cancelar
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={handleConfirmRemove}
            disabled={removeMutation.isPending || selectedMusicIds.length === 0}
            className="text-xs h-8 gap-1.5"
          >
            {removeMutation.isPending ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Removendo...</span>
              </>
            ) : (
              <>
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remover ({selectedMusicIds.length})</span>
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
