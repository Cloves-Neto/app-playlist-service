"use client";

import React, { useState } from "react";
import { useMusics } from "../hooks/useMusics";
import { MusicResponse } from "../types/music.types";
import { MusicCard } from "./MusicCard";
import { MusicEditModal } from "./MusicEditModal";
import { MusicDeleteModal } from "./MusicDeleteModal";
import { useWorkspaceStore } from "@/stores/workspace.store";
import { Button } from "@/components/ui/button";
import { Music2, SearchX, AlertCircle, RefreshCw } from "lucide-react";

export function MusicFeed() {
  const { searchQuery, setSearchQuery } = useWorkspaceStore();
  const { data: musics, isLoading, isError, refetch } = useMusics(searchQuery);

  const [editingMusic, setEditingMusic] = useState<MusicResponse | null>(null);
  const [deletingMusic, setDeletingMusic] = useState<MusicResponse | null>(null);

  return (
    <div className="space-y-4">
      {/* Feed Sub-Header */}
      <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
        <div className="flex items-center gap-2">
          <span className="font-medium text-foreground">
            {searchQuery ? `Resultados para "${searchQuery}"` : "Todas as Anotações"}
          </span>
          {musics && (
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
              {musics.length} {musics.length === 1 ? "faixa" : "faixas"}
            </span>
          )}
        </div>

        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="text-xs text-primary hover:underline cursor-pointer"
          >
            Limpar busca
          </button>
        )}
      </div>

      {/* Loading Skeletons */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="h-32 rounded-xl bg-muted/40 border border-border/40 animate-pulse p-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="h-4 bg-muted/70 rounded w-3/4" />
                <div className="h-3 bg-muted/50 rounded w-1/2" />
              </div>
              <div className="h-3 bg-muted/40 rounded w-1/3" />
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-6 text-center space-y-3">
          <AlertCircle className="w-8 h-8 text-destructive mx-auto" />
          <div>
            <h4 className="text-sm font-semibold text-destructive">
              Falha ao carregar as músicas
            </h4>
            <p className="text-xs text-muted-foreground pt-1">
              Verifique se o backend Spring Boot está ativo em http://localhost:8080.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            className="text-xs gap-1.5 h-8"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Tentar novamente
          </Button>
        </div>
      )}

      {/* Empty States */}
      {!isLoading && !isError && musics && musics.length === 0 && (
        <div className="bg-card/40 border border-dashed border-border/70 rounded-xl p-10 text-center space-y-3">
          {searchQuery ? (
            <>
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mx-auto text-muted-foreground">
                <SearchX className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground">
                  Nenhuma faixa encontrada
                </h4>
                <p className="text-xs text-muted-foreground pt-1 max-w-sm mx-auto">
                  Não encontramos músicas correspondentes ao termo &quot;{searchQuery}&quot;.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSearchQuery("")}
                className="text-xs h-8"
              >
                Limpar filtro
              </Button>
            </>
          ) : (
            <>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-primary">
                <Music2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground">
                  Seu bloco de notas está vazio
                </h4>
                <p className="text-xs text-muted-foreground pt-1 max-w-sm mx-auto">
                  Use a barra de captura rápida acima para anotar sua primeira música favorita.
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Grid de Cards */}
      {!isLoading && !isError && musics && musics.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {musics.map((music) => (
            <MusicCard
              key={music.id}
              music={music}
              onEdit={setEditingMusic}
              onDelete={setDeletingMusic}
            />
          ))}
        </div>
      )}

      {/* Modais */}
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
