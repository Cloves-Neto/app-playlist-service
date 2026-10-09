import { httpClient } from "@/api/client/httpClient";
import { MusicRequest, MusicResponse } from "@/features/music/types/music.types";

export class EditMusicService {
  async execute(id: string, payload: MusicRequest): Promise<MusicResponse> {
    const { data } = await httpClient.put<MusicResponse>(`/musics/${id}`, payload);
    return data;
  }
}
