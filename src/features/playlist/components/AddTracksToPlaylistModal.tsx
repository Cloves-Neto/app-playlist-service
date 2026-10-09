"use client";

import React, { useState, useMemo } from "react";
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
import { useAddTracksToPlaylist } from "../hooks/useAddTracksToPlaylist";
import { useMusics } from "@/features/music/hooks/useMusics";
import { Playlist } from "../types/playlist.types";
import { Music as MusicIcon, Check, Plus, Loader2, Search, CheckCircle2 } from "lucide-react";

interface AddTracksToPlaylistModalProps {
  playlist: Playlist;
  isOpen: boolean;
  onClose: () => void;
}

export function AddTracksToPlaylistModal({
  playlist,
  isOpen,
  onClose,
}: AddTracksToPlaylistModalProps) {
  const [search, setSearch] = useState("");
  const [selectedMusicIds, setSelectedMusicIds] = useState<string[]>([]);
  const { data: allMusics, isLoading } = useMusics("");
  const addMutation = useAddTracksToPlaylist();

  const currentTrackIds = useMemo(() => {
    return new Set((playlist.musics || []).map((m) => m.id));
  }, [playlist.musics]);

  const availableMusics = useMemo(() => {
    if (!allMusics) return [];
    return allMusics.filter((m) => {
      const matchesSearch =
        m.titulo.toLowerCase().includes(search.toLowerCase()) ||
        m.artista.toLowerCase().includes(search.toLowerCase()) ||
        m.album.toLowerCase().includes(search.toLowerCase());
      return matchesSearch;
    });
  }, [allMusics, search]);

  const selectableMusics = useMemo(() => {
    return availableMusics.filter((m) => !currentTrackIds.has(m.id));
  }, [availableMusics, currentTrackIds]);

  const toggleSelect = (id: string) => {
    if (currentTrackIds.has(id)) return;
    setSelectedMusicIds((prev) =>
      prev.includes(id) ? prev.filter((mId) => mId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedMusicIds.length === selectableMusics.length) {
      setSelectedMusicIds([]);
    } else {
      setSelectedMusicIds(selectableMusics.map((m) => m.id));
    }
  };

  const handleConfirmAdd = () => {
    if (selectedMusicIds.length === 0) return;

    addMutation.mutate(
      {
        listName: playlist.nome,
        musicIds: selectedMusicIds,
      },
      {
        onSuccess: () => {
          setSelectedMusicIds([]);
          setSearch("");
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
            <Plus className="w-4 h-4 text-primary" />
            Adicionar Músicas à Playlist
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Escolha as faixas da sua biblioteca para incluir em{" "}
            <span className="font-semibold text-foreground">&quot;{playlist.nome}&quot;</span>.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-2">
          {/* Barra de busca de músicas */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por título, artista ou álbum..."
              className="pl-8 h-8 text-xs bg-muted/30"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{selectedMusicIds.length} faixas selecionadas</span>
            {selectableMusics.length > 0 && (
              <button
                type="button"
                onClick={handleSelectAll}
                className="text-primary hover:underline cursor-pointer text-xs"
              >
                {selectedMusicIds.length === selectableMusics.length
                  ? "Desmarcar todas"
                  : "Selecionar todas disponíveis"}
              </button>
            )}
          </div>

          {/* Lista de músicas com scroll */}
          <div className="max-h-60 overflow-y-auto space-y-1.5 rounded-lg border border-border/40 p-2 bg-muted/20">
            {isLoading ? (
              <div className="flex items-center justify-center py-6 text-muted-foreground gap-2 text-xs">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                <span>Carregando biblioteca de faixas...</span>
              </div>
            ) : availableMusics.length > 0 ? (
              availableMusics.map((m) => {
                const isAlreadyIn = currentTrackIds.has(m.id);
                const isSelected = selectedMusicIds.includes(m.id);

                return (
                  <div
                    key={m.id}
                    onClick={() => !isAlreadyIn && toggleSelect(m.id)}
                    className={`flex items-center justify-between p-2 rounded-md text-xs select-none transition-colors ${
                      isAlreadyIn
                        ? "opacity-60 bg-muted/30 cursor-not-allowed text-muted-foreground"
                        : isSelected
                        ? "bg-primary/10 text-primary border border-primary/25 cursor-pointer"
                        : "hover:bg-muted/60 text-foreground cursor-pointer"
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <MusicIcon className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                      <div className="min-w-0">
                        <p className="font-medium truncate">{m.titulo}</p>
                        <p className="text-[10px] text-muted-foreground truncate">
                          {m.artista} • {m.album}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {isAlreadyIn ? (
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1 bg-muted px-1.5 py-0.5 rounded">
                          <CheckCircle2 className="w-3 h-3 text-muted-foreground" />
                          Já vinculada
                        </span>
                      ) : (
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                            isSelected
                              ? "bg-primary border-primary text-primary-foreground"
                              : "border-border/60 bg-background"
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3" />}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-xs text-muted-foreground text-center py-5">
                Nenhuma faixa encontrada na biblioteca.
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
            disabled={addMutation.isPending}
            className="text-xs h-8"
          >
            Cancelar
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={handleConfirmAdd}
            disabled={addMutation.isPending || selectedMusicIds.length === 0}
            className="text-xs h-8 gap-1.5"
          >
            {addMutation.isPending ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Adicionando...</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Adicionar ({selectedMusicIds.length})</span>
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}