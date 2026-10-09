import { httpClient } from "@/api/client/httpClient";
import { Playlist, PlaylistRequest } from "@/features/playlist/types/playlist.types";

export class CreatePlaylistService {
  async execute(payload: PlaylistRequest): Promise<Playlist> {
    const { data } = await httpClient.post<Playlist>("/lists", payload);
    return data;
  }
}
