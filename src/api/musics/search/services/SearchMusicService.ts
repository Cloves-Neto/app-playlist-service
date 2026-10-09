import { httpClient } from "@/api/client/httpClient";
import { MusicResponse } from "@/features/music/types/music.types";

export class SearchMusicService {
  async execute(nome: string): Promise<MusicResponse[]> {
    const { data } = await httpClient.get<MusicResponse[]>("/musics/search", {
      params: { nome },
    });
    return data;
  }
}
