"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlaylists } from "../hooks/usePlaylists";
import { PlaylistNavItem } from "./micro/PlaylistNavItem";
import { PlaylistCreateButton } from "./micro/PlaylistCreateButton";
import { PlaylistCreateModal } from "./PlaylistCreateModal";
import { Music2, Library } from "lucide-react";

export function PlaylistSidebar() {
  const pathname = usePathname();
  const { data: playlists, isLoading } = usePlaylists();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const isAllMusicsActive = pathname === "/";

  return (
    <>
      <aside className="w-full md:w-60 shrink-0 space-y-5">
        {/* Bloco de Biblioteca Geral */}
        <div className="space-y-1">
          <p className="px-2.5 text-[10px] font-semibold tracking-wider text-muted-foreground/70 uppercase">
            Biblioteca
          </p>
          <Link
            href="/"
            className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              isAllMusicsActive
                ? "bg-primary/10 text-primary font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
            }`}
          >
            <Music2
              className={`w-3.5 h-3.5 ${
                isAllMusicsActive ? "text-primary" : "text-muted-foreground/60"
              }`}
            />
            <span>Todas as Anotações</span>
          </Link>
        </div>

        {/* Bloco de Cadernos de Playlists */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-2.5">
            <span className="text-[10px] font-semibold tracking-wider text-muted-foreground/70 uppercase flex items-center gap-1.5">
              <Library className="w-3 h-3" />
              Cadernos de Playlist
            </span>
            {playlists && (
              <span className="text-[10px] font-mono text-muted-foreground">
                {playlists.length}
              </span>
            )}
          </div>

          <PlaylistCreateButton onClick={() => setIsCreateOpen(true)} />

          {/* Lista de Playlists */}
          <div className="space-y-0.5 pt-1">
            {isLoading && (
              <div className="space-y-1 px-1">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="h-8 rounded-lg bg-muted/40 animate-pulse"
                  />
                ))}
              </div>
            )}

            {!isLoading && playlists && playlists.length === 0 && (
              <div className="px-2.5 py-3 text-center rounded-lg border border-dashed border-border/60 bg-muted/20">
                <p className="text-[11px] text-muted-foreground">
                  Nenhuma playlist criada.
                </p>
              </div>
            )}

            {!isLoading &&
              playlists &&
              playlists.map((playlist) => (
                <PlaylistNavItem key={playlist.id || playlist.nome} playlist={playlist} />
              ))}
          </div>
        </div>
      </aside>

      <PlaylistCreateModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
    </>
  );
}
