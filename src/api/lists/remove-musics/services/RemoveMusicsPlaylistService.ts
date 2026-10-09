import { httpClient } from "@/api/client/httpClient";
import { MusicRemovalRequest } from "@/features/playlist/types/playlist.types";

export class RemoveMusicsPlaylistService {
  async execute(listName: string, payload: MusicRemovalRequest): Promise<void> {
    await httpClient.delete(`/lists/${encodeURIComponent(listName)}/musics`, {
      data: payload,
    });
  }
}
