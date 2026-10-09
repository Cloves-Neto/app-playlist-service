import { httpClient } from "@/api/client/httpClient";

export class DeletePlaylistService {
  async execute(listName: string): Promise<void> {
    await httpClient.delete(`/lists/${encodeURIComponent(listName)}`);
  }
}
