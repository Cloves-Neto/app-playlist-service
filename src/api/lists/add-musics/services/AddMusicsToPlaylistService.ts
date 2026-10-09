import { httpClient } from "@/api/client/httpClient";
import { MusicAdditionRequest, Playlist, normalizePlaylist } from "@/features/playlist/types/playlist.types";

export class AddMusicsToPlaylistService {
  async execute(listName: string, payload: MusicAdditionRequest): Promise<Playlist> {
    const response = await httpClient.post<Playlist>(
      `/lists/${encodeURIComponent(listName)}/musics`,
      payload
    );
    return normalizePlaylist(response.data);
  }
}