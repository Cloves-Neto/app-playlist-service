"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { usePlaylists } from "../hooks/usePlaylists";
import { useAddTracksToPlaylist } from "../hooks/useAddTracksToPlaylist";
import { MusicResponse } from "@/features/music/types/music.types";
import { Folder, Plus, CheckCircle2, Loader2 } from "lucide-react";

interface AddToPlaylistModalProps {
  music: MusicResponse | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AddToPlaylistModal({
  music,
  isOpen,
  onClose,
}: AddToPlaylistModalProps) {
  const { data: playlists, isLoading } = usePlaylists();
  const addMutation = useAddTracksToPlaylist();

  if (!music) return null;

  const handleAdd = (playlistName: string) => {
    addMutation.mutate(
      {
        listName: playlistName,
        musicIds: [music.id],
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
          <DialogTitle className="text-base font-semibold text-foreground flex items-center gap-2">
            <Folder className="w-4 h-4 text-primary" />
            Adicionar a um Caderno / Playlist
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Vincular <span className="font-semibold text-foreground">&quot;{music.titulo}&quot;</span> a uma playlist existente.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 py-2 max-h-60 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-6 gap-2 text-xs text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
              <span>Carregando cadernos...</span>
            </div>
          ) : !playlists || playlists.length === 0 ? (
            <p className="text-xs text-muted-foreground text-center py-4">
              Você ainda não possui playlists criadas. Crie uma na barra lateral.
            </p>
          ) : (
            playlists.map((playlist) => {
              const alreadyIn = (playlist.musics || []).some((m) => m.id === music.id);

              return (
                <div
                  key={playlist.id}
                  className="flex items-center justify-between p-2.5 rounded-lg border border-border/40 hover:bg-muted/40 transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Folder className="w-4 h-4 text-primary shrink-0" />
                    <div className="min-w-0">
                      <p className="font-medium text-xs text-foreground truncate">
                        {playlist.nome}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {playlist.musics?.length || 0} faixas
                      </p>
                    </div>
                  </div>

                  {alreadyIn ? (
                    <span className="text-[11px] text-muted-foreground flex items-center gap-1 bg-muted px-2 py-1 rounded">
                      <CheckCircle2 className="w-3.5 h-3.5 text-muted-foreground" />
                      Já inclusa
                    </span>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAdd(playlist.nome)}
                      disabled={addMutation.isPending}
                      className="h-7 text-xs gap-1 border-primary/30 text-primary hover:bg-primary/10"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Adicionar</span>
                    </Button>
                  )}
                </div>
              );
            })
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}