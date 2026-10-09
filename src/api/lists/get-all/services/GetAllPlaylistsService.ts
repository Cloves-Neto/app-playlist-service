import { httpClient } from "@/api/client/httpClient";
import { Playlist } from "@/features/playlist/types/playlist.types";

export class GetAllPlaylistsService {
  async execute(): Promise<Playlist[]> {
    const { data } = await httpClient.get<Playlist[]>("/lists");
    return data;
  }
}
