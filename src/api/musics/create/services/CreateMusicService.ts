import { httpClient } from "@/api/client/httpClient";
import { MusicRequest, MusicResponse } from "@/features/music/types/music.types";

export class CreateMusicService {
  async execute(payload: MusicRequest): Promise<MusicResponse> {
    const { data } = await httpClient.post<MusicResponse>("/musics", payload);
    return data;
  }
}
