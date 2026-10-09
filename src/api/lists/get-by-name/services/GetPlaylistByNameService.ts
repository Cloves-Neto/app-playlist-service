import { httpClient } from "@/api/client/httpClient";
import { Playlist, normalizePlaylist } from "@/features/playlist/types/playlist.types";

export class GetPlaylistByNameService {
  async execute(listName: string): Promise<Playlist> {
    const { data } = await httpClient.get<Playlist>(
      `/lists/${encodeURIComponent(listName)}`
    );
    return normalizePlaylist(data);
  }
}