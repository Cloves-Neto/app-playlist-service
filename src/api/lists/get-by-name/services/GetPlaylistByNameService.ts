import { httpClient } from "@/api/client/httpClient";
import { Playlist } from "@/features/playlist/types/playlist.types";

export class GetPlaylistByNameService {
  async execute(listName: string): Promise<Playlist> {
    const { data } = await httpClient.get<Playlist>(`/lists/${encodeURIComponent(listName)}`);
    return data;
  }
}
