import { httpClient } from "@/api/client/httpClient";
import { Playlist, normalizePlaylist } from "@/features/playlist/types/playlist.types";

export class GetAllPlaylistsService {
  async execute(): Promise<Playlist[]> {
    const { data } = await httpClient.get<Playlist[]>("/lists");
    return Array.isArray(data) ? data.map(normalizePlaylist) : [];
  }
}