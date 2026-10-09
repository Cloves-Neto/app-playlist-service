import { Music, MusicRequest } from "@/features/music/types/music.types";

export interface Playlist {
  id: string; // UUID v4 gerado pelo Spring Boot
  nome: string;
  descricao: string;
  musics: Music[];
}

export interface PlaylistRequest {
  nome: string;
  descricao: string;
  musicas?: MusicRequest[];
}

export interface MusicRemovalRequest {
  musicIds: string[]; // UUIDs das músicas a remover da playlist
}
