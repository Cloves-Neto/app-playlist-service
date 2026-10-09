"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Folder, ChevronRight } from "lucide-react";
import { Playlist } from "../../types/playlist.types";

interface PlaylistNavItemProps {
  playlist: Playlist;
}

export function PlaylistNavItem({ playlist }: PlaylistNavItemProps) {
  const pathname = usePathname();
  const href = `/playlists/${encodeURIComponent(playlist.nome)}`;
  const isActive = pathname === href || pathname === decodeURIComponent(href);

  const trackCount = playlist.musics ? playlist.musics.length : 0;

  return (
    <Link
      href={href}
      className={`group flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
        isActive
          ? "bg-primary/10 text-primary font-semibold"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
      }`}
    >
      <div className="flex items-center gap-2 min-w-0">
        <Folder
          className={`w-3.5 h-3.5 shrink-0 ${
            isActive ? "text-primary" : "text-muted-foreground/60 group-hover:text-foreground"
          }`}
        />
        <span className="truncate" title={playlist.nome}>
          {playlist.nome}
        </span>
      </div>

      <div className="flex items-center gap-1.5 shrink-0 ml-2">
        <span
          className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
            isActive
              ? "bg-primary/20 text-primary"
              : "bg-muted/80 text-muted-foreground/80 group-hover:bg-muted group-hover:text-foreground"
          }`}
        >
          {trackCount}
        </span>
        <ChevronRight
          className={`w-3 h-3 transition-transform ${
            isActive ? "text-primary translate-x-0.5" : "text-muted-foreground/30 group-hover:text-muted-foreground"
          }`}
        />
      </div>
    </Link>
  );
}
