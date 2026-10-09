export interface Music {
  id: string; // UUID v4 gerado pelo Spring Boot
  titulo: string;
  artista: string;
  genero: string;
  ano: number;
  album: string;
}

export type MusicRequest = Omit<Music, "id">;
export type MusicResponse = Music;
