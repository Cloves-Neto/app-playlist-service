"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Playlist } from "../types/playlist.types";
import { usePlaylistByName } from "../hooks/usePlaylistByName";
import { PlaylistDeleteDialog } from "./PlaylistDeleteDialog";
import { RemoveTracksModal } from "./RemoveTracksModal";
import { AddTracksToPlaylistModal } from "./AddTracksToPlaylistModal";
import { MusicCard } from "@/features/music/components/MusicCard";
import { MusicEditModal } from "@/features/music/components/MusicEditModal";
import { MusicDeleteModal } from "@/features/music/components/MusicDeleteModal";
import { MusicResponse } from "@/features/music/types/music.types";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash2, ListMinus, Folder, Disc, AlertCircle, Plus } from "lucide-react";

interface PlaylistDetailViewProps {
  initialPlaylist?: Playlist;
  playlistName: string;
}

export function PlaylistDetailView({
  initialPlaylist,
  playlistName,
}: PlaylistDetailViewProps) {
  const { data: playlist, isLoading, isError } = usePlaylistByName(
    playlistName,
    initialPlaylist
  );

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isRemoveTracksOpen, setIsRemoveTracksOpen] = useState(false);
  const [isAddTracksOpen, setIsAddTracksOpen] = useState(false);
  const [editingMusic, setEditingMusic] = useState<MusicResponse | null>(null);
  const [deletingMusic, setDeletingMusic] = useState<MusicResponse | null>(null);

  if (isLoading && !playlist) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-6 w-32 bg-muted/60 rounded" />
        <div className="h-10 w-3/4 bg-muted/70 rounded" />
        <div className="h-4 w-1/2 bg-muted/40 rounded" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-4">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="h-32 rounded-xl bg-muted/40" />
          ))}
        </div>
      </div>
    );
  }

  if (isError || !playlist) {
    return (
      <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-6 text-center space-y-3">
        <AlertCircle className="w-8 h-8 text-destructive mx-auto" />
        <h4 className="text-sm font-semibold text-destructive">
          Playlist não encontrada
        </h4>
        <p className="text-xs text-muted-foreground">
          Não foi possível encontrar a playlist &quot;{playlistName}&quot; na base de dados.
        </p>
        <Link href="/">
          <Button variant="outline" size="sm" className="text-xs mt-2">
            Voltar para a biblioteca
          </Button>
        </Link>
      </div>
    );
  }

  const tracks = playlist.musics || [];

  return (
    <div className="space-y-6 pb-12">
      {/* Botão de retorno */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>Voltar para todas as notas</span>
        </Link>
      </div>

      {/* Cabeçalho da Playlist */}
      <div className="bg-card/70 border border-border/60 rounded-xl p-5 shadow-xs backdrop-blur-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-1.5 min-w-0">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                <Folder className="w-4 h-4" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground truncate">
                {playlist.nome}
              </h1>
            </div>
            {playlist.descricao && (
              <p className="text-xs sm:text-sm text-muted-foreground pl-9">
                {playlist.descricao}
              </p>
            )}
            <div className="pl-9 pt-1 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="font-mono text-[11px] px-2 py-0.5 rounded-full bg-muted">
                {tracks.length} {tracks.length === 1 ? "faixa" : "faixas"}
              </span>
            </div>
          </div>

          {/* Botões de Ação da Playlist */}
          <div className="flex items-center flex-wrap gap-2 shrink-0">
            <Button
              size="sm"
              onClick={() => setIsAddTracksOpen(true)}
              className="h-8 text-xs font-medium gap-1.5 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Adicionar Músicas</span>
            </Button>

            {tracks.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsRemoveTracksOpen(true)}
                className="h-8 text-xs font-medium gap-1.5 border-border/60 hover:bg-muted"
              >
                <ListMinus className="w-3.5 h-3.5 text-muted-foreground" />
                <span>Remover Faixas</span>
              </Button>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsDeleteOpen(true)}
              className="h-8 text-xs font-medium gap-1.5 border-destructive/30 text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Excluir Caderno</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Grid de Faixas da Playlist */}
      <div className="space-y-3">
        <h3 className="text-xs font-medium text-muted-foreground px-1 uppercase tracking-wider">
          Faixas neste caderno
        </h3>

        {tracks.length === 0 ? (
          <div className="bg-card/40 border border-dashed border-border/70 rounded-xl p-10 text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mx-auto text-muted-foreground">
              <Disc className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">
                Caderno sem faixas
              </h4>
              <p className="text-xs text-muted-foreground pt-1 max-w-sm mx-auto">
                Este caderno ainda não possui músicas vinculadas.
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsAddTracksOpen(true)}
              className="text-xs gap-1.5 mt-2"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Adicionar Músicas a este Caderno</span>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {tracks.map((music) => (
              <MusicCard
                key={music.id}
                music={music}
                onEdit={setEditingMusic}
                onDelete={setDeletingMusic}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modais */}
      <PlaylistDeleteDialog
        playlistName={playlist.nome}
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
      />

      <AddTracksToPlaylistModal
        playlist={playlist}
        isOpen={isAddTracksOpen}
        onClose={() => setIsAddTracksOpen(false)}
      />

      <RemoveTracksModal
        playlist={playlist}
        isOpen={isRemoveTracksOpen}
        onClose={() => setIsRemoveTracksOpen(false)}
      />

      {editingMusic && (
        <MusicEditModal
          key={editingMusic.id}
          music={editingMusic}
          isOpen={true}
          onClose={() => setEditingMusic(null)}
        />
      )}

      <MusicDeleteModal
        music={deletingMusic}
        isOpen={!!deletingMusic}
        onClose={() => setDeletingMusic(null)}
      />
    </div>
  );
}