import { Music, MusicRequest } from "@/features/music/types/music.types";

export interface Playlist {
  id: string; // UUID v4 gerado pelo Spring Boot
  nome: string;
  descricao: string;
  musics: Music[];
  musicas?: Music[];
}

export interface PlaylistRequest {
  nome: string;
  descricao: string;
  musicas?: MusicRequest[];
  musicIds?: string[];
}

export interface MusicRemovalRequest {
  musicIds: string[]; // UUIDs das músicas a remover da playlist
}

export interface MusicAdditionRequest {
  musicIds: string[]; // UUIDs das músicas a adicionar à playlist
}

export function normalizePlaylist(data: any): Playlist {
  if (!data) return data;
  const rawMusics = data.musics || data.musicas || [];
  return {
    ...data,
    musics: rawMusics,
    musicas: rawMusics,
  };
}